// Global Event Helpers for Chotelal Ji Health

export function openVoiceGreetingModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('chotelal:open-chat-modal'));
  }
}

export function openChatModal(expertPlus: boolean = false): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('chotelal:open-chat-modal', { detail: { expertPlus } }));
  }
}

export function openExpertPlusModal(): void {
  openChatModal(true);
}
