import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserSelf_c } from "./userself.js"


function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page() {
    const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() });
    if(res.status == 200){
        const resData = await res.json()
        return (
            <main className=" w-full flex justify-between border border-white gap-20">
                <div className=" w-1/6 flex flex-col rounded-r-md">
                    <div className=" navigation-unit bg-slate-200 rounded-tr-md">
                        <div className=" text-lg">个人中心</div>
                    </div>
                    <a className=" navigation-unit hover:bg-[#bfbfbf] hover:border-b-[#bfbfbf] " href="/user/circle">
                        <div className=" text-lg">社团</div>
                    </a>
                    <a className=" navigation-unit hover:bg-[#bfbfbf] hover:border-b-[#bfbfbf] rounded-br-md" >
                        <div className=" text-lg">作品管理</div>
                    </a>
                </div>
                <div className=" w-full flex items-start justify-start">
                    <UserSelf_c data={resData}/>
                </div>
            </main>
        )
    }else{
       return redirect("/login")
    }
    
}
