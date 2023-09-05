"use client";

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
                islogin = true;
                break;
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
        <>
            <form id="flogin" onSubmit={handleSubmit}>
                <label>用户名:<input name="username" id="username" placeholder="用户名或邮箱" autoComplete="username" required autoFocus /></label>
                <label>密码:<input name="passwd" id="passwd" placeholder="密码" type="password" autoComplete="current-password" minLength="6" required /></label>
                <button onClick={handleClick}>登录</button>
            </form>
        </>
    )
}