"use client";
import { useState, useEffect } from "react";

export const formatter = new Intl.NumberFormat()

interface CurrencyProps {
  value?: number | string;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return <div className="font-semibold">{formatter.format(Number(value))} บาท</div>;
};

export default Currency;
