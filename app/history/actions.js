"use server"
import { headers } from "next/headers"

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export async function GetHistory(page){
    const res = await fetch("http://localhost:8000/api/history/"+page,{headers:{cookie:get_header().cookie}})
    if(res.status == 200){
        const content = await res.json()
        return content
    }else{
        return res.status
    }
}