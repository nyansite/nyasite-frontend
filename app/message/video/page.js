import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RssIcon, PlayCircleIcon, ClockIcon, InboxIcon } from "@heroicons/react/24/outline";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

function TimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString()
}

export default async function Page() {
    const res = await fetch("http://localhost:8000/api/get_video_subscribed", { headers: get_header() })
    switch (res.status) {
        case 401:
            return redirect("/login")
        case 200:
            const data = await res.json()
            return (
                <main className=" w-full flex justify-between border border-white gap-20">
                    <div className=" w-1/6 flex flex-col rounded-r-md">
                        <div className="navigation-unit bg-slate-200 rounded-tr-md">
                            <div className=" text-lg">新视频</div>
                        </div>
                        <a className=" navigation-unit hover:bg-[#bfbfbf]" href="/message/circle">
                            <div className=" text-lg">社团事务</div>
                        </a>
                        <a className="navigation-unit hover:bg-[#bfbfbf] hover:border-b-[#bfbfbf] rounded-br-md" href={"/message/check"}>
                            <div className="text-lg">审核</div>
                        </a>
                    </div>
                    <div className="w-full flex items-start justify-start">
                        <DisplayVideos Content={data} />
                    </div>
                </main>
            )
        default:
            return (
                <div>未知错误</div>
            )
    }

}

function DisplayVideos({ Content }) {
    if (Content == null) {
        return <div className=" w-full text-center">获取视频出错</div>
    } else if (Content.videos == null) {
        return (
            <div className=" flex flex-auto items-center justify-center w-full h-28">
                <div className="flex items-center gap-3 text-gray-300"><InboxIcon className=" h-12 w-12" /><div className="text-5xl">没有新的视频</div></div>
            </div>
        )
    } else {
        var showList = Content.videos.map(i =>
            <div className=" flex h-28 w-5/12 gap-2" key={i.Id}>
                <a className="h-full" href={"/video/" + i.Id}>
                    <img src={i.CoverPath} className="h-full rounded" />
                </a>
                <div className=" flex flex-col flex-auto h-full">
                    <a href={"/video/" + i.Id} className=" w-full">{i.Title}</a>
                    <div className="flex gap-1 w-full text-gray-400 items-center"><RssIcon className="h-4 w-4" /><a className=" w-full truncate" href={"/circle/" + i.Author.Id}>{i.Author.Name}</a></div>
                    <div className="flex gap-1 w-full text-gray-400 items-center"><PlayCircleIcon className="h-4 w-4" /><div className=" w-full truncate">{i.Views - 1}</div></div>
                    <div className="flex gap-1 w-full text-gray-400 items-center"><ClockIcon className="h-4 w-4" /><div className=" w-full truncate">{TimestampToDate(i.CreatedAt)}</div></div>
                </div>
            </div>
        )
        return (
            <main className=" flex flex-auto justify-between flex-wrap gap-2">
                {showList}
            </main>
        )
    }
}

