"use server"
import { headers } from "next/headers";

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

export default async function Page({searchParams}){
	const tags = searchParams.tags
	const text = searchParams.text
	var formData = new FormData()
	formData.append("tags",tags)
	formData.append("text",text)
	formData.append("page",1)
	formData.append("kind","0")
	const res = await fetch("http://127.0.0.1:8000/api/search_video",{
		method:"POST",
		body:formData,
		headers:get_header()
	})
}