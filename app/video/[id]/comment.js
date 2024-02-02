"use client"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import { MdEditor } from "md-editor-rt"
import 'md-editor-rt/lib/style.css'
import Pagination from "rc-pagination"
import "rc-pagination/assets/index.css"
import "./video.css"
import { ClickEmoji, GetComments, SendComment } from "./actions"


function TimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 8)
}

export function CommentsEntire({ Content, Vid }) {
    const [content, setContent] = useState(Content)
    async function onChange(current, pageSize) {
        const res = await GetComments(Vid, current)
        if (typeof res == "number") {
            setContent(null)
        } else {
            setContent(res)
        }
    }

    return (
        <div className=" flex flex-col items-center justify-center w-full">
            <Comments Content={content} />
            <Pagination
                showQuickJumper
                showSizeChanger
                defaultPageSize={20}
                defaultCurrent={1}
                onChange={onChange}
                total={content.Count}
            />
        </div>
    )
}


export function Comments({ Content }) {
    if (Content == null) {
        return <div className=" w-full text-center">获取评论出错</div>
    } else {
        var showList = Content.Body.map(i =>
            <li className=" flex w-full gap-4" key={i.Id}>
                <div className=" w-28 flex flex-col items-center">
                    <div className=" w-full h-28 flex justify-items-center items-center">
                        <img className=" h-24 w-24 rounded-full" src={Content.UserShow.find(user => user.Id == i.Author).Avatar} />
                    </div>
                    <div className=" w-full text-gray-600">{Content.UserShow.find(user => user.Id == i.Author).Name}</div>
                </div>
                <div className=" flex flex-col gap-2 flex-auto" style={{ width: "calc(100% - 8rem)" }}>
                    <ReactMarkdown className=" w-full">{i.Text}</ReactMarkdown>
                    <div className=" text-gray-500">{TimestampToDate(i.CreatedAt)}</div>
                    <EmojiBar fmct={i} />
                    <CommentReply Replies={i.CRdisplay} Authors={Content.UserShow} />
                    <button className=" text_b self-end">详细</button>
                </div>
            </li>
        )
        return (
            <ul className=" flex flex-col gap-2 w-full">
                {showList}
            </ul>
        )
    }

}

function CommentReply({ Replies, Authors }) {
    if (Replies == null) {
        return null
    } else {
        var showList = Replies.map(i =>
            <div className=" flex items-center justify-center h-5 gap-2" key={i.Id}>
                <img className=" w-4 h-4 rounded-full" src={Authors.find(user => user.Id == i.Author).Avatar} />
                <div className=" h-5 text-base truncate" style={{ width: "calc(100% - 1.5rem)" }}>{i.Text}</div>
            </div>
        )
        return (
            <>{showList}</>
        )
    }
}

function EmojiBar({ fmct }) {
    const [choose, setChoose] = useState(fmct.Choose)
    var like = fmct.Like
    var dislike = fmct.Dislike
    var smile = fmct.Smile
    var celebration = fmct.Celebration
    var confused = fmct.Confused
    var heart = fmct.Heart
    var rocket = fmct.Rocket
    var eyes = fmct.Eyes
    //删掉用户已选择的，在渲染时加回来
    switch (fmct.Choose) {
        case 1:
            like--
            break
        case 2:
            dislike--
            break
        case 3:
            smile--
            break
        case 4:
            celebration--
            break
        case 5:
            confused--
            break
        case 6:
            heart--
            break
        case 7:
            rocket--
            break
        case 8:
            eyes--
            break
    }
    async function handleClickChangeEmoji(cid, emoji) {
        var formData = new FormData()
        formData.append("cid",cid)
        formData.append("emoji",emoji)
        const code = await ClickEmoji(formData)
        if (code == 200) {
            setChoose(emoji)
        } else {
            alert("发送表情失败")
            return
        }
    }
    //如果被选择就显示阴影 ((choose == 1) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"👍" + ((choose == 1)? (like+1):like)
    //补回用户选择的表情 ((choose == 1)? (like+1):like)
    return (
        <div className=" flex items-center gap-2 justify-start flex-wrap">
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 1)} className={"unit-emoji " + ((choose == 1) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"👍" + ((choose == 1) ? (like + 1) : like)}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 2)} className={"unit-emoji " + ((choose == 2) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"👎" + ((choose == 2) ? (dislike + 1) : dislike)}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 3)} className={"unit-emoji " + ((choose == 3) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"😄" + ((choose == 3) ? (smile + 1) : smile)}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 4)} className={"unit-emoji " + ((choose == 4) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"🎉" + ((choose == 4) ? (celebration + 1) : celebration)}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 5)} className={"unit-emoji " + ((choose == 5) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"😕" + ((choose == 5) ? (confused + 1) : confused)}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 6)} className={"unit-emoji " + ((choose == 6) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"❤️" + ((choose == 6) ? (heart + 1) : heart)}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 7)} className={"unit-emoji " + ((choose == 7) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"🚀" + ((choose == 7) ? (rocket + 1) : rocket)}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 8)} className={"unit-emoji " + ((choose == 8) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"👀" + ((choose == 8) ? (eyes + 1) : eyes)}</button>
        </div>
    )
}

export function CommentPost({ Vid, User }) {
    async function handlePostComment() {
        var formData = new FormData()
        formData.append("vid", Vid)
        formData.append("text", text)
        const resStauts = await SendComment(formData)
        if (resStauts == 200) {
            setSendText(text)
        } else {
            alert("发送评论出错")
        }
    }
    const [text, setText] = useState("")
    const [sendText, setSendText] = useState("")
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <MdEditor
                className=" h-56 w-full"
                editorId="mainEditor"
                modelValue={text}
                onChange={setText}
            />
            <button className=" text_b self-end w-24 h-8 hover:w-24" onClick={handlePostComment}>
                发送评论
            </button>
            <CommentSingle Text={sendText} User={User}/>
        </div>
    )
}

function CommentSingle({ Text, User }) {
    if (Text == "") {
        return null
    } else {
        const emojiSelf = {
            Choose: 0,
            Like: 0,
            Dislike: 0,
            Smile: 0,
            Celebration: 0,
            Confused: 0,
            Heart: 0,
            Rocket: 0,
            Eyes: 0,
        }
        return (
            <div className=" flex w-full gap-4">
                <div className=" w-28 flex flex-col items-center">
                    <div className=" w-full h-28 flex justify-items-center items-center">
                        <img className=" h-24 w-24 rounded-full" src={User.avatar} />
                    </div>
                    <div className=" w-full text-gray-600">{User.name}</div>
                </div>
                <div className=" flex flex-col gap-2 flex-auto" style={{ width: "calc(100% - 8rem)" }}>
                    <ReactMarkdown className=" w-full">{Text}</ReactMarkdown>
                    <div className=" text-gray-500">{TimestampToDate((Date.now())/1000)}</div>
                    <EmojiBar fmct={emojiSelf} />
                    <button className=" text_b self-end">详细</button>
                </div>
            </div>
        )
    }
}