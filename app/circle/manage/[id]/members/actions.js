"use server"
import { headers } from "next/headers";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export async function SearchUsersFunc(clipOfName){
    const res = await fetch("http://localhost:8000/api/search_users/"+clipOfName,{headers:{
        cookie:get_header().cookie
    }})
    if(res.status == 200){
        return await res.json()
    }else{
        return res.status
    }
}

export async function InviteFunc(formData){
    const res = await fetch("http://localhost:8000/api/invite_new_member",{
        method: "POST",
        body:formData,
        headers:{
            cookie:get_header().cookie
        }
    })
    return res.status
}