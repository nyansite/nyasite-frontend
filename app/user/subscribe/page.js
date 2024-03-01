import { headers } from "next/headers";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { Subscribe } from "./subscribe.js"

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page() {
    const res = await fetch("http://localhost:8000/api/get_circle_subscribed", { headers: get_header() })
    switch (res.status) {
        case 200:
            const data = await res.json()
            const circlesSubscribedDisplay = data.circles.map(i =>
                <div className=" flex flex-auto items-center justify-between h-12" key={i.Id}>
                    <div className="flex items-center h-full gap-2">
                        <img src={i.Avatar} className="h-12 w-12 rounded" />
                        <div className="text-lg text-gray-500 truncate">{i.Name}</div>
                    </div>
                    <div className="flex items-center h-full gap-2">
                        <Subscribe Cid={i.Id}/>
                    </div>
                </div>
            )
        case 404:
            return (
                <main className=" w-full flex justify-between border border-white gap-20">
                    <div className=" w-1/6 flex flex-col rounded-r-md">
                        <a className=" rounded-tr-md" href="/user/self">
                            <div className=" navigation-unit hover:bg-[#bfbfbf] hover:border-b-[#bfbfbf] text-lg">个人中心</div>
                        </a>
                        <a className=" navigation-unit hover:bg-[#bfbfbf] hover:border-b-[#bfbfbf]" href="/user/circle">
                            <div className=" text-lg">社团</div>
                        </a>
                        <div className=" navigation-unit bg-slate-200 rounded-br-md" >
                            <div className=" text-lg">关注列表</div>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col flex-auto items-start justify-start gap-2">
                        <div className="flex flex-col w-11/12 gap-3">
                            {res.status == 200 ? circlesSubscribedDisplay : null}
                            {res.status == 404 ? <div className=" flex flex-auto items-center justify-center w-full h-28">
                                <div className="flex items-center gap-3 text-gray-300"><NoSymbolIcon className=" h-12 w-12" /><div className="text-5xl">没有关注任何社团</div></div>
                            </div> : null}
                        </div>
                    </div>
                </main>
            )
    }
}