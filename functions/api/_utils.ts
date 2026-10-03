export function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export function getRecommendedVideo(symptoms: string = '', category: string = '') {
  const text = `${symptoms} ${category}`.toLowerCase();
  if (text.includes('pile') || text.includes('bawasir') || text.includes('fissure')) {
    return { videoId: 'B0Y21k3k8W8', title: 'बवासीर का आयुर्वेदिक इलाज', channelName: 'Swami Ramdev' };
  }
  return { videoId: 'B0Y21k3k8W8', title: 'सम्पूर्ण स्वास्थ्य', channelName: 'Swami Ramdev' };
}
