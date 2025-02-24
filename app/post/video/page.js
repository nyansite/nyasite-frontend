import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Post_c } from "./post";

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}



export default async function Page() {
	//https://developers.cloudflare.com/stream/uploading-videos/direct-creator-uploads/#step-2-use-this-api-endpoint-with-your-tus-client
	//请使用tus客户端如uppy或tus-js-client
	const res = await fetch("http://localhost:8000/api/get_available_circle/0", { headers: get_header() });
	switch (res.status) {
		case 200:
			const list = await res.json();
			const resHELLOIMGtoken = await fetch("http://localhost:8000/api/get_HELLOIMG_token", { headers: get_header() })
			const resTagList = await fetch("http://localhost:8000/api/taglist", { headers: get_header() })
			if (resTagList.status != 200) {
				return (
					<a href="/post/video">获取标签列表出现错误</a>
				)
			} else if (resHELLOIMGtoken.status != 200) {
				return (
					<a href="/post/video">获取图床token出现错误</a>
				)
			} else {
				const HELLOIMGtoken = await resHELLOIMGtoken.text()
				const taglistJSON = await resTagList.json()
				return (
					<main>
						<Post_c Token={HELLOIMGtoken} TagList={taglistJSON.results} CircleList={list.circles} />
					</main>
				)
			}
		case 400:
			return <div className="flex flex-auto justify-center"><a className="flex text-gray-400 items-center" href="/user/circle">没有加入有相关资质社团</a></div>
		case 401:
			return redirect("/login");
		default:
			return <p>???????{res.status}</p>;
	}
}
