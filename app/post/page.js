import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PostVideo } from "./post.js";
import { createAlova, useRequest } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

export async function Upload(videoFiles) {
	"use server";
	var postHeaders = get_header();
	var formData = new FormData();
	videoFiles.forEach((i) => {
		formData.append("video", i);
	});
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
			<main>
				<div>
					<PostVideo />
				</div>
			</main>
		);
	} else if (res.status == 401) {
		return redirect("/login");
	} else {
		return <p>???????{res.status}</p>;
	}
}
