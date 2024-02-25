"use server"
import { headers } from "next/headers";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export async function SubscribeFunc(formData) {
    const res = await fetch("http://localhost:8000/api/subscribe",{
        method:"POST",
        body:formData,
        headers: {
            cookie: get_header().cookie
        }
    })
    return res.status
}

export async function SendBullet(formData) {
    const res = await fetch("http://localhost:8000/api/add_video_bullet", {
        method: "POST",
        body: formData,
        headers: {
            cookie: get_header().cookie
        }
    })
    return res.status
}

export async function ClickEmoji(formData) {
    const res = await fetch("http://localhost:8000/api/click_comment_emoji", {
        method: "POST",
        body: formData,
        headers: {
            cookie: get_header().cookie
        }
    })
    return res.status
}

export async function ClickCRLike(formData) {
    const res = await fetch("http://localhost:8000/api/click_commentreply_like", {
        method: "POST",
        body: formData,
        headers: {
            cookie: get_header().cookie
        }
    })
    return res.status
}


export async function SendComment(formData){
    const res = await fetch("http://localhost:8000/api/add_video_comment", {
        method:"POST",
        body:formData,
        headers:{
			cookie:get_header().cookie
		}
    })
    if(res.status == 200){
        const cid = await res.text()
        return cid
    }else{
        return res.status
    }
}

export async function SendCommentReply(formData){
    const res = await fetch("http://localhost:8000/api/add_video_comment_reply",{
        method:"POST",
        body:formData,
        headers:{
			cookie:get_header().cookie
		}
    })
    if(res.status == 200){
        const cid = await res.text()
        return cid
    }else{
        return res.status
    }
}



export async function GetComments(vid, page) {
    const res = await fetch("http://localhost:8000/api/video_comment/" + vid + "/" + page, { headers: {cookie:get_header().cookie} })
    if(res.status == 200){
        const content = await res.json()
        return content
    }else{
        return res.status
    }
}

export async function GetCommentReplies(cid){
    const res = await fetch("http://localhost:8000/api/video_comment_reply/" + cid, { headers: {cookie:get_header().cookie} })
    if(res.status == 200){
        const content = await res.json()
        return content
    }else{
        return res.status
    }
}