// Chotelal Ji Neural Voice Engine (Microsoft Edge Neural TTS: hi-IN-MadhurNeural)
// Deep, Heavy, Warm Indian Male Voice played via HTML5 Audio (<audio>)
// Powered by JavaScript Audio Queue System for guaranteed greeting priority and sequential playback

import { audioQueue, AudioQueueItem } from './audioQueue';

export const CHOTELAL_GREETING_TEXT =
  'Namaste! Main Chotelal Ji hoon. Batao, aapko kya takleef hai?';

export const CHOTELAL_GREETING_HINDI =
  'नमस्ते! मैं छोटेलाल जी हूँ। बताओ, आपको क्या तकलीफ है?';

export { audioQueue };

export function subscribeVoiceStatus(cb: (speaking: boolean) => void): () => void {
  return audioQueue.onSpeakingChange((speaking) => cb(speaking));
}

export function subscribeAudioLevel(cb: (level: number) => void): () => void {
  return audioQueue.onAudioLevelChange((lvl) => cb(lvl));
}

/**
 * Stop all playing and queued speech immediately
 */
export function stopChotelalVoice(): void {
  audioQueue.stopAll();
}

/**
 * Plays an utterance using the sequential audio queue
 * Guarantees that AI responses never overlap or interrupt greetings
 */
export function playChotelalVoice(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): void {
  const cleanText = text.trim();
  if (!cleanText) return;
  audioQueue.enqueueAiResponse(cleanText, onStart, onEnd);
}

/**
 * Enqueues and plays the greeting first
 */
export function speakChotelalGreeting(
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): void {
  audioQueue.enqueueGreeting(CHOTELAL_GREETING_HINDI, onStart, onEnd);
}

/**
 * Helper to open voice greeting modal
 */
export function openVoiceGreetingModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('chotelal:open-voice-modal'));
  }
}
