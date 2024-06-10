import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { MarkVideo, MarkVideoEntire } from "./mark.js";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page() {
    const res = await fetch("http://localhost:8000/api/marks/1", { headers: { cookie: get_header().cookie } })
    switch (res.status) {
        case 401:
            redirect("/login")
        case 404:
            return <div className="flex flex-auto justify-center"><div className="flex text-gray-400 items-center"><ShieldExclamationIcon className="h-4 w-4 " /> 没有收藏视频</div></div>
        case 200:
            const data = await res.json()
            if (data.count > 20) {
                return <main className="flex flex-col items-center">
                    <div className=" w-5/6">
                        <MarkVideoEntire Content={data} />
                    </div>
                </main>
            } else {
                return <main className="flex flex-col items-center">
                    <div className=" w-5/6">
                        <MarkVideo Content={data} />
                    </div>
                </main>
            }
        default:
            return <div>未知错误</div>
    }
}

