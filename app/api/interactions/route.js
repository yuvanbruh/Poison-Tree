export async function POST(req) {
  await connectMongoDB();
  try {
    const { userEmail, postId, action, vector } = await req.json();

    if (!userEmail || !postId || !action) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const data = { userEmail, postId, action };
    if (Array.isArray(vector) && vector.length > 0) {
      data.vector = vector;
    }

    const created = await Interaction.create(data);
    console.log("✅ Interaction saved:", created);

    return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
  } catch (err) {
    console.error("❌ Interaction save failed:", err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
}
