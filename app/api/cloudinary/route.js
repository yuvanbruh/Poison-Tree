// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//   const data = await req.formData();
//   console.log(data); // Check if data is being received

//   if (data.get("file")) {
//     const file = data.get("file");

//     // Example paramsToSign generation (you may need to customize this based on your Cloudinary config)
//     const paramsToSign = {
//       timestamp: Math.floor(Date.now() / 1000),
//       folder: "your_folder_name", // Optional: Customize based on your needs
//       // Add other Cloudinary params here if needed (public_id, etc.)
//     };

//     // Generate Cloudinary signature
//     const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

//     console.log({ paramsToSign, signature });

//     return new Response(JSON.stringify({ signature, paramsToSign }), { status: 200 });
//   } else {
//     return new Response(JSON.stringify({ error: "Failed to generate signature" }), { status: 500 });
//   }
// }
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function generateSignature() {
  const paramsToSign = {
    timestamp: Math.floor(Date.now() / 1000),
    folder: "your_actual_folder_name", // set your Cloudinary folder here
  };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
  return { signature, paramsToSign };
}

export async function POST(req) {
  const { signature, paramsToSign } = generateSignature();
  return new Response(JSON.stringify({ signature, paramsToSign }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  const { signature, paramsToSign } = generateSignature();
  return new Response(JSON.stringify({ signature, paramsToSign }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
