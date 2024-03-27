"use server"
import { headers } from "next/headers";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export async function DeleteVideoFunc(formData){
    const res = await fetch("http://localhost:8000/api/delete_video",{
        method:"POST",
        body:formData,
        headers:{
            cookie:get_header().cookie
        }
    })
    return res.status
}

export async function GetVideos(cid, page) {
    const res = await fetch(
        "http://localhost:8000/api/get_circle_video/" + cid + "/" + page + "/0" ,
        { headers: { cookie: get_header().cookie } }
    )
    if (res.status == 200) {
        const content = await res.json()
        return content
    } else {
        return res.status
    }
}