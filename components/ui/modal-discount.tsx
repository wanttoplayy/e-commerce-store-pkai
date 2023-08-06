"use client";

import Button from "./button";

import { useState } from "react";


const ModalDiscount = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isClose, setIsClose] = useState(true)
  function hanlderClose() {
    setIsClose(!isClose)
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Button className="px-10 py-5" onClick={setIsClose}>ดูส่วนลด</Button>
      {isClose && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="relative rounded-[15px] flex w-50 h-40 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <div className="flex flex-col gap-5 justify-center items-center pb-4">
                  <h1 className="text-black font-bold">รับส่วนลด ...% <br></br>เมื่อยอดสั่งซื้อครบ ... บาท</h1>
                  <Button onClick={hanlderClose}>ตกลง</Button>
                </div>

              </div>

            </div>
          </div>
        </>)}
    </>
  );
};

export default ModalDiscount;
