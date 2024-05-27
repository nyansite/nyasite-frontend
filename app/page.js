import { SidebarRight } from "./Sidebar";
import Refresh from "./Refresh.js"
import { Poster, Trending } from "./index.js";

export default async function Home() {
	const res = await fetch("http://localhost:8000/api/get_trending")
	const trendingData = await res.json()
	return (
		<main className=" flex justify-center">
			<div className="flex justify-normal w-11/12 border-8 border-transparent">
				<div className="w-full h-auto flex flex-col">
					<div className="w-full flex gap-8">
						<Poster Max={2} />
						<Trending trending={trendingData}/>
					</div>
				</div>
				<SidebarRight />
				<Refresh />
			</div>
		</main>
	);
}