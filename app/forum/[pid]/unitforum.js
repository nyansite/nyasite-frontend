'use client'
import { useState } from "react"
import { MdEditor } from "md-editor-rt"
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