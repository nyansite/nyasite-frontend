import { headers } from 'next/headers'
import Cookies from 'universal-cookie';

import { JumpToLogin } from '../Jump.js';
import Post_c from './post.js';
const cookies = new Cookies();
function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList;
}

export async function handleClickForum(FormData) {
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
            <Post_c avatar={list.avatar} PostForum={PostForum}/>
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