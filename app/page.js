import { SidebarRight } from "./Sidebar";
import { headers } from "next/headers";
import { ArrowLeftIcon, ArrowRightIcon, PlayCircleIcon } from "@heroicons/react/24/outline";

import { Poster, Trending } from "./index.js";

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}


export default async function Home() {
	const res = await fetch("http://localhost:8000/api/get_trending", { headers: get_header() })
	const trendingData = await res.json()
	return (
		<main className=" flex justify-center">
			<div className="flex justify-normal w-11/12 border-8 border-transparent">
				<div className="w-full h-auto flex flex-col gap-6">
					<div className="w-full flex gap-8">
						<Poster Max={2} />
						{/*<Trending trending={trendingData} />*/}
					</div>
					{/*<VideoDisplay />*/}
				</div>
				<SidebarRight />
			</div>
		</main>
	);
}

/*async function VideoDisplay() {
	const res = await fetch("http://localhost:8000/api/get_all_videos", { headers: get_header() })
	const data = await res.json()
	var content = data.result.map(i =>
		<div className="flex flex-col h-32 mx-1" key={i.Id}>
			<a className="h-20 rounded" href={"/video/" + i.Id}>
				<img src={i.CoverPath} className="h-full rounded" />
			</a>
			<a className=" w-full" href={"/video/" + i.Id}>{i.Title}</a>
			<div className="flex flex-auto w-full text-gray-400 items-center">
				<a href={"/circle/" + i.Author.Id} className="truncate mr-1">{i.Author.Name}</a>
				<PlayCircleIcon className="h-3 w-3" /><div className="truncate">{i.Views}</div>
			</div>
		</div>
	)
	return (
		<div className="w-full flex flex-wrap gap-1">
			{content}
		</div>
	)
}*/