"use client"
import { useState } from "react"

import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/outline";

import ReactMarkdown from 'react-markdown'

import Modal from 'react-modal';

import { MdEditor } from "md-editor-rt"
import 'md-editor-rt/lib/style.css'

import Pagination from "rc-pagination"
import "rc-pagination/assets/index.css"

import "./video.css"
import { ClickCRLike, ClickEmoji, GetCommentReplies, GetComments, SendComment, SendCommentReply } from "./actions"

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '80vh',
        width: '80vw'
    },
};

function TimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 8)
}

export function CommentsEntire({ Content, Vid, User }) {
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
            <div className=" flex items-center">
                <button className="text_b w-20 hover:w-20">时间顺序</button>
                <button className="text_b w-20 hover:w-20">点赞顺序</button>
            </div>
            <Comments Content={content} User={User} />
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


export function Comments({ Content, User }) {
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
                    <div className="self-end flex items-center"><ExpandComment Cid={i.Id} User={User} /></div>
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
        formData.append("cid", cid)
        formData.append("emoji", emoji)
        const code = await ClickEmoji(formData)
        if (code == 200) {
            if (emoji == choose) {
                setChoose(0)
            } else {
                setChoose(emoji)
            }
        } else {
            alert("发送表情失败")
            return
        }
    }
    //如果被选择就显示阴影 ((choose == 1) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"👍" + ((choose == 1)? like:(like-1))
    //补回用户选择的表情 ((choose == 1)? like:(like-1))
    return (
        <div className=" flex items-center gap-2 justify-start flex-wrap">
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 1)} className={"unit-emoji " + ((choose == 1) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"👍" + ((choose == 1) ? like : (like - 1))}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 2)} className={"unit-emoji " + ((choose == 2) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"👎" + ((choose == 2) ? dislike : (dislike - 1))}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 3)} className={"unit-emoji " + ((choose == 3) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"😄" + ((choose == 3) ? smile : (smile - 1))}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 4)} className={"unit-emoji " + ((choose == 4) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"🎉" + ((choose == 4) ? celebration : (celebration - 1))}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 5)} className={"unit-emoji " + ((choose == 5) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"😕" + ((choose == 5) ? confused : (confused - 1))}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 6)} className={"unit-emoji " + ((choose == 6) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"❤️" + ((choose == 6) ? heart : (heart - 1))}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 7)} className={"unit-emoji " + ((choose == 7) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"🚀" + ((choose == 7) ? rocket : (rocket - 1))}</button>
            <button onClick={() => handleClickChangeEmoji(fmct.Id, 8)} className={"unit-emoji " + ((choose == 8) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"👀" + ((choose == 8) ? eyes : (eyes - 1))}</button>
        </div>
    )
}

export function CommentPost({ Vid, User }) {
    const [cid, setCid] = useState()
    const [text, setText] = useState("")
    const [sendText, setSendText] = useState("")
    async function handlePostComment() {
        if (!text.replace(/\s/g, '').length) {
            alert("发送评论不能为空")
        } else {
            var formData = new FormData()
            formData.append("vid", Vid)
            formData.append("text", text)
            const res = await SendComment(formData)
            if (typeof res == "number") {
                alert("发送评论出错")
            } else {
                setSendText(text)
                setCid(Number(res))
                setText("")
            }
        }
    }
    return (
        <div className=" w-full flex flex-col items-center gap-3">
            <MdEditor
                className="h-56 w-full"
                editorId="mainEditor"
                modelValue={text}
                onChange={setText}
                maxLength={1000}
            />
            <button className=" text_b self-end w-24 h-8 hover:w-24" onClick={handlePostComment}>
                发送评论
            </button>
            <CommentSingle Text={sendText} User={User} Cid={cid} />
        </div>
    )
}

function CommentSingle({ Text, User, Cid }) {
    if (Text == "") {
        return null
    } else {
        const emojiSelf = {
            Choose: 0,
            Like: 1,
            Dislike: 1,
            Smile: 1,
            Celebration: 1,
            Confused: 1,
            Heart: 1,
            Rocket: 1,
            Eyes: 1,
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
                    <div className=" text-gray-500">{TimestampToDate((Date.now()) / 1000)}</div>
                    <EmojiBar fmct={emojiSelf} />
                    <div className="self-end flex items-center"><ExpandComment Cid={Cid} User={User} /></div>
                </div>
            </div>
        )
    }
}

function ExpandComment({ Cid, User }) {
    const [isOpen, setIsOpen] = useState(false)
    const [Content, SetContent] = useState({
        Body: null,
        Origin: null,
        UserShow: null,
    })
    const [text, setText] = useState()
    const [newText, setNewText] = useState(null)
    const [crid, setCrid] = useState()
    //这个添加追评有bug就是只会显示最后一条提交的追评，这个版本就先咕了，下个版本再修改
    async function PostComment() {
        if (!text.replace(/\s/g, '').length) {
            alert("评论不能为空")
        } else {
            var formData = new FormData()
            formData.append("text", text)
            formData.append("cid", Cid)
            setNewText(text)
            const res = await SendCommentReply(formData)
            if (typeof res == "number") {
                alert("发送评论出错")
            } else {
                setText("")
                setCrid(Number(res))
            }
        }
    }
    async function OpenCommentFunc() {
        var resContent = await GetCommentReplies(Cid)
        if (typeof resContent == "number") {
            alert("获取评论失败")
            return
        } else {
            SetContent(resContent)
            setIsOpen(true)
            document.body.style.overflow = "hidden"
            return
        }
    }
    function CloseCommentFunc() { document.body.style.overflow = "auto"; setIsOpen(false) }
    return (
        <>
            <button onClick={OpenCommentFunc}>详细</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={CloseCommentFunc}
                style={modalStyles}
                ariaHideApp={false}
            >
                <div className="flex flex-auto flex-col gap-4 overflow-y-visible">
                    <button className="h-12 w-12 self-end" onClick={CloseCommentFunc}>
                        <XMarkIcon className="h-10 w-10" />
                    </button>
                    <div className=" flex w-full gap-4">
                        <div className=" w-28 flex flex-col items-center">
                            <div className=" w-full h-28 flex justify-items-center items-center">
                                <img className=" h-24 w-24 rounded-full" src={Content.UserShow ? Content.UserShow.find(user => user.Id == Content.Origin.Author).Avatar : null} />
                            </div>
                            <div className=" w-full text-gray-600">{Content.UserShow ? Content.UserShow.find(user => user.Id == Content.Origin.Author).Name : null}</div>
                        </div>
                        <div className=" flex flex-col gap-2 flex-auto" style={{ width: "calc(100% - 8rem)" }}>
                            <ReactMarkdown className=" w-full">{Content.Origin ? Content.Origin.Text : null}</ReactMarkdown>
                            <div className=" text-gray-500">{Content.Origin ? TimestampToDate(Content.Origin.CreatedAt) : null}</div>
                            <form id="comment" className=" flex flex-auto gap-2">
                                <div className=" w-12">回复</div>
                                <textarea value={text} onChange={e => setText(e.target.value)} name="text" maxLength={300} rows={4} className="w-full border border-gray-400  px-2 py-1 text-gray-700" autoComplete="invaild" />
                            </form>
                            <button className="text_b self-end" onClick={PostComment}>回复</button>
                        </div>
                    </div>
                    <ul className=" w-full flex flex-col gap-2">
                        {newText ? <li className=" w-full flex flex-col gap-1" key={0}>
                            <div className="w-full flex items-center gap-1 h-8">
                                <img src={User.avatar} className="h-6 w-6 rounded-full" />
                                <div>{User.name}</div>
                            </div>
                            <div className=" w-full">{newText}</div>
                            <div className="w-full flex gap-2 items-center text-gray-400">
                                <div>{TimestampToDate((Date.now()) / 1000)}</div>
                                <Like IsLiked={false} Crid={crid} Count={0} />
                            </div>
                        </li> : null}
                        {Content.Body ? <CommentRepliesList Body={Content.Body} UserShow={Content.UserShow} /> : null}
                    </ul>
                </div>
            </Modal>
        </>
    )

}

function CommentRepliesList({ Body, UserShow }) {
    const showList = Body.map(i =>
        <li className=" w-full flex flex-col gap-1" key={i.Id}>
            <div className="w-full flex items-center gap-1 h-8">
                <img src={UserShow.find(user => user.Id == i.Author).Avatar} className="h-6 w-6 rounded-full" />
                <div>{UserShow.find(user => user.Id == i.Author).Name}</div>
            </div>
            <div className=" w-full">{i.Text}</div>
            <div className="w-full flex gap-2 items-center text-gray-400">
                <div>{TimestampToDate(i.CreatedAt)}</div>
                <Like IsLiked={i.Like_c} Crid={i.Id} Count={i.Likes} />
            </div>
        </li>)
    return (
        <>{showList}</>
    )
}

function Like({ Crid, IsLiked, Count }) {
    const count = (IsLiked ? Count - 1 : Count)
    const [isLiked, setIsLiked] = useState(IsLiked)
    async function handleClickChangeLike() {
        var formData = new FormData()
        formData.append("crid", Crid)
        const code = await ClickCRLike(formData)
        if (code == 200) {
            setIsLiked(!isLiked)
            return
        } else {
            alert("发送点赞失败")
            return
        }
    }
    return (
        <div className=" h-6 flex justify-start items-center gap-1">
            <button className="h-5 w-5 flex items-center justify-center" onClick={handleClickChangeLike}>
                <HandThumbUpIcon className={"h-4 w-4 " + (isLiked ? "fill-gray-400" : null)} />
            </button>
            <div>{isLiked ? count + 1 : count}</div>
        </div>
    )
}