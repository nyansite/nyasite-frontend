import "./sidebar.css";

export function SidebarRight() {
	return (
		<div className="siderbar">

		</div>
	)
}

async function AvatarBar() {
	const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
	console.log(get_header())
	if (res.status == 200) {
		const list = await res.json()
		return (
			<div>
				<img src={list.avatar} alt='avatar' />
			</div>
		)
	} else if (res.status == 401) {
		return (
			<div className='flex flex-col gap-2 w-full'>
				<a href='/login' className=" w-32 hover:w-28">登录</a>
				<a href='/register' className="w-32 hover:w-28">注册</a>
			</div>
		)
	}
}