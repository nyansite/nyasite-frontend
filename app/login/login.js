"use client";
import Image from "next/image";

export default function Login_c() {
	const handleSubmit = (event) => {
		//避免表单提交后刷新页面
		event.preventDefault();
	};
	async function handleClick() {
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
	}

	return (
		<main>
			<form id="flogin" onSubmit={handleSubmit}>
				<div>登录</div>
				<label>
					<input
						name="username"
						id="username"
						placeholder="用户名或邮箱"
						autoComplete="username"
						required
						autoFocus
					/>
				</label>
				<label>
					<input
						name="passwd"
						id="passwd"
						placeholder="密码"
						type="password"
						autoComplete="current-password"
						minLength="6"
						required
					/>
				</label>
				<div>
					<label>
						<a href="">重置密码</a>
						<a href="/register">注册账户</a>
					</label>
					<div>
						<button onClick={handleClick} className="">
							<Image src="/chevron-right-solid.svg" alt="确定" width={100} height={100}></Image>
							{/* 必须指定宽高或填充,单位只能是px  https://nextjs.org/docs/app/api-reference/components/image#width */}
						</button>
					</div>
				</div>
			</form>
		</main>
	);
}
