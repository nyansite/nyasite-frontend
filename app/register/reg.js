"use client";

export default function Reg_c() {
    const handleSubmit = event => {//避免表单提交后刷新页面
        event.preventDefault();
    };
    async function handleClick() {
        let response = await fetch("/api/register", {
            method: "POST",
            body: new FormData(freg),
            credentials: "include",
        });
        switch (response.status) {
            case 200:
                alert("200注册成功");
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
        <>
            <form id="freg" onSubmit={handleSubmit}>
                <label>用户名:<input name="username" id="username" placeholder="用户名" autoComplete="username" required autoFocus /></label>
                <label>邮箱:<input name="email" id="email" placeholder="邮箱" autoComplete="email" required/></label>
                <label>密码:<input name="passwd" id="passwd" placeholder="密码" type="password" autoComplete="current-password" minLength="6" required /></label>
                <button onClick={handleClick}>登录</button>
            </form>
        </>
    )
}