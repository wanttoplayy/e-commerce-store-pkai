import { NextApiRequest, NextApiResponse } from "next";
import promptpay from "promptpay-qr";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phoneNumber, amount } = req.body;

  try {
    const qrCode = promptpay(phoneNumber, { amount });
    res.status(200).json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
}
