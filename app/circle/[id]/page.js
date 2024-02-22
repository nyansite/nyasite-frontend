import { headers } from 'next/headers'
import { redirect } from 'next/navigation';
import { Circle_c } from './circle';

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList;
}

export default async function Page({ params }){
    const id = params.id
    if (isNaN(Number(id))) {
        redirect("/404")
    }
    const res = await fetch("http://localhost:8000/api/get_circle/"+id,{
        headers:get_header()
    })
    switch (res.status){
        case 200:
            const data = await res.json()
            return <Circle_c Content={data}/>
        case 404:
            return redirect("/404")
        default:
            return <div className=' w-full text-center'>获取社团出错</div>
    }
}