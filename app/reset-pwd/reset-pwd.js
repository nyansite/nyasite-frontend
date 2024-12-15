"use client"
import { useState } from "react";
import { GetVerCode, ResetPwd } from "./actions";
import { useTimer } from "react-timer-hook"

export default function ResetPwd() {
    const time = new Date();
    const {
        totalSeconds,
        restart,
    } = useTimer({ time });
    console.log(totalSeconds)
    const [warning, setWarning] = useState("")
    async function getVerCodeInner() {
        if (totalSeconds <= 0) {
            var formData = new FormData(rq)
            setWarning("")
            const time = new Date()
            const res = GetVerCode(formData)
            if ((typeof res == "boolean") && res) {
                time.setSeconds(time.getSeconds() + 60)
                restart(time)
            } else if (typeof res == "number") {
                time.setSeconds(time.getSeconds() + res)
                restart(time)
            } else {
                setWarning("账户未找到")
            }
        }
    }
    async function resetPwdInner() {
        var formData = new FormData(rq)
        const res = ResetPwd(formData)
        if ((typeof res == "boolean") && res) {
            alert("更改成功")
        } else {
            switch (res) {
                case "expired":
                    setWarning("验证码已过期")
                    return
                case "incorrectVerCode":
                    setWarning("验证码无效")
                    return
                default:
                    setWarning("未知错误")
                    return
            }
        }
    }
    return (
        <main className="m-auto w-5/6">
            <div className="border-gray border-2 rounded shadow-lg w-full flex flex-col items-center">
                <h1 className="text-[40px]">重置密码</h1>
                <form className="flex flex-col w-3/4 gap-6 p-10" id="rq">
                    <div className="bar">
                        <label className="title">邮箱</label>
                        <div className="w-full"><input name="email" maxLength={15} className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="email" autoComplete="off" required /></div>
                    </div>
                    <div className="bar">
                        <label className="title">密码</label>
                        <div className="w-full"><input name="pwd" maxLength={15} className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="password" minLength="6" autoComplete="off" required /></div>
                    </div>
                    <div className="bar">
                        <label className="title">验证码</label>
                        <div className="w-full">
                            <input name="verCode" maxLength={15} className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="text" autoComplete="off" required />
                        </div>
                        <button className={"text_b w-44 " + ((totalSeconds == 0) ? null : "text-gray-300")} onClick={getVerCodeInner}>
                            {(totalSeconds == 0) ? "获取验证码" : totalSeconds + "s后再发送"}
                        </button>
                    </div>
                    <div className="bar text-red-500">{warning}</div>
                    <button className=" self-end text_b" onClick={resetPwdInner}>重置密码</button>
                </form>
            </div>
        </main>
    )
}