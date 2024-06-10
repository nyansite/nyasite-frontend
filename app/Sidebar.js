import { headers } from "next/headers";
import { CalendarDaysIcon,BookmarkIcon } from "@heroicons/react/24/outline";

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

async function ClockIn() {
	var formData = new FormData()
	var date = new Date();
	formData.append("timezone", -date.getTimezoneOffset() * 60)
	await fetch("http://localhost:8000/api/clockin", {
		method: "POST",
		body: formData,
		headers: {
			cookie: get_header().cookie
		}
	})
}

export async function SidebarRight() {
	const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
	return (
		<div className=" w-40 flex flex-col gap-2 items-center">
			<AvatarBar Res={res} />
			<div className="flex items-center flex-col gap-2 w-full">
				{res.status == 200 ?
					<>
						<a href="/history" className="text_b w-32 hover:w-30"><CalendarDaysIcon className="w-4 h-4" />历史</a>
						<a href="/mark" className="text_b w-32 hover:w-30"><BookmarkIcon className="w-4 h-4" />收藏</a>
					</>
					: null
				}
			</div>
		</div>
	)
}

async function AvatarBar({ Res }) {
	switch (Res.status) {
		case 200:
			const list = await Res.json()
			await ClockIn()
			return (
				<>
					<a className='flex items-center flex-col gap-2 w-32' href="/user/self">
						<img src={list.avatar} alt='avatar' className=" h-20 w-20 rounded-full" />
					</a>
				</>
			)
		case 401:
			return (
				<div className='flex items-center flex-col gap-2 w-full'>
					<a href='/login' className="text_b w-32 hover:w-30">登录</a>
					<a href='/register' className="text_b w-32 hover:w-30">注册</a>
				</div>
			)
		default:
			return (
				<div className='flex items-center flex-col gap-2 w-full'>
					<a href='/login' className="text_b w-32 hover:w-30">登录</a>
					<a href='/register' className="text_b w-32 hover:w-30">注册</a>
				</div>
			)
	}
}