"use server"
import { headers } from "next/headers";

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

export async function UploadAvatarFunc(formData) {
	const res = await fetch('https://www.helloimg.com/api/v1upload', {
        method: 'POST',
        credentials: 'omit',
        body: formData,
    })
	if(res.status == 200){
		return await res.json()
	}else{
		return res.status
	}
}

export async function PostCircleApplicationFunc(formData){
	const res = await fetch('http://localhost:8000/api/apply_circle',{
		method:"POST",
		body:formData,
		headers:{
			cookie:get_header().cookie
		}
	})
	return res.status
}