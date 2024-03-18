"use server"
import { headers } from "next/headers";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export async function SubscribeFunc(formData) {
    const res = await fetch("http://localhost:8000/api/subscribe", {
        method: "POST",
        body: formData,
        headers: { cookie: get_header().cookie }
    })
    return res.status
}

export async function GetWorks(cid, page, method) {
    const res = await fetch(
        "http://localhost:8000/api/get_circle_video/" + cid + "/" + page + "/" + method,
        { headers: { cookie: get_header().cookie } }
    )
    if (res.status == 200) {
        const content = await res.json()
        return content
    } else {
        return res.status
    }
}