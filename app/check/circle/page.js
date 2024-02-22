import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CheckCircle_c } from "./circle.js"

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page() {
    const res = await fetch("http://localhost:8000/api/get_all_circles_needtocheck", { headers: get_header() })
    switch (res.status) {
        case 401:
            return redirect("/login")
        case 403:
            return redirect("/")
        default:
            var content = await res.json()
            return (
                <main className=" w-full flex justify-between border border-white gap-20">
                    <div className=" w-1/6 flex flex-col rounded-r-md">
                        <a className="navigation-unit hover:bg-[#bfbfbf] hover:border-b-[#bfbfbf] rounded-tr-md" href="/check/video">
                            <div className="  text-lg">视频审核</div>
                        </a>
                        <div className=" navigation-unit bg-slate-200 rounded-br-md" >
                            <div className=" text-lg">社团审核</div>
                        </div>
                    </div>
                    <div className=" w-full flex items-start justify-start">
                        {content.results?<CheckCircle_c Content={content.results}/>:null}
                    </div>
                </main>
            )
    }
}