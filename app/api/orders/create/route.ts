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
    const { items = [], shippingAddress = {}, paymentMethod = 'cod', totalAmount = 0 } = await req.json().catch(() => ({}));

    const orderId = 'CJH-ORD-' + Date.now().toString().slice(-6);
    const trackingNumber = 'IND-POST-' + Math.floor(1000000 + Math.random() * 9000000);

    const orderRecord = {
      orderId,
      trackingNumber,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: 'PROCESSING',
      estimatedDelivery: '3 to 4 business days',
      createdAt: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify({
        success: true,
        ...orderRecord,
        message: `Order #${orderId} confirmed! Your Ayurvedic remedies are being packed at our Ayush-certified facility.`,
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
