'use client'
import { useState } from "react"
import { MdEditor } from "md-editor-rt"
import { useRouter } from "next/navigation";
import 'md-editor-rt/lib/style.css';
import "./unitforum.css"

export function PostCommentFourmPannel({headers}){  //跟帖的输入面板
    const [text,setText] = useState("")
    return(
        <div className="post-pannel">
            <MdEditor modelValue={text} onChange={setText} style={{height:"30vh"}}/>
            <button className="duration-300 bg-white rounded-xl border w-16 hover:bg-[#bfbfbf]">发帖</button>
        </div>
    )
}

export async function emojiMark(mid, page ,cid,kind){
    const headers = get_header()
    var formData = new FormData()
    formData.append("uid",uid)
    formData.append("emoji",kind)
    const response = await fetch("http://localhost:8000/uapi/add_mainforum", {
        method: 'POST',
        body: formData,
        credentials: "include",
        headers: {
            cookie: headers.cookie
        },
    })

}

export function JumpToForumIndex(){
    const router = useRouter()
    router.replace("/forum")
    return <a href="/forum">没有对应的帖子或页码</a>
}
export function JumpToCommentForum({cid}){
    const router = useRouter()
    router.replace("/forum/"+cid+"/1")
    return <></>
}