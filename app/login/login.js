"use client";
import { redirect } from 'next/navigation';
import "./login.css"
export default function Login_c() {
    const handleSubmit = event => {//避免表单提交后刷新页面
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
                alert("200登录成功");
                redirect("/")
            case 611:
                alert("611用户名或邮箱不存在");
                break;
            case 612:
                alert("612密码错误");
                break;
            case 613:
                alert("613重复登录");
                break;
            default:
                alert("未知错误");
        }
    }

    return (
        <main className="lr">
            <form id="flogin" onSubmit={handleSubmit}>
                <div className="title">登录</div>
                <label className="input-bar"><input name="username" id="username" placeholder="用户名或邮箱" autoComplete="username" required autoFocus /></label>
                <label className="input-bar"><input name="passwd" id="passwd" placeholder="密码" type="password" autoComplete="current-password" minLength="6" required /></label>
                <div className="bottom-bar">
                    <label><a href="">重置密码</a><a href="/register">注册账户</a></label>
                    <div><button onClick={handleClick}>
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button></div>
                </div>
            </form>
        </main>     
    )
}