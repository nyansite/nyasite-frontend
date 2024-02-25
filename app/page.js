import { SidebarRight } from "./Sidebar";
import Refresh from "./Refresh.js"

export default function Home() {
	return <main className=" h-full">
		<div className="flex justify-normal w-full border-8 border-transparent">
			<div className=" w-full">
				
			</div>
			<SidebarRight />
			<Refresh/>
		</div>
	</main>;
}

function VideoDisplay(){
	
}
