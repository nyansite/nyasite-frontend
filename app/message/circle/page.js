import { headers } from "next/headers";

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page(){
    const res = await fetch("http://localhost:8000/api/get_new_circle_affairs",{headers:{cookie:get_header().cookie}})
    const data = await res.json()
    var messages = []
    data.messages.map((i) => {
        switch(i.Kind){
            
        }
    }
    )
}