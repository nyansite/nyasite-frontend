import { SidebarRight } from "./Sidebar";
export default function Home() {
	return <main className=" h-screen">
		<div className="flex justify-normal w-full border-8 border-transparent">
			<div className=" w-full">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
			<SidebarRight />
		</div>
	</main>;
}
