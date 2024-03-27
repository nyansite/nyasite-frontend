import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Works } from "./works.js"

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page({ params }) {
    const id = params.id
    const res = await fetch("http://localhost:8000/api/check_premission/" + id, { headers: get_header() })
    switch (res.status) {
        case 401:
            return redirect("/login")
        case 403:
            return redirect("/user/circle")
        case 200:
            const permissionStr = await res.text()
            const resWorks = await fetch("http://localhost:8000/api/get_circle_video/" + id + "/1/0", { headers: get_header() })
            const works = await resWorks.json()
            const permission = Number(permissionStr)
            return (
                <main className=" w-full flex justify-between border border-white gap-20">
                    <div className=" w-1/6 flex flex-col rounded-r-md">
                        <a className=" navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf] rounded-tr-md" href={"/circle/manage/" + id + "/self"}>
                            <div className=" text-lg">社团信息</div>
                        </a>
                        <a className=" navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf]" href={"/circle/manage/" + id + "/members"} >
                            <div className=" text-lg">社团成员</div>
                        </a>
                        <div className=" navigation-unit bg-slate-200 rounded-br-md" >
                            <div className=" text-lg">社团作品</div>
                        </div>
                    </div>
                    <Works Content={works} Id={id} Permission={permission}/>
                </main>
            )
    }
}