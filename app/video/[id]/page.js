import { headers } from 'next/headers'
import { EyeIcon, ClockIcon } from '@heroicons/react/24/outline'
import { redirect } from "next/navigation";
import { VideoPlayer,Author } from './video.js';
import { SendBullet } from './actions.js'

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList;
}


function timestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 8)
}

export default async function Page({ params }) {
    const id = params.id
    if (isNaN(Number(id))) {
        redirect("/")
    }
    const res = await fetch("http://localhost:8000/api/get_video/" + id, { headers: get_header() })
    if (res.status == 200) {
        const data = await res.json()
        const danmakuRes = await fetch("http://localhost:8000/api/get_bullets/"+id,{headers: get_header()})
        const danmaku = await danmakuRes.json()
        console.log(danmaku)
        return (
            <main className=" flex flex-col items-center gap-12">
                <div className=" flex w-10/12 gap-4 h-8 justify-between">
                    <div className=" w-3/4 flex flex-col justify-between flex-nowrap h-full">
                        <div className=" flex justify-start w-full text-3xl">
                            <div className=" w-full ellipisis_end">{data.title}</div>
                        </div>
                        <div className=" flex justify-start items-center text-slate-400 gap-2">
                            <EyeIcon className=" h-4 w-4" />
                            <div>{data.views}</div>
                            <ClockIcon className=" h-4 w-4" />
                            <div>{timestampToDate(data.creatTime)}</div>
                        </div>
                    </div>
                    <Author/>
                </div>
                <VideoPlayer VideoUrl={data.videoPath} DanmakuOptions={danmaku} Vid={params.id} SendDamaku={SendBullet}/>
            </main>
        )
    } else {
        redirect("/404")
    }
}