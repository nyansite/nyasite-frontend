"use client";

import React from "react";
import "./reg.css";

export default function Reg_c() {
	const handleSubmit = (event) => {
		//避免表单提交后刷新页面
		event.preventDefault();
	};
	async function handleClick() {
		var formData = new FormData(freg);
		let response = await fetch("/api/register", {
			method: "POST",
			body: formData,
			credentials: "include",
		});
		switch (response.status) {
			case 200:
				alert("200注册成功");
				window.location.href = "/login";
				break;
			case 601:
				alert("601用户名重复");
				break;
			case 602:
				alert("602邮箱重复");
				break;
			default:
				alert("未知错误");
		}
	}

	return (
		<main className="lr">
			<div className="reg-pannel">
				<form id="freg" onSubmit={handleSubmit}>
					<div className="title">注册</div>
					<label className="input-bar">
						<input
							name="username"
							id="username"
							placeholder="用户名"
							autoComplete="username"
							required
							autoFocus
						/>
					</label>
					<label className="input-bar">
						<input
							name="email"
							id="email"
							placeholder="邮箱"
							autoComplete="email"
							required
						/>
					</label>
					<label className="input-bar">
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
						<button onClick={handleClick}>登录</button>
					</div>
				</form>
			</div>
		</main>
	);
}
