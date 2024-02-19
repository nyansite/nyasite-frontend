"use server"
import { headers } from "next/headers";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export async function GetSearch(tags,text,page,kind){
    var formData = new FormData()
	formData.append("tags",tags)
    console.log(tags)
	formData.append("text",text)
    console.log(text)
	formData.append("page",page)
    console.log(page)
	formData.append("kind",kind)
    console.log(kind)
    const res = await fetch("http://localhost:8000/api/search_video",{
        method:"POST",
        body:formData,
        headers:{cookie:get_header().cookie}
    })
    if(res.status == 200){
        const content = await res.json()
        return content
    }else{
        return res.status
    }
}