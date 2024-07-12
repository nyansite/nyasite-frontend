import { headers } from "next/headers";
import { Invitation } from "./circle.js";
import { InboxIcon } from "@heroicons/react/24/outline";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page() {
    const res = await fetch("http://localhost:8000/api/get_new_circle_affairs", { headers: { cookie: get_header().cookie } })
    const data = await res.json()
    if (data.messages == null) {
        return (
            <div className=" flex flex-auto items-center justify-center w-full h-28">
                <div className="flex items-center gap-3 text-gray-300"><InboxIcon className=" h-12 w-12" /><div className="text-5xl">没有社团事务</div></div>
            </div>
        )
    } else {
        var messages = data.messages.map((i) => {
            switch (i.Kind) {
                case 0:
                    return <div className="h-9 flex flex-auto items-center text-lg" key={i.Id}><div>{i.ReciverName + " 加入 " + i.CircleName}</div></div>
                case 3:
                case 4:
                case 5:
                    return <Invitation Message={i} key={i.Id} />
                case 6:
                    return <div className="h-9 flex flex-auto items-center text-lg" key={i.Id}><div>{i.SenderName + " 邀请 " + i.ReciverName + " 作为普通成员加入 " + i.CircleName}</div></div>
                case 7:
                    return <div className="h-9 flex flex-auto items-center text-lg" key={i.Id}><div>{i.SenderName + " 邀请 " + i.ReciverName + " 作为创作者成员加入 " + i.CircleName}</div></div>
                case 8:
                    return <div className="h-9 flex flex-auto items-center text-lg" key={i.Id}><div>{i.SenderName + " 邀请 " + i.ReciverName + " 作为管理加入 " + i.CircleName}</div></div>
                case 9:
                    return <div className="h-9 flex flex-auto items-center text-lg" key={i.Id}><div>{i.ReciverName + " 拒绝了 " + i.SenderName + " 加入 " + i.CircleName + " 的邀请"}</div></div>
            }
        })
        return (
            <main className=" w-full flex justify-between border border-white gap-20">
                <div className=" w-1/6 flex flex-col rounded-r-md">
                    <a className="navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf] rounded-tr-md" href="/message/video">
                        <div className=" text-lg">新视频</div>
                    </a>
                    <div className="navigation-unit bg-slate-200" >
                        <div className=" text-lg">社团事务</div>
                    </div>
                    <a className="navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf] rounded-br-md" href="/message/check">
                        <div className="text-lg">审核</div>
                    </a>
                </div>
                <div className="w-full flex items-start justify-start">
                    <div className="w-11/12 flex flex-col items-center gap-1">
                        {messages}
                    </div>
                </div>
            </main>
        )
    }
}