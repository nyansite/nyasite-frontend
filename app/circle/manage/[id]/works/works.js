"use client"
import { useState } from "react"

import Pagination from "rc-pagination"
import "rc-pagination/assets/index.css"

import { RssIcon, PlayCircleIcon, ClockIcon, InboxIcon } from "@heroicons/react/24/outline";

import { DeleteVideoFunc, GetVideos } from "./actions"

function TimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString()
}

function WorksDisplay({Content ,Id,Permission}){
    const [count, setCount] = useState(Content.count)
    const [videos, setVideos] = useState(Content.content)
    async function onChange(current, pageSize) {
        const res = await GetVideos(Id, current)
        if (typeof res == "number") {
            alert("获取作品失败")
            setVideos(null)
        } else {
            setVideos(res.content)
        }
    }
    const showlist = videos.map(i =>
        <div className="flex flex-auto h-28 w-full gap-2" key={i.Id}>
            <a className="h-full" href={"/video/" + i.Id}>
                <img className="h-full rounded" src={i.CoverPath} />
            </a>
            <div className="flex flex-col flex-auto h-full">
                <a href={"/video/" + i.Id} className=" w-full">{i.Title}</a>
                <div className="flex gap-1 w-full text-gray-400 items-center"><PlayCircleIcon className="h-4 w-4" /><div className=" w-full truncate">{i.Views}</div></div>
                <div className="flex gap-1 w-full text-gray-400 items-center"><ClockIcon className="h-4 w-4" /><div className=" w-full truncate">{TimestampToDate(i.CreatedAt)}</div></div>
            </div>
            <div className="justify-self-end flex items-center">
                <DeleteVideo
                    Vid={Id}
                    Videos={videos}
                    SetVideos={setVideos}
                    Count={count}
                    SetCount={setCount}
                    Display={(i.SelfUpload) || (Permission >= 3)}
                />
            </div>
        </div>
    )
    return (
        <div className="flex flex-col w-11/12 gap-2">
            {showlist}
            {count > 20 ? <Pagination
                className="self-center"
                showQuickJumper
                showSizeChanger
                defaultPageSize={20}
                defaultCurrent={1}
                onChange={onChange}
                total={count}
            /> : null}
        </div>
    )
}

export function Works({ Content, Id, Permission }) {
    if (Content.count == 0) {
        return null
    }else{
        return <WorksDisplay Content={Content} Id={Id} Permission={Permission}/>
    }
    
}

function DeleteVideo({ Vid, Videos, SetVideos, Count, SetCount, Display }) {
    async function deleteVideo() {
        const formData = new FormData()
        formData.append("vid", Vid)
        const resStauts = await DeleteVideoFunc(formData)
        if (resStauts == 200) {
            var videosChange = Videos.filter((i) => i.Id != Vid)
            SetVideos(videosChange)
            SetCount(Count - 1)
        } else {
            alert("删除失败")
        }
    }
    if (Display) {
        return <button className="text_b" onClick={deleteVideo}>删除</button>
    } else {
        return null
    }
}