import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Post_c } from "./post";

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}



export default async function Post() {
	//https://developers.cloudflare.com/stream/uploading-videos/direct-creator-uploads/#step-2-use-this-api-endpoint-with-your-tus-client
	//请使用tus客户端如uppy或tus-js-client
	const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() });
	if (res.status == 200) {
		const list = await res.json();
		const resPICUItoken = await fetch("http://localhost:8000/api/get_PICUI_token", { headers: get_header() })
		const resTagList = await fetch("http://localhost:8000/api/search/taglist", { headers: get_header() })
		if (resTagList.status != 200) {
			return (
				<a href="/">获取标签列表出现错误</a>
			)
		} else if (resPICUItoken.status != 200) {
			return (
				<a href="/">获取图床token出现错误</a>
			)
		}else {
			const token = await resPICUItoken.text()
			const taglistJSON = await resTagList.json()
			console.log(taglistJSON)
			return (
				<main>
					<Post_c PICUItoken={token} TagList={taglistJSON.results} />
				</main>
			)
		}

	} else if (res.status == 401) {
		return redirect("/login");
	} else {
		return <p>???????{res.status}</p>;
	}
}
