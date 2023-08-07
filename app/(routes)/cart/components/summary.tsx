"use client";
import QRCode from "qrcode";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import scanQR from "@/public/ThaiQR.jpg";
import Image from "next/image";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [qrCode, setQRCode] = useState<string | null>(null);

  // Calculate total price based on the items in the cart
  const totalCartPrice = () => {
    return items.reduce((total, item) => {
      return total + Number(item.price);
    }, 0);
  };

  const generateQR = async () => {
    try {
      const response = await axios.post("/api/generate", {
        phoneNumber: "0966863456",
        amount: totalCartPrice(), // Use the totalCartPrice function to get the total price
      });
      const qrDataURL = await QRCode.toDataURL(response.data.qrCode);
      setQRCode(qrDataURL);
      console.log(response.data.qrCode);
      console.log(response);
    } catch (error) {
      console.error(error);
      // display a toast or some other form of error message
    }
  };

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );

    window.location = response.data.url;
  };

  return (
    <div className="border-black border-2 mt-16 rounded-lg px-4 py-5 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-5">
      <div className="rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-0 ">
        <h1 className="text-center mb-3">ชำระด้วย QR code</h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          <button
            onClick={generateQR}
            disabled={items.length === 0}
            className="bg-[#01427a] text-white rounded-lg px-4 py-2         disabled:cursor-not-allowed 
            disabled:opacity-50"
          >
            กดเพื่อแสดง QR Code
          </button>
          {qrCode && (
            <div className="flex flex-col items-center">
              <Image
                alt="Generate QR code"
                src={scanQR}
                className="h-[150px] object-cover"
              />
              <img src={qrCode} alt="Generated QR Code" width={300} />
            </div>
          )}
        </div>
        {/* <h2 className="text-lg font-medium text-gray-900">สรุปยอดสินค้า</h2> */}
      </div>
      <div className="mt-10 flex flex-col items-center">
        <h1 className="text-center mb-3">ชำระด้วยบัตรเครดิต</h1>
        <Button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="bg-[#01427a] text-white rounded-lg px-4 py-2"
        >
          กดเพื่อชำระด้วยบัตร
        </Button>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-around gap-20 pt-4">
          <div className="font-semibold text-[20px] text-gray-900">
            ยอดทั้งหมด
          </div>
          <p className="font-bold text-[25px] underline">
            {totalCartPrice()} บาท
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
