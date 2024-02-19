"use server"
import { headers } from "next/headers";
import { GetSearch } from "./actions";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { SearchVideos, SearchVideosEntire } from "./search.js";


function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

export default async function Page({ searchParams }) {
	const tags = searchParams.tags
	const text = searchParams.text
	const content = await GetSearch(tags, (text?text:""), 1, 0)
	if (typeof content == "number") {
		if (content == 404) {
			return <div className="flex items-center flex-auto"><div className="flex text-gray-400 items-center"><ShieldExclamationIcon className="h-4 w-4 " /> 没有找到相关内容</div></div>
		} else {
			return <div className=' w-full text-center'>搜索出错</div>
		}
	} else {
		if (content.count > 20) {
			return <main className="flex flex-col items-center">
				<div className=" w-5/6">
					<SearchVideosEntire Content={content} Tags={tags} Text={text} />
				</div>
			</main>
		} else {
			return <main className="flex flex-col items-center">
				<div className=" w-5/6">
					<SearchVideos Content={content} />
				</div>
			</main>
		}
	}
}