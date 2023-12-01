import { headers } from "next/headers";
import Cookies from "universal-cookie";

import axios from "axios";
import { PostVideo } from "./post.js";
import "./post.css";
import "../navbar.css";
const cookies = new Cookies();
function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

export async function Upload(videoFiles) {
	"use server";
	var postHeaders = get_header();
	var formData = new FormData
	videoFiles.forEach( i => {
		formData.append("video", i)
	})
	// axios for <progress/>
	return axios.create({
		url:"/upload_video",
		method:"POST",
		baseURL:"http://localhost:8000/uapi/",
		headers: {
			cookie: postHeaders.cookie,
		},
		data:formData,
	})
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
		return (
			<main>
				<JumpToLogin />
			</main>
		);
	} else {
		return <p>???????{res.status}</p>;
	}
}
