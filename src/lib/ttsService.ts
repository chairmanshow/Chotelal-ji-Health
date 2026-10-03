/**
 * Chotelal Ji Health - Cloudflare Edge TTS Service
 * Voice: hi-IN-MadhurNeural (Warm, energetic, Indian Hindi male tone)
 * Rate: +10% (Fast, natural speaking pace)
 * Pitch: -2Hz (Warm, dignified Ayurvedic Vaidya tone)
 */

const TTS_URL = 'https://chotelalji-tts.sumitshrivas24.workers.dev';

let isSpeaking = false;
let voiceQueue: string[] = [];
let currentAudio: HTMLAudioElement | null = null;
let isMuted = false;
let onSpeakingChangeListeners: Array<(speaking: boolean) => void> = [];

function notifySpeakingChange(speaking: boolean) {
  isSpeaking = speaking;
  onSpeakingChangeListeners.forEach((fn) => {
    try {
      fn(speaking);
    } catch (e) {
      console.warn('Listener error:', e);
    }
  });
}

export function subscribeSpeakingStatus(listener: (speaking: boolean) => void): () => void {
  onSpeakingChangeListeners.push(listener);
  listener(isSpeaking);
  return () => {
    onSpeakingChangeListeners = onSpeakingChangeListeners.filter((l) => l !== listener);
  };
}

export function isAudioMuted(): boolean {
  return isMuted;
}

export function setAudioMuted(muted: boolean): void {
  isMuted = muted;
  if (muted) {
    stopSpeaking();
  }
}

export function toggleAudioMuted(): boolean {
  setAudioMuted(!isMuted);
  return isMuted;
}

/**
 * Cleanly stops any ongoing audio playback and empties the voice queue
 */
export function stopSpeaking(): void {
  voiceQueue = [];
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {}
    currentAudio = null;
  }
  notifySpeakingChange(false);
}

/**
 * Enqueues text to speak in Chotelal Ji's voice (hi-IN-MadhurNeural)
 */
export async function speak(text: string): Promise<void> {
  if (!text || !text.trim() || isMuted) return;

  // Clean markdown / emoji / asterisks for smooth TTS pronunciation
  const cleanText = text
    .replace(/[*_#`~\[\]\(\)]/g, ' ')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return;

  if (isSpeaking) {
    voiceQueue.push(cleanText);
    return;
  }

  notifySpeakingChange(true);

  try {
    let audioBlob: Blob | null = null;

    // 1. Try Cloudflare Edge TTS Worker with custom rate (+10%) & pitch (-2Hz)
    try {
      const response = await fetch(TTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          voice: 'hi-IN-MadhurNeural',
          rate: '+10%',
          pitch: '-2Hz',
        }),
      });

      if (response.ok) {
        audioBlob = await response.blob();
      }
    } catch (workerErr) {
      console.warn('Edge TTS worker note:', workerErr);
    }

    // 2. Fallback to server /api/tts endpoint if needed
    if (!audioBlob) {
      try {
        const srvRes = await fetch('https://chotelalji-tts.sumitshrivas24.workers.dev/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: cleanText,
            voice: 'hi-IN-MadhurNeural',
            rate: '+10%',
            pitch: '-2Hz',
          }),
        });
        if (srvRes.ok) {
          audioBlob = await srvRes.blob();
        }
      } catch (srvErr) {
        console.warn('Server TTS note:', srvErr);
      }
    }

    if (!audioBlob) {
      notifySpeakingChange(false);
      if (voiceQueue.length > 0) {
        speak(voiceQueue.shift()!);
      }
      return;
    }

    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    currentAudio = audio;

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
      notifySpeakingChange(false);
      if (voiceQueue.length > 0) {
        speak(voiceQueue.shift()!);
      }
    };

    audio.onerror = () => {
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
      notifySpeakingChange(false);
      if (voiceQueue.length > 0) {
        speak(voiceQueue.shift()!);
      }
    };

    await audio.play();
  } catch (err) {
    console.warn('Speak playback error:', err);
    notifySpeakingChange(false);
    if (voiceQueue.length > 0) {
      speak(voiceQueue.shift()!);
    }
  }
}
