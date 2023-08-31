import { headers } from 'next/headers'
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList
}
function Login({ username, passwd }) {
    useEffect(() => {
        const res = fetch("",{
            method: "POST",
            
        })
    }, [username, passwd]);
}
export default async function login() {
    // console.log(JSON.stringify(get_header()))

    const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
    if (res.status == 200) {
        return (<p>登录过了DA☆ZE</p>)
    } else if (res.status == 401) {
        return (<p>登录</p>)
    } else {
        return (<p>???????{res.status}</p>)
    }
}