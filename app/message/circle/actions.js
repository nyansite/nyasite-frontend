"use server"
import { headers } from 'next/headers'

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
	return JheadersList
}

export async function ReplyInvitationFunc(formData){
    const res = await fetch("http://localhost:8000/api/reply_invitation",{
        method:"POST",
        body:formData,
        headers:{
            cookie:get_header().cookie
        }
    })
    return res.status
}