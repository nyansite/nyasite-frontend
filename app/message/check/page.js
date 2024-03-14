import { headers } from "next/headers";
import { Reason } from "./check.js"

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page() {
    const res = await fetch("http://localhost:8000/api/get_check_messages", { headers: { cookie: get_header().cookie } })
    if (res.status == 200) {
        const data = await res.json()
        const display = data.messages.map((i) => {
            switch (i.Kind) {
                case 0:
                    return (
                        <div className="flex flex-auto items-center w-11/12 h-16 justify-between" key={i.Id}>
                            <div className="h-full rounded">
                                <img src={i.Image} className="h-full rounded" />
                            </div>
                            <div className="flex items-center gap-1">
                                <div>{"视频" + i.Name + "已经通过审核"}</div>
                            </div>
                        </div>
                    )
                case 1:
                    return (
                        <div className="flex flex-auto items-center w-11/12 h-16 justify-between" key={i.Id}>
                            <div className="h-full rounded">
                                <img src={i.Image} className="h-full rounded" />
                            </div>
                            <div className="flex flex-col justify-center gap-1">
                                <div>{"视频" + i.Name + "没有通过审核"}</div>
                                <Reason Reason={i.Reason} Id={i.DBId}/>
                            </div>
                        </div>
                    )
                case 2:
                    return (
                        <div className="flex flex-auto items-center w-11/12 h-16 justify-between" key={i.Id}>
                            <div className="h-full rounded">
                                <img src={i.Image} className="h-full rounded" />
                            </div>
                            <div className="flex items-center gap-1">
                                <div>{i.Name + "社团已经批准建立"}</div>
                            </div>
                        </div>
                    )
                case 3:
                    return (
                        <div className="flex flex-auto items-center w-11/12 h-16 justify-between" key={i.Id}>
                            <div className="h-full rounded">
                                <img src={i.Image} className="h-full rounded" />
                            </div>
                            <div className="flex items-center gap-1">
                                <div>{i.Name + "社团没有被批准建立"}</div>
                            </div>
                        </div>
                    )
            }
        })
        return (
            <main className=" w-full flex justify-between border border-white gap-20">
                <div className=" w-1/6 flex flex-col rounded-r-md">
                    <a className="navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf] rounded-tr-md" href="">
                        <div className=" text-lg">新视频</div>
                    </a>
                    <a className="navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf]" href="/message/circle">
                        <div className=" text-lg">社团事务</div>
                    </a>
                    <div className="navigation-unit bg-slate-200 rounded-br-md">
                        <div className="text-lg">审核</div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2">
                    {display}
                </div>
            </main>
        )
    }
}