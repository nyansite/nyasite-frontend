"use client"
import { Circle } from "rc-progress"
import { ArrowLeftIcon, ArrowRightIcon,PlayCircleIcon } from "@heroicons/react/24/outline";
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

export function Trending({ trending }){
    const [type,setType] = useState(0)
    if(type == 0){
        var content = trending.daily.map(i =>
            <div className="flex flex-col h-32 mx-1">
                <a className="h-20 rounded" href={"/video/" + i.Id}>
                    <img src={i.CoverPath} className="h-full rounded" />
                </a>
                <a className=" w-full" href={"/video/" + i.Id}>{i.Title}</a>
                <div className="flex gap-1 w-full text-gray-400 items-center"><a src={"/circle/"+i.Author.Id}>{i.Author.Name}</a><PlayCircleIcon className="h-5 w-5" /><div className=" w-full truncate">{i.Views}</div></div>
            </div>
        )
    }else if(type == 1){
        var content = trending.weekly.map(i =>
            <div className="flex flex-col h-32 mx-1">
                <a className="h-20 rounded" href={"/video/" + i.Id}>
                    <img src={i.CoverPath} className="h-full rounded" />
                </a>
                <a className=" w-full" href={"/video/" + i.Id}>{i.Title}</a>
                <div className="flex gap-1 w-full text-gray-400 items-center"><a src={"/circle/"+i.Author.Id}>{i.Author.Name}</a><PlayCircleIcon className="h-5 w-5" /><div className=" w-full truncate">{i.Views}</div></div>
            </div>
        )
    }else if(type == 2){
        var content = trending.monthly.map(i =>
            <div className="flex flex-col h-32 mx-1">
                <a className="h-20 rounded" href={"/video/" + i.Id}>
                    <img src={i.CoverPath} className="h-full rounded" />
                </a>
                <a className=" w-full" href={"/video/" + i.Id}>{i.Title}</a>
                <div className="flex gap-1 w-full text-gray-400 items-center"><a src={"/circle/"+i.Author.Id}>{i.Author.Name}</a><PlayCircleIcon className="h-5 w-5" /><div className=" w-full truncate">{i.Views}</div></div>
            </div>
        )
    }
    return(
        <div className="w-auto h-72 flex flex-col justify-start gap-1">
            <div className="h-6 w-full flex gap-4">
                <div className="text-base font-bold">热门</div>
                <button className={"h-6 align-middle "+(type==0?"border-b-2":null)} onClick={() => setType(0)}>每日</button>
                <button className={"h-6 align-middle "+(type==1?"border-b-2":null)} onClick={() => setType(1)}>每周</button>
                <button className={"h-6 align-middle "+(type==2?"border-b-2":null)} onClick={() => setType(2)}>每月</button>
                <a className="hyperlink">详情</a>
            </div>
            <div className=" flex flex-wrap h-full overflow-y-hidden gap-1">
                {content}
            </div>
        </div>
    )  
}