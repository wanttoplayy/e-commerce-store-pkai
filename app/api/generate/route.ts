import { NextResponse } from "next/server";
import promptpay from "promptpay-qr";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber, amount } = body;

    const qrCode = promptpay(phoneNumber, { amount });
    return NextResponse.json({ qrCode });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to generate QR code", { status: 500 });
  }
}
