import { headers } from 'next/headers'
import Cookies from 'universal-cookie';

import SearchInput from "./SearchInput.js";
import "./navbar.css"
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
        <div className='navbar'>
            <div className='navbar-left'>
                <img src='./logo.svg' alt='logo'/>
                <a href='/'>首页</a>
                <a href=''>论坛</a>

            </div>
            <div className='search'><SearchInput suggestions={list.results}/></div>
            <div className='navbar-right'>
                <a>
                    <img src={'../public/spirte-0001.png'} alt='ico'/>
                </a>
                <button>
                    <div className='navbar-right-img-border'><div className='navbar-right-img'>
                        <svg fill="none" stroke="black" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"></path>
                        </svg>
                    </div></div>
                    <div>我的消息</div>
                </button>
                <button>
                    <div className='navbar-right-img-border'><div className='navbar-right-img'>
                        <svg fill="none" stroke="black" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div></div>
                    <div>历史记录</div>
                </button>
                <button>
                    <div className='navbar-right-img-border'><div className='navbar-right-img'>
                        <svg fill="none" stroke="black" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
                        </svg>
                    </div></div>
                    <div>我的收藏</div>
                </button>
                <button>
                    <div className='navbar-right-img-border'><div className='navbar-right-img'>
                        <svg fill="none" stroke="black" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"></path>
                        </svg>
                    </div></div>
                    <div>动态消息</div>
                </button>
            </div>
        </div>
    )
}