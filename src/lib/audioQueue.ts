// JavaScript Audio Queue System for Chotelal Ji Voice
// Guarantees greeting plays first, subsequent AI responses play sequentially, and zero voice overlap occurs.

export interface AudioQueueItem {
  id: string;
  type: 'greeting' | 'ai_response' | 'reading';
  text: string;
  audioUri?: string; // Preloaded or resolved Data URI
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class ChotelalAudioQueueSystem {
  private queue: AudioQueueItem[] = [];
  private currentItem: AudioQueueItem | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private isProcessing = false;
  private greetingPlayed = false;
  private isMuted = false;

  private speakingListeners = new Set<(isSpeaking: boolean, item?: AudioQueueItem | null) => void>();
  private audioLevelListeners = new Set<(level: number) => void>();
  private queueChangeListeners = new Set<(queueLength: number) => void>();
  private levelInterval: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.setupAudioListeners();
    }
  }

  private setupAudioListeners() {
    if (!this.audioElement) return;

    this.audioElement.onended = () => {
      this.stopLevelSimulation();
      const finished = this.currentItem;
      this.currentItem = null;
      finished?.onEnd?.();
      this.notifySpeaking(false, null);
      this.processNext();
    };

    this.audioElement.onerror = (e) => {
      console.warn('ChotelalAudioQueue: Audio element error', e);
      this.stopLevelSimulation();
      const failed = this.currentItem;
      this.currentItem = null;
      failed?.onError?.(e);
      this.notifySpeaking(false, null);
      this.processNext();
    };
  }

  /**
   * Enqueue Greeting - Guaranteed to play first!
   */
  public enqueueGreeting(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    audioUri?: string
  ): void {
    const item: AudioQueueItem = {
      id: `greeting-${Date.now()}`,
      type: 'greeting',
      text,
      audioUri,
      onStart,
      onEnd,
    };

    // Greeting is inserted at the front of the queue if not already started
    if (!this.currentItem || this.currentItem.type !== 'greeting') {
      this.queue.unshift(item);
    } else {
      this.queue.push(item);
    }

    this.notifyQueueChange();
    this.processNext();
  }

  /**
   * Enqueue Subsequent AI Response - Queued sequentially after greeting
   */
  public enqueueAiResponse(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    audioUri?: string
  ): void {
    const item: AudioQueueItem = {
      id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: 'ai_response',
      text,
      audioUri,
      onStart,
      onEnd,
    };

    // If currently playing a greeting, append behind it
    this.queue.push(item);
    this.notifyQueueChange();
    this.processNext();
  }

  /**
   * Process queue items one by one sequentially
   */
  private async processNext(): Promise<void> {
    if (this.isProcessing || this.currentItem || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const nextItem = this.queue.shift()!;
    this.currentItem = nextItem;
    this.notifyQueueChange();

    try {
      let audioSrc = nextItem.audioUri;

      // If audioUri is not provided, fetch from neural Edge TTS endpoint
      if (!audioSrc) {
        audioSrc = await this.fetchNeuralTts(nextItem.text);
        nextItem.audioUri = audioSrc;
      }

      if (this.isMuted || !this.audioElement) {
        // If muted or audio unavailable, simulate speech duration and advance
        this.notifySpeaking(true, nextItem);
        nextItem.onStart?.();
        setTimeout(() => {
          this.notifySpeaking(false, null);
          this.currentItem = null;
          this.isProcessing = false;
          nextItem.onEnd?.();
          this.processNext();
        }, 1500);
        return;
      }

      this.audioElement.src = audioSrc;
      this.audioElement.playbackRate = 1.0;
      this.notifySpeaking(true, nextItem);
      nextItem.onStart?.();
      this.startLevelSimulation();

      await this.audioElement.play();
    } catch (err) {
      console.error('ChotelalAudioQueue: Failed to play item', err);
      this.stopLevelSimulation();
      this.notifySpeaking(false, null);
      nextItem.onError?.(err);
      this.currentItem = null;
      this.isProcessing = false;
      this.processNext();
      return;
    }

    this.isProcessing = false;
  }

  /**
   * Fetch audio from /api/tts using Microsoft Edge Neural Voice
   */
  private async fetchNeuralTts(text: string): Promise<string> {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, rate: '+8%', pitch: '-1Hz' }),
    });

    if (!response.ok) {
      throw new Error(`TTS server responded with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.success || !data.audioBase64) {
      throw new Error(data.error || 'Invalid audio data from TTS');
    }

    const mime = data.mimeType || 'audio/mpeg';
    return `data:${mime};base64,${data.audioBase64}`;
  }

  /**
   * Stop all current playback, reset queue, and reset state
   */
  public stopAll(): void {
    this.queue = [];
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement.src = '';
      } catch (e) {}
    }
    this.stopLevelSimulation();
    const item = this.currentItem;
    this.currentItem = null;
    this.isProcessing = false;
    this.notifySpeaking(false, null);
    this.notifyQueueChange();
    item?.onEnd?.();
  }

  /**
   * Mute or Unmute audio output
   */
  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
    if (muted && this.currentItem) {
      this.stopAll();
    }
  }

  public isSpeaking(): boolean {
    return !!this.currentItem;
  }

  public getCurrentItem(): AudioQueueItem | null {
    return this.currentItem;
  }

  public getQueueLength(): number {
    return this.queue.length;
  }

  // --- Visualizer / Audio Level Simulation ---
  private startLevelSimulation() {
    this.stopLevelSimulation();
    this.levelInterval = setInterval(() => {
      if (!this.currentItem) {
        this.stopLevelSimulation();
        return;
      }
      // Speech modulation between 0.35 and 0.95
      const level = 0.35 + Math.random() * 0.6;
      this.audioLevelListeners.forEach((cb) => cb(level));
    }, 90);
  }

  private stopLevelSimulation() {
    if (this.levelInterval) {
      clearInterval(this.levelInterval);
      this.levelInterval = null;
    }
    this.audioLevelListeners.forEach((cb) => cb(0.1));
  }

  // --- Subscriptions ---
  public onSpeakingChange(cb: (isSpeaking: boolean, item?: AudioQueueItem | null) => void): () => void {
    this.speakingListeners.add(cb);
    cb(!!this.currentItem, this.currentItem);
    return () => this.speakingListeners.delete(cb);
  }

  public onAudioLevelChange(cb: (level: number) => void): () => void {
    this.audioLevelListeners.add(cb);
    return () => this.audioLevelListeners.delete(cb);
  }

  public onQueueChange(cb: (queueLength: number) => void): () => void {
    this.queueChangeListeners.add(cb);
    cb(this.queue.length);
    return () => this.queueChangeListeners.delete(cb);
  }

  private notifySpeaking(isSpeaking: boolean, item?: AudioQueueItem | null) {
    this.speakingListeners.forEach((cb) => cb(isSpeaking, item));
  }

  private notifyQueueChange() {
    this.queueChangeListeners.forEach((cb) => cb(this.queue.length));
  }
}

// Global Singleton Audio Queue instance
export const audioQueue = new ChotelalAudioQueueSystem();
