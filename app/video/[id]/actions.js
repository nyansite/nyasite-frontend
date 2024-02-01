"use server"
import react from "@heroicons/react";
import { headers } from "next/headers";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export async function SendBullet(formData) {
    const res = await fetch("http://localhost:8000/api/add_video_bullet", {
        method: "POST",
        body: formData,
        headers: {
            cookie: get_header().cookie
        }
    })
    return res.status
}

export async function ClickEmoji(formData) {

}

export async function GetComments(vid, page) {
    console.log("http://localhost:8000/api/video_comment/" + vid + "/" + page)
    const res = await fetch("http://localhost:8000/api/video_comment/" + vid + "/" + page, { headers: {cookie:get_header().cookie} })
    if(res.status == 200){
        const content = await res.json()
        return content
    }else{
        return res.status
    }
}