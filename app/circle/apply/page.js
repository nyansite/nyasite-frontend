import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Apply_c } from "./apply.js"

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page(){
    const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
    const resHELLOIMGtoken = await fetch("http://localhost:8000/api/get_HELLOIMG_token", { headers: get_header() })
	if (res.status != 200) {
        return redirect("/login")
    }else if (resHELLOIMGtoken.status != 200){
        return <a href="/circle/apply">获取图床token出现错误</a>
    }else{
        const HELLOIMGtoken = await resHELLOIMGtoken.text()
        return(
            <main className=" w-full flex flex-col items-center">
                <Apply_c Token={HELLOIMGtoken}/>
            </main>
        )
    }
}