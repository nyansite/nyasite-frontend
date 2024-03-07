import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NoSymbolIcon } from "@heroicons/react/24/outline";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page() {
    const res = await fetch("http://localhost:8000/api/get_circle_joined", { headers: get_header() });
    switch (res.status) {
        case 200:
            const data = await res.json()
            const circlesDisplay = data.circles.map(i =>
                <div className=" flex flex-auto items-center justify-between h-12" key={i.Id}>
                    <div className="flex items-center h-full gap-2">
                        <img src={i.Avatar} className="h-12 w-12 rounded" />
                        <div className="text-lg text-gray-500 truncate">{i.Name}</div>
                    </div>
                    <div className="flex items-center h-full gap-2">
                        <a className="text-lg text-blue-400 hover:underline" href={"/circle/manage/"+i.Id+"/members"}>管理</a>
                    </div>
                </div>
            )
        case 404:
            return (
                <main className=" w-full flex justify-between border border-white gap-20">
                    <div className=" w-1/6 flex flex-col rounded-r-md">
                        <a className="navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf] rounded-tr-md" href="/user/self">
                            <div className=" text-lg">个人中心</div>
                        </a>
                        <div className=" navigation-unit bg-slate-200" >
                            <div className=" text-lg">社团</div>
                        </div>
                        <a className=" navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf] rounded-br-md" href="/user/subscribe">
                            <div className=" text-lg">关注列表</div>
                        </a>
                    </div>
                    <div className=" w-full flex flex-col flex-auto items-start justify-start gap-2">
                        <div className="flex flex-col w-11/12 gap-3">
                            {res.status == 200 ? circlesDisplay : null}
                            {res.status == 404 ? <div className=" flex flex-auto items-center justify-center w-full h-28">
                                <div className="flex items-center gap-3 text-gray-300"><NoSymbolIcon className=" h-12 w-12" /><div className="text-5xl">你还没有在任何社团中</div></div>
                            </div> : null}
                        </div>
                        <div className=" self-end h-12 w-32 flex items-end justify-center">
                            <a className="text_b w-32 hover:w-32 " href="/circle/apply">申请新社团</a>
                        </div>
                    </div>
                </main>
            )
        case 401:
            return redirect("/login")
        default:
            return <div>未知错误</div>
    }
}
