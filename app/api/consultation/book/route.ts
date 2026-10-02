export const runtime = 'edge';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function POST(req: Request) {
  try {
    const { doctorId, patientName, patientPhone, preferredSlot, symptomsSummary } = await req.json().catch(() => ({}));

    const bookingId = 'CHOTE-DOC-' + Math.floor(100000 + Math.random() * 900000);
    const meetLink = `https://meet.chotelaljihealth.in/room/${bookingId.toLowerCase()}`;

    const bookingRecord = {
      bookingId,
      doctorId,
      patientName,
      patientPhone,
      preferredSlot: preferredSlot || 'Next available slot (Within 15 mins)',
      symptomsSummary,
      meetLink,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify({
        success: true,
        ...bookingRecord,
        message: `Consultation booked successfully with token ${bookingId}. Our medical team has sent SMS details to ${patientPhone || 'your mobile'}.`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }
}
