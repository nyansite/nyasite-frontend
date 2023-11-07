'use client'
import { useState } from "react"
import { MdEditor } from "md-editor-rt"
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown'
import 'md-editor-rt/lib/style.css';
import "./unitforum.css"

export function PostCommentFourmPannel({}) {  //跟帖的输入面板
    const [text, setText] = useState("")
    return (
        <div className="post-pannel">
            <MdEditor modelValue={text} onChange={setText} style={{ height: "30vh" }} />
            <button className="duration-300 bg-white rounded-xl border w-16 hover:bg-[#bfbfbf]">发帖</button>
        </div>
    )
}

export function JumpToForumIndex() {
    const router = useRouter()
    router.replace("/forum")
    return <a href="/forum">没有对应的帖子或页码</a>
}
export function JumpToCommentForum({ cid }) {
    const router = useRouter()
    router.replace("/forum/" + cid + "/1")
    return <></>
}
export function Unitforum_c({ content,changeEmoji }) {
    var userDataSelect = []
    const [showData, setShowData] = useState(content.Body) //用于在浏览器渲染的列表
    var showList = [] //用于在浏览器渲染的列表
    var i
    async function handleClickChangeEmoji(cid,emoji){
        const code = await changeEmoji(cid,emoji)
        if(code == 200){

        }else{

        }
    }
    for (var i of content.Body) {
        userDataSelect = content.UserShow.filter(user => user.Id == i.Author)
        showList.push(
            <div className='unit' key={i.Id} id={i.Id}>
                <a className='author-bar'><img src={userDataSelect[0].Avatar} /><div>{userDataSelect[0].Name}</div></a>
                <ReactMarkdown className='flex flex-auto items-center justify-center bg-white mx-4 rounded-xl duration-300'>{i.Text}</ReactMarkdown>
                <div></div>
                <div className='emoji-bar'>
                    <button className={"unit-emoji " + (!(i.Choose == 1) ? 'bg-white  hover:bg-[#bfbfbf]' : 'bg-gray-300')}>{"👍" + i.Like}</button>
                    <button className={"unit-emoji " + (!(i.Choose == 2) ? 'bg-white  hover:bg-[#bfbfbf]' : 'bg-gray-300')}>{"👎" + i.Dislike}</button>
                    <button className={"unit-emoji " + (!(i.Choose == 3) ? 'bg-white  hover:bg-[#bfbfbf]' : 'bg-gray-300')}>{"😄" + i.Smile}</button>
                    <button className={"unit-emoji " + (!(i.Choose == 4) ? 'bg-white  hover:bg-[#bfbfbf]' : 'bg-gray-300')}>{"🎉" + i.Celebration}</button>
                    <button className={"unit-emoji " + (!(i.Choose == 5) ? 'bg-white  hover:bg-[#bfbfbf]' : 'bg-gray-300')}>{"😕" + i.Confused}</button>
                    <button className={"unit-emoji " + (!(i.Choose == 6) ? 'bg-white  hover:bg-[#bfbfbf]' : 'bg-gray-300')}>{"❤️" + i.Heart}</button>
                    <button className={"unit-emoji " + (!(i.Choose == 7) ? 'bg-white  hover:bg-[#bfbfbf]' : 'bg-gray-300')}>{"🚀" + i.Rocket}</button>
                    <button className={"unit-emoji " + (!(i.Choose == 8) ? 'bg-white  hover:bg-[#bfbfbf]' : 'bg-gray-300')}>{"👀" + i.Eyes}</button>
                    <button className="unit-emoji bg-white hover:bg-[#bfbfbf]">回复</button>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='title bg-white mx-4 rounded-xl duration-300'>{content.Origin.Title}</div>
            <div className='unitforum-show'>{showList}</div>
        </>
    )
}