import { headers } from 'next/headers'
import Cookies from 'universal-cookie';

import SearchInput from "./SearchInput.js";
import "./navbar.css"
import "./globals.css"
const cookies = new Cookies();
function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList
}

export async function AvatarBar() {
    const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
    if (res.status == 200) {
        const list = await res.json()
        return (
            <div className='center-after'>
                <img src={list.avatar} alt='avatar'/>
            </div>
        )
    } else if (res.status == 401) {
        return (
            <div className='center-after'>
                <a href='/login' className="b hover:w-28">登录</a>
                <a href='/register' className="b hover:w-28 hover:mr-0">注册</a>
            </div>
        )
    }
}
export default async function Navbar() {
    const res = await fetch("http://localhost:8000/api/search/taglist", { headers: get_header() })
    const list = await res.json()
    return (
        <div className='navbar w-full bg-white'>
            <a className='navbar-ico' href='/'>
                <img src='./logo.svg' alt='logo' />
                <div>喵站</div>
            </a>
            <div className='center'>
                <a href='/' className="b hover:w-28 hover:ml-0">首页</a>{/* 外边距变成了内边距,图标不会移动 */}
                <a href='/1' className="b hover:w-28">分类</a>
                <SearchInput suggestions={list.results} className="b"/>
            </div>
            <div className='center-after'>
                <AvatarBar />
            </div>
        </div>
    )
}