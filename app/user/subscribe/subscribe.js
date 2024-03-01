"use client"
import { useState } from "react"
import { ChangeSubscribeAttitude } from "./actions.js"

export function Subscribe({Cid}){
    const [SubscribeAttitude,setSubscribeAttitude] = useState(true)
    async function changeSubscribe(cid){
        var formData = new FormData()
        formData.append("cid",cid)
        const resStauts = await ChangeSubscribeAttitude(formData)
        if(resStauts == 200){
            setSubscribeAttitude(!SubscribeAttitude)
        }else{
            alert((SubscribeAttitude?"取关失败":"关注失败"))
        }
    }
    return <button className={"text_b "+(SubscribeAttitude?"bg-slate-300":null)} onClick={() => changeSubscribe(Cid)}>
        {SubscribeAttitude?"取消关注":"关注"}
        </button>
}