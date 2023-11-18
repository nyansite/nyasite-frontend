import { headers } from 'next/headers'
import Cookies from 'universal-cookie';

import { JumpToIndex, JumpToLogin } from '../Jump.js';
import { PostVideo } from './post.js';
import "./post.css"
import "../navbar.css"
const cookies = new Cookies();
function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList;
}

export async function handleClickForum(FormData) {
    'use server'
    var postHeaders = get_header()
    const response = await fetch("http://localhost:8000/uapi/add_mainforum", {
        method: 'POST',
        body: FormData,
        credentials: "include",
        headers:{
            cookie: postHeaders.cookie
        },
    })
    return response.status
}

export default async function Post() {
    const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
    if (res.status == 200) {
        const list = await res.json()
        return (
            <main style={{rowGap:"2rem",height:"100vh",alignItems:"center"}}>
            <div className="navbar w-full bg-white">
                <a className='navbar-ico' href="/">
                    <img src='./logo.svg' alt='logo' />
                    <div>喵站</div>
                </a>
                <div className="center-after">
                    <img src={list.avatar} alt="avatar" />
                </div>
            </div>
            <div><PostVideo/></div>
        </main>
        )
    } else if (res.status == 401) {
        return (
            <main>
                <JumpToLogin/>
            </main>
        )
    } else {
        return (<p>???????{res.status}</p>)
    }
}