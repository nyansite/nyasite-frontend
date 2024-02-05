import { headers } from "next/headers";

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

export function SidebarRight() {
	return (
		<div className=" w-40 flex flex-col gap-2 items-start">
			<AvatarBar/>
		</div>
	)
}

async function AvatarBar() {
	const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
	if (res.status == 200) {
		const list = await res.json()
		return (
			<a className='flex items-center flex-col gap-2 w-32' href="/user/self">
				<img src={list.avatar} alt='avatar' className=" h-20 w-20 rounded-full" />
			</a>
		)
	} else if (res.status == 401) {
		return (
			<div className='flex items-center flex-col gap-2 w-full'>
				<a href='/login' className="text_b w-32 hover:w-30">登录</a>
				<a href='/register' className="text_b w-32 hover:w-30">注册</a>
			</div>
		)
	}
}