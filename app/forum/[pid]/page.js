import { headers } from 'next/headers'
import { JumpToForumIndex,JumpToCommentForum} from './unitforum.js';
function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList;
}
export default async function unitforum({ params }) {
    const pid = params.pid;
    const res = await fetch("http://localhost:8000/api/browse_unitforum/"+pid+"/1",{ headers: get_header() })
    if (res.status == 400){
        return <JumpToForumIndex/>
    }if(res.status == 200){
        return <JumpToCommentForum cid={pid}/>
    }
}