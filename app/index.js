"use client"
import { Circle } from "rc-progress"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function Poster({ Max }) {
    //2：3竖海报
    const [number, setNumber] = useState(0)
    function nextOrPerious(isNext) {
        if (isNext) {
            if (number == Max) {
                setNumber(0)
            } else {
                setNumber(number + 1) 
            }
        } else {
            if (number == 0) {
                setNumber(Max)
            } else {
                setNumber(number -1)
            }
        }
    }
    return (
        <div className=" w-48 h-72">
            <img className="w-48 h-72"
                src={"/poster/" + String(number) + ".png"}
            />
            <div className="w-44 h-6 flex justify-end items-center gap-2 relative mx-2" style={{ top: "-1.5rem" }}>
                <Circle percent={(number / Max)*100} strokeWidth={10} strokeColor={"white"} className=" w-4 h-4" />
                <button className=" w-4 h-4 flex items-center justify-center" onClick={() => nextOrPerious(false)}><ArrowLeftIcon className="w-3 h-3 text-white" /></button>
                <button className=" w-4 h-4 flex items-center justify-center" onClick={() => nextOrPerious(true)}><ArrowRightIcon className="w-3 h-3 text-white" /></button>
            </div>
        </div>
    )
}