import "./globals.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import { ChatBubbleLeftRightIcon, ArchiveBoxIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import SearchInput from "./SearchInput";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="zh-hans">
			<body className={inter.className}>
				<div className="flex fixed  w-full bg-white h-16 top-0 items-center z-50">
					<a className="justify-self-start whitespace-nowrap flex items-center" href="/">
						<Image alt="logo" width={32} height={32} src="/logo.svg" className=" w-16 h-16" />
					</a>
					<div className="absolute left-1/4">
						<SearchInput />
					</div>
					<div className=" absolute right-0 whitespace-nowrap flex items-center">
						<a className="img_b">
							<ArchiveBoxIcon className="h-12 w-12 text-[#516e8b]" />
							<div>消息</div>
						</a>
						<a className="img_b">
							<ChatBubbleLeftRightIcon className="h-12 w-12  text-[#516e8b]" />
							<div>论坛</div>
						</a>
						<a className="img_b" href="/post">
							<CloudArrowUpIcon className="h-12 w-12 text-[#516e8b]" />
							<div>上传</div>
						</a>
					</div>
				</div>
				<div className="w-full h-16 absolute"></div>
				{children}
			</body>
		</html>
	);
}
