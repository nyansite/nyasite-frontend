import { headers } from 'next/headers'
import Navbar from '@/app/Navbar.js';
import ReactMarkdown from 'react-markdown'
import 'md-editor-rt/lib/style.css';
import "./unitforum.css"
import { PostCommentFourmPannel } from './unitforum';
function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList;
}
async function PostCommentFourm(){
    const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
    if (res.status == 200) {
        const headers = get_header()
        return (
            <PostCommentFourmPannel headers={headers}/>
        )
    } else if (res.status == 401) {
        return null //如果不登录就不能跟帖
    } else {
        return (<p>???????{res.status}</p>)
    }
}

export default async function unitforum({ params }) {
    const pid = params.pid;
    const res = await fetch("http://localhost:8000/api/browse_unitforum/"+pid+"/1",{ headers: get_header() })
    if (res.status == 400){
        return <main>
            找不到对应的帖子
        </main>
    }if(res.status == 200){
        const list = await res.json()
        var userDataSelect = []
        var showList = [] //用于在浏览器渲染的列表
        for (var i of list.Body){
            userDataSelect = list.UserShow.filter(user => 
                user.Id == i.Author)
            showList.push(
                <div className='unit' key={i.Id} name={'#'+i.Id}>
                    <a className='author-bar'><img src={userDataSelect[0].Avatar}/><div>{userDataSelect[0].Name}</div></a>
                    <ReactMarkdown className='content bg-white mx-4 rounded-xl duration-300'>{i.Text}</ReactMarkdown>
                    <div></div>
                    <div className='emotion-bar'>
                        <button className='unit-emotion'>{"👍"+i.Like}</button>
                        <button className='unit-emotion'>{"👎"+i.Dislike}</button>
                        <button className='unit-emotion'>{"😄"+i.Smile}</button>
                        <button className='unit-emotion'>{"🎉"+i.Celebration}</button>
                        <button className='unit-emotion'>{"😕"+i.Confused}</button>
                        <button className='unit-emotion'>{"❤️"+i.Heart}</button>
                        <button className='unit-emotion'>{"🚀"+i.Rocket}</button>
                        <button className='unit-emotion'>{"👀"+i.Eyes}</button>
                        <button className='unit-emotion'>回复</button>
                    </div>
                </div>
            )
        }
        return(
            <main style={{gap:'2rem'}}>
                <Navbar/>
                <div className='title bg-white mx-4 rounded-xl duration-300'>{list.Origin.Title}</div>
                <div className='unitforum-show'>{showList}</div>
                <PostCommentFourm/>
            </main>
        )
    }
}