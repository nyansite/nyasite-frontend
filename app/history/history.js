"use client"
import { useState } from "react"
import { GetHistory } from "./actions"
import { RssIcon, ClockIcon } from "@heroicons/react/24/outline";
import Pagination from "rc-pagination"
import "rc-pagination/assets/index.css"

function TimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

export function HistoryVideosEntire({Content}){
    const [content,setContent] = useState(Content)
    const [page,setPage] = useState(1)
    async function onChange(current,pageSize){
        const res = await GetHistory(page)
        if (typeof res == "number"){
            setPage(current)
            setContent(null)
        }else{
            setPage(current)
            setContent(res)
        }
    }
    return(
        <div className=" flex flex-col items-center justify-center w-full">
            <HistoryVideos Content={content}/>
            <Pagination
                showQuickJumper
                showSizeChanger
                defaultPageSize={20}
                defaultCurrent={1}
                onChange={onChange}
                total={content.count}
            />
        </div>
    )
}

export function HistoryVideos({ Content }) {
    if (Content == null) {
        return <div className=" w-full text-center">获取视频出错</div>
    } else {
        var showList = Content.body.map(i =>
            <div className=" flex h-28 w-full gap-2" key={i.Id}>
                <a className="h-full" href={"/video/" + i.Id}>
                    <img src={i.CoverPath} className="h-full rounded" />
                </a>
                <div className=" flex flex-col justify-between flex-auto h-full">
                    <a href={"/video/" + i.Id} className=" w-full">{i.Title}</a>
                    <div className=" flex border-b-2">
                        <div className="flex gap-1 w-5/12 text-gray-400 items-center"><RssIcon className="h-4 w-4" /><a className=" w-full truncate" href={"/circle/" + i.Author.Id}>{i.Author.Name}</a></div>
                        <div className="flex gap-1 w-full text-gray-400 items-center"><ClockIcon className="h-4 w-4" /><div className=" w-full truncate">上次观看:{TimestampToDate(i.CreatedAt)}</div></div>
                    </div>
                </div>
            </div>
        )
        return (
            <div className=" flex flex-col flex-wrap gap-3">
                {showList}
            </div>
        )
    }
}