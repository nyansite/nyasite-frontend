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
export default async function Navbar(){
    const res = await fetch("http://localhost:8000/api/search/taglist", { headers: get_header() })
    const list = await res.json()
    return(
        <div className='navbar w-full bg-white'>
            <div className='navbar-ico'>
                <img src='./logo.svg' alt='logo'/>
                <div>喵站</div>
            </div>
            <div className='center'>
                <a href='/' className="navbar_b  hover:ml-0">首页</a>{/* 外边距变成了内边距,图标不会移动 */}
                <a href='/1' className="navbar_b">分类</a>
                <SearchInput suggestions={list.results} className="navbar_b"/>
            </div>
            <div className='center-after'>
                <a href='/login' className="navbar_b">登录</a>
                <a href='/register' className="navbar_b hover:mr-0">注册</a>
            </div>
        </div>
    )
}