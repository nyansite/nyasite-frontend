import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CheckVideo_c } from "./video";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page() {
    const res = await fetch("http://localhost:8000/api/get_all_videos_needtocheck", { headers: get_header() })
    const resTagList = await fetch("http://localhost:8000/api/taglist", { headers: get_header() })
    switch (res.status) {
        case 401:
            return redirect("/login")
        case 403:
            return redirect("/")
        case 200:
            var content = await res.json()
            var taglist = await resTagList.json()
            return (
                <main className=" w-full flex justify-between border border-white gap-20">
                    <div className=" w-1/6 flex flex-col rounded-r-md">
                        <div className="navigation-unit bg-slate-200 rounded-tr-md">
                            <div className="  text-lg">视频审核</div>
                        </div>
                        <a className=" navigation-unit hover:bg-[#bfbfbf] hover:border-b-[#bfbfbf] rounded-br-md" href="/check/circle">
                            <div className=" text-lg">社团审核</div>
                        </a>
                    </div>
                    <div className=" w-full flex items-start justify-start">
                        {content.results?<CheckVideo_c TagList={taglist.results} Content={content.results}/>:null}
                    </div>
                </main>
            )
        default:
            return redirect("/")
    }
}