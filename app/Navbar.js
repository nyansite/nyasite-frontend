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
export default async function Navbar({index}){
    const res = await fetch("http://localhost:8000/api/search/taglist", { headers: get_header() })
    const list = await res.json()
    return(
        <div className='navbar'>
            <div className='navbar-left'>
                <img src='./logo.svg' alt='logo'/>
                <div>喵站</div>
            </div>
            <div className='search'><SearchInput suggestions={list.results}/></div>
            <div className='navbar-right'>
                <a>
                    <img src={'../public/spirte-0001.png'} alt='ico'/>
                </a>
            </div>
        </div>
    )
}