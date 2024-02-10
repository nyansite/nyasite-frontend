"use server"
import { headers } from "next/headers";

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

export async function PassVideoFunc(formData) {
    const res = await fetch('http://localhost:8000/api/pass_video', {
        method: "POST",
        body: formData,
        headers: {
            cookie: get_header().cookie
        }
    })
    return res.status
}

export async function RejectVideoFunc(formData) {
    const res = await fetch('http://localhost:8000/api/reject_video',{
        method:"POST",
        body:formData,
        headers:{
            cookie: get_header().cookie
        }
    })
    return res.status
}