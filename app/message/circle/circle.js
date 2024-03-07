"use client"
import { useState } from "react"
import { ReplyInvitationFunc } from "./actions.js"

export function Invitation({ Message }) {
    const [doesReply, setDoesRelpy] = useState(false)
    switch (Message.Kind) {
        case 3: var kindStr = "普通成员"; break
        case 4: var kindStr = "创作者"; break
        case 5: var kindStr = "管理"; break
        default: var kindStr = "error"
    }
    async function replyInvitation(status) {
        var formData = new FormData()
        formData.append("eid", Message.ReciverId)
        formData.append("cid", Message.CircleId)
        formData.append("stauts", status)
        const resStauts = await ReplyInvitationFunc(formData)
        if(resStauts == 200){
            setDoesRelpy(true)
        }else{
            if(status){
                alert("同意失败")
            }else{
                alert("拒绝失败")
            }
        }
    }
    if (!doesReply) {
        return (
            <main className="h-9 flex flex-auto items-center gap-2 text-lg">
                <div>{Message.SenderName + "邀请你作为" + kindStr + "加入" + Message.CircleName}</div>
                <button className="hyperlink" onClick={()=>replyInvitation(true)}>同意</button>
                <button className="hyperlink" onClick={()=>replyInvitation(false)}>拒绝</button>
            </main>
        )
    } else {
        return null
    }

}