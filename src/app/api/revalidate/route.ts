import { revalidatePath } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import type { NextRequest } from "next/server";

const secret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  if (!secret) {
    console.error("SANITY_REVALIDATE_SECRET is not set");
    return Response.json({ message: "Server misconfigured" }, { status: 500 });
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return Response.json({ message: "Missing signature" }, { status: 401 });
  }

  const body = await request.text();

  const valid = await isValidSignature(body, signature, secret);
  if (!valid) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidatePath("/");

  const payload = JSON.parse(body) as { _type?: string };
  console.log(`Revalidated / after ${payload._type ?? "unknown"} change`);

  return Response.json({ revalidated: true, now: Date.now() });
}
