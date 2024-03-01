"use server"
import { headers } from "next/headers";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export async function ChangeSubscribeAttitude(formData) {
    const res = await fetch("http://localhost:8000/api/subscribe", {
        method: "POST",
        credentials:"omit",
        body: formData,
        headers: { cookie: get_header().cookie },
    })
    return res.status
}