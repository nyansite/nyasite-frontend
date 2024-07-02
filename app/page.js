import { SidebarRight } from "./Sidebar";
import { headers } from "next/headers";
import Refresh from "./Refresh.js"
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
				<div className="w-full h-auto flex flex-col">
					<div className="w-full flex gap-8">
						<Poster Max={2} />
						{/*<Trending trending={trendingData}/>*/}
					</div>
				</div>
				<SidebarRight />
				<Refresh />
			</div>
		</main>
	);
}