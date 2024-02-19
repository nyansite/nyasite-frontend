"use client"
import { useState } from "react"
import { GetSearch } from "./actions"
import { RssIcon,PlayCircleIcon,ClockIcon } from "@heroicons/react/24/outline";
import Pagination from "rc-pagination"
import "rc-pagination/assets/index.css"

function TimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString()
}

export function SearchVideosEntire({ Content,Tags,Text}){
    const [content,setContent] = useState(Content)
    const [kind,setKind] = useState(0)
    const [page,setPage] = useState(1)
    async function changeKind(kind){
        setKind(kind)
        await onChange(page,null)
    }
    async function onChange(current,pageSize){
        const res = await GetSearch(Tags,(Text?Text:""),current,kind)
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
            <div className=" flex items-center">
                <button className="text_b w-20 hover:w-20" onClick={() => changeKind(0)}>时间顺序</button>
                <button className="text_b w-20 hover:w-20" onClick={() => changeKind(1)}>点赞顺序</button>
                <button className="text_b w-20 hover:w-20" onClick={() => changeKind(2)}>播放顺序</button>
            </div>
            <SearchVideos Content={content}/>
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


export function SearchVideos({Content}){
    if(Content == null){
        return <div className=" w-full text-center">获取评论出错</div>
    }else{
        var showList = Content.videos.map(i =>
            <a className=" flex h-28 w-5/12 gap-2" key={i.Id} href={"/video/"+i.Id}>
                <img src={i.CoverPath} className="rounded"/>
                <div className=" flex flex-col flex-auto h-full">
                    <div className=" w-full">{i.Title}</div>
                    <div className="flex gap-1 w-full text-gray-400 items-center"><RssIcon className="h-4 w-4"/><div className=" w-full truncate">{i.Author.Name}</div></div>
                    <div className="flex gap-1 w-full text-gray-400 items-center"><PlayCircleIcon className="h-4 w-4"/><div className=" w-full truncate">{i.Views-1}</div></div>
                    <div className="flex gap-1 w-full text-gray-400 items-center"><ClockIcon className="h-4 w-4"/><div className=" w-full truncate">{TimestampToDate(i.CreatedAt)}</div></div>
                </div>
            </a>
        )
        return(
            <div className=" flex flex-auto justify-between flex-wrap gap-2">
                {showList}
            </div>
        )
    }
}