import { headers } from 'next/headers'
import "../unitforum.css"
import { JumpToForumIndex, PostCommentFourmPannel, Unitforum_c } from '../unitforum.js';
import "../unitforum.js"
import Navbar from '@/app/Navbar';
function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList;
}
async function changeEmoji(cid,emoji){
    'use server'
    var formData = new FormData(forumpost)
    formData.append("uid",cid)
    formData.append("emoji",emoji)
    const res = await fetch("localhost:8000/uapi/add_emoji",{
        method:'POST',
        body:formData,
        headers: {
            cookie: get_header().cookie
        },
    })
    return res.status
}
async function PostCommentFourm(){
    const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
    if (res.status == 200) {
        const header = get_header()
        return (
            <PostCommentFourmPannel headers={header}/>
        )
    } else if (res.status == 401) {
        return null //如果不登录就不能跟帖
    } else {
        return (<p>???????{res.status}</p>)
    }
}

export default async function unitforum({ params }) {
    const header = get_header()
    const pid = params.pid;
    const page = params.page;
    const res = await fetch("http://localhost:8000/api/browse_unitforum/"+pid+"/"+page,{ headers: get_header() })
    if (res.status == 400){
        return <JumpToForumIndex/>
        //如果没有帖子默认跳转到主页(主页未完成)
    }if(res.status == 200){
        const list = await res.json()
        return (
        <main style={{rowGap:'2rem'}}>
            <Navbar/>
            <Unitforum_c content={list} changeEmoji={changeEmoji}/>
            <PostCommentFourm/>
        </main>
        )
    }
}