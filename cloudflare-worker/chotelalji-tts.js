// Cloudflare Worker: chotelalji-tts
// High-Fidelity Microsoft Edge Neural TTS Worker for Chotelal Ji Health
// Voice: hi-IN-MadhurNeural (Deep, Heavy, Warm Indian Male Voice)
// Rate: -10%, Pitch: -5Hz

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    try {
      if (request.method !== 'POST') {
        return new Response(
          JSON.stringify({ error: 'Method not allowed. Use POST /api/tts' }),
          { status: 405, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const { text, rate = '-10%', pitch = '-5Hz', voice = 'hi-IN-MadhurNeural' } =
        await request.json();

      if (!text || typeof text !== 'string') {
        return new Response(
          JSON.stringify({ error: 'Valid text is required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Sanitize XML/SSML characters
      const sanitizedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="hi-IN">
        <voice name="${voice}">
          <prosody rate="${rate}" pitch="${pitch}">
            ${sanitizedText}
          </prosody>
        </voice>
      </speak>`;

      // Microsoft Edge ReadAloud Endpoint
      const edgeEndpoint =
        'https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4';

      const response = await fetch(edgeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        },
        body: ssml,
      });

      if (!response.ok) {
        return new Response(
          JSON.stringify({
            error: 'Edge TTS synthesis failed',
            status: response.status,
          }),
          { status: 502, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const audioBuffer = await response.arrayBuffer();

      return new Response(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err.message || 'Internal TTS Server Error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  },
};
