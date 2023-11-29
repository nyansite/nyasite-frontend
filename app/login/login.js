"use client";
import Image from "next/image";

export default function Login_c() {
	const handleSubmit = async (event) => {
		//避免表单提交后刷新页面
		event.preventDefault();

		let response = await fetch("/api/login", {
			method: "POST",
			body: new FormData(flogin),
			credentials: "include",
		});
		switch (response.status) {
			case 200:
				window.location.href = "/";
				break;
			case 611:
				alert("611用户名或邮箱不存在");
				break;
			case 612:
				alert("612密码错误");
				break;
			case 613:
				window.location.href = "/";
				break;
			default:
				alert("未知错误");
		}
	};

	return (
		<main className="grid place-items-center h-screen">
			<form id="flogin" onSubmit={handleSubmit} className="">
				<div className="flex justify-center">登录</div>
				<input
					className="block"
					name="username"
					id="username"
					placeholder="用户名或邮箱"
					autoComplete="username"
					required
					autoFocus
				/>
				<input
					className="block"
					name="passwd"
					id="passwd"
					placeholder="密码"
					type="password"
					autoComplete="current-password"
					minLength="6"
					required
				/>
				<div className="flex justify-between">
					<a href="/register">注册账户</a>
					<a href="">重置密码</a>
				</div>
				<div className="flex justify-center">
					<button type="submit">
						<Image
							src="/chevron-right-solid.svg"
							alt="确定"
							width={32}
							height={32}
							className="h-[2em] w-auto"
						></Image>
						{/* 必须指定宽高或填充,单位只能是px  https://nextjs.org/docs/app/api-reference/components/image#width
							随便指定一个较小的值然后用css覆盖 */}
					</button>
				</div>
			</form>
		</main>
	);
}
