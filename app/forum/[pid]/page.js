import { headers } from 'next/headers'
import Unitforum_c from './unitforum.js';
function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList;
}

export default async function unitforum({ params }) {
    const pid = params.pid;
    const res = await fetch("http://localhost:8000/api/browse_unitforum/"+pid+"/1", {
        method:"GET"
    })
    if (res.status == 400){
        return <main>
            找不到对应的帖子
        </main>
    }if(res.status == 200){
        const list = await res.json()
        return <Unitforum_c pid={pid} intialData={list}/>
    }
}