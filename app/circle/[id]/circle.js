"use client"
import { useState } from "react";
import ReactMarkdown from 'react-markdown'
import { PlayCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import "./circle.css"

function TimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString()
}

export function Circle_c({ Content }) {
    const [position, setPosition] = useState(0)
    return (
        <main className=" flex flex-col items-center w-full">
            <div className="flex flex-col gap-4 w-10/12">
                <div className="flex flex-auto justify-start items-end h-16 gap-4">
                    <img className="h-12 w-12 rounded-full" src={Content.avatar} />
                    <div>{Content.name}</div>
                </div>
                <div className="flex flex-auto justify-start border-b-2 gap-2">
                    <button className={"option " + (position == 0 ? "bg-gray-300" : "hover:bg-[#bfbfbf]")} onClick={() => setPosition(0)}>信息</button>
                    <button className={"option " + (position == 1 ? "bg-gray-300" : "hover:bg-[#bfbfbf]")} onClick={() => setPosition(1)}>作品</button>
                    <button className={"option " + (position == 2 ? "bg-gray-300" : "hover:bg-[#bfbfbf]")} onClick={() => setPosition(2)}>成员</button>
                </div>
                {position == 0 ? <Information Content={Content} /> : null}
                {position == 1 ? <Works Content={Content} /> : null}
                {position == 2 ? <Members Content={Content} /> : null}
            </div>
        </main>

    )
}

function Information({ Content }) {
    var kind = ""
    console.log(Content.kinds & (1 << 1))
    if ((Content.kinds & (1 << 0)) > 0) {
        kind += "视频/"
    }
    if ((Content.kinds & (1 << 1)) > 0) {
        kind += "音乐/"
    }
    if ((Content.kinds & (1 << 2)) > 0) {
        kind += "绘画/cos/实物/"
    }
    kind = kind.substring(0, kind.length - 1)
    return (
        <div className="flex flex-auto flex-col w-full">
            <div className="bar">
                <div className="title">简介</div>
                <ReactMarkdown className="w-full">{Content.descrption}</ReactMarkdown>
            </div>
            <div className="bar">
                <div className="title">创作类别</div>
                <div>{kind}</div>
            </div>
        </div>
    )
}

function Works({ Content }) {
    const showList = Content.videos.map(i =>
        <div className="flex flex-col w-52 gap-1">
            <a className=" w-full rounded" href={"/video/"+i.Id}>
                <img src={i.CoverPath} className="w-full rounded" />
            </a>
            <a className=" w-full" href={"/video/"+i.Id}>{i.Title}</a>
            <div className="flex gap-1 w-full text-gray-400 items-center"><PlayCircleIcon className="h-4 w-4" /><div className=" w-full truncate">{i.Views - 1}</div></div>
            <div className="flex gap-1 w-full text-gray-400 items-center"><ClockIcon className="h-4 w-4" /><div className=" w-full truncate">{TimestampToDate(i.CreatedAt)}</div></div>
        </div>
    )
    return (
        <div className="flex flex-auto flex-col w-full">
            <div className="flex flex-auto w-full flex-col">
                <div className="justify-self-start items-start font-semibold text-xl">视频</div>
            </div>
            <div className="flex gap-4 w-full h-52 flex-wrap overflow-hidden">
                {showList}
            </div>
        </div>
    )
}

function Members({Content}){
    const showList = Content.members.map(i =>
        <div className="flex items-center h-16 gap-2">
            <img src={i.Avatar} className="h-full rounded-full"/>
            <div>{i.Name}</div>
        </div>
    )
    return(
        <div className="flex flex-auto flex-wrap">
            {showList}
        </div>
    )
}