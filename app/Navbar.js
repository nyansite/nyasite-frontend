import { headers } from 'next/headers'
import Cookies from 'universal-cookie';

import SearchInput from "./SearchInput.js";
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
        <div>
            <SearchInput suggestions={list.results}/>
        </div>
    )
}