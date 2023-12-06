import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PostVideo } from "./post.js";
import { createAlova } from 'alova';
import ReactHook from 'alova/react';
import { xhrRequestAdapter } from '@alova/adapter-xhr';


function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

export const alovaInstance = createAlova({
	baseURL: "http://localhost:8000",
	statesHook: ReactHook,
	requestAdapter: xhrRequestAdapter(),
	responded: response => response.json()
});

export async function UploadAlovaInstance(videoFiles) {
	"use server";
	var postHeaders = get_header();
	var formData = new FormData();
	videoFiles.forEach((i) => {
		formData.append("video", i);
	});
	return alovaInstance.Post('/uapi/upload_video', formData, {
		enableUpload: true,
		headers: {
			cookie: postHeaders.cookie,
		},
	})
	// alova for <progress/>
	/*const response = await fetch("http://localhost:8000/uapi/upload_video", {
		method: "POST",
		body: FormData,
		credentials: "include",
		headers: {
			cookie: postHeaders.cookie,
		},
	});
	if (response.status==200){
		const list = await response.json()
		return list
	}else{
		return response.status
	}*/
}

export default async function Post() {
	const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() });
	if (res.status == 200) {
		const list = await res.json();
		return (
			<PostVideo Upload={UploadAlovaInstance} />
		);
	} else if (res.status == 401) {
		return redirect("/login");
	} else {
		return <p>???????{res.status}</p>;
	}
}
