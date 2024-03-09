"use client";

import React from "react";
import { useRouter } from "next/navigation"

export default function Reg_c() {
	const router = useRouter()
	async function handleClick(event) {
		event.preventDefault();
		var formData = new FormData(freg);
		for (var pair of formData.entries()) {
			if (pair[0] == "passwd") {
				var password = pair[1]
			}
			if (pair[0] == "passwdCheck") {
				if (pair[1] == password) {
					break
				} else {
					alert("密码不一致")
					return
				}
			}
		}
		let response = await fetch("/api/register", {
			method: "POST",
			body: formData,
			credentials: "include",
		});
		switch (response.status) {
			case 200:
				router.replace("/login")
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
		<main className="m-0 m-auto w-5/6">
			<div className="border-gray border-2 rounded shadow-lg w-full flex flex-col items-center">
				<h1 className="text-[40px]">注册</h1>
				<form id="freg" className="flex flex-col w-3/4 gap-6 p-10" onSubmit={handleClick}>
					<div className="bar">
						<label className="title">用户名</label>
						<div className="w-full"><input name="username" maxLength={15} className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="text" autoComplete="off" /></div>
					</div>
					<div className="bar">
						<label className="title">电子邮箱</label>
						<div className="w-full"><input name="email" className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="email" autoComplete="off" /></div>
					</div>
					<div className="bar">
						<label className="title">密码</label>
						<div className="w-full"><input name="passwd" className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="password" autoComplete="off" /></div>
					</div>
					<div className="bar">
						<label className="title">重复密码</label>
						<div className="w-full"><input name="passwdCheck" className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="password" autoComplete="off" /></div>
					</div>
					<button className=" self-end text_b">注册</button>
				</form>
			</div>
		</main>
	);
}
