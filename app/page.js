import { SidebarRight } from "./Sidebar";
import Refresh from "./Refresh.js"
import { Poster } from "./index.js";

export default function Home() {
	return (
		<main className=" flex justify-center">
			<div className="flex justify-normal w-11/12 border-8 border-transparent">
				<div className="w-full h-auto flex flex-col">
					<Poster Max={2}/>
				</div>
				<SidebarRight />
				<Refresh />
			</div>
		</main>
	);
}



function VideoDisplay() {

}
