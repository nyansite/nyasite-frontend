'use client'
import { useState, useRef } from "react"
import { MdEditor } from "md-editor-rt"
import 'md-editor-rt/lib/style.css';
import "./post.css"
import "../navbar.css"
import Image from 'next/image'

export default function Post_c({ avatar, PostForum }) {
    const [postType, setPostType] = useState(0)
    return (
        <main style={{rowGap:"2rem"}}>
            <div className="navbar w-full bg-white">
                <a className='navbar-ico' href="/">
                    <Image src='./logo.svg' alt='logo' />
                    <div>喵站</div>
                </a>
                <div className="center">
                    <button
                        className={"b " + ((postType == 0) ? 'bg-gray-300' : '')}
                        onClick={e => setPostType(0)}
                    >发帖</button>
                    <button
                        className={"b " + ((postType == 1) ? 'bg-gray-300' : '')}
                        onClick={e => setPostType(1)}
                    >上传视频</button>
                </div>
                <div className="center-after">
                    <Image src={avatar} alt="avatar" />
                </div>
            </div>
            <div><PostPannel type={postType} PostForum={PostForum} /></div>
        </main>
    )
}

function PostPannel({ type, PostForum }) {
    const [text, setText] = useState('')
    const titleInput = useRef(null)
    async function handleClickForum() {
        var formData = new FormData(forumpost)
        formData.append('title', titleInput.current.value)
        formData.append('text', text)
        const code = await PostForum(formData)
        switch (code) {
            case 200:
                alert("发帖成功");
                break;
            default:
                alert("发帖失败");
                break;
        }
    }
    
    if (type == 0) {
        return (
            <div className="post-pannel">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="text-3xl">帖子标题:</span>
                    <input className="border h-10 text-2xl" ref={titleInput} />
                </div>
                <MdEditor modelValue={text} onChange={setText} style={{ height: "70vh" }} />
                <form id="forumpost">
                    <div>类型选择</div>
                    <select name="type" defaultValue="1" className="border">
                        <option value={0}>用户反馈</option>
                        <option value={1}>Thread贴</option>
                        <option value={2}>资源帖</option>
                    </select>
                    <button onClick={handleClickForum} className=" duration-300 bg-white rounded-xl border w-16 hover:bg-[#bfbfbf]">发帖</button>
                </form>
            </div>
        )
    }
}