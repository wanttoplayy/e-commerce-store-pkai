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

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [inputNumber, setInputNumber] = useState("");
  const [qrCode, setQRCode] = useState(null);

  // Calculate total price based on the items in the cart
  const totalCartPrice = () => {
    return items.reduce((total, item) => {
      return total + Number(item.price);
    }, 0);
  };

  const generateQR = async () => {
    try {
      const response = await axios.post("/api/generate", {
        phoneNumber: inputNumber,
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
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <input
          type="text"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
          placeholder="Enter phone number"
          className="border rounded-lg p-2"
        />
        <button
          onClick={generateQR}
          className="bg-blue-600 text-white rounded-lg px-4 py-2"
        >
          Generate QR Code
        </button>
        {qrCode && (
          <div>
            <p>QR Code:</p>
            <img src={qrCode} alt="Generated QR Code" />
          </div>
        )}
      </div>
      <h2 className="text-lg font-medium text-gray-900">สรุปยอดสินค้า</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">ยอดทั้งหมด</div>
          <Currency value={totalCartPrice()} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-5"
      >
        สั่งซื้อ
      </Button>
    </div>
  );
};

export default Summary;
