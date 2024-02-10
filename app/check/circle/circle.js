"use client"
import ReactMarkdown from 'react-markdown'
import { VoteFunc } from "./actions.js"
import { useRouter } from 'next/navigation'

export function CheckCircle_c({ Content }) {
    const showList = Content.map(i =>
        <li className=" flex w-full gap-4" key={i.Id}>
            <div className=" w-28 flex flex-col items-center">
                <div className=" w-full h-28 flex justify-items-center items-center">
                    <img className=" h-24 w-24 rounded-full" src={i.Avatar} />
                </div>
                <div className=" w-full text-gray-600">{i.Name}</div>
            </div>
            <div className=" flex flex-col gap-2 flex-auto" style={{ width: "calc(100% - 8rem)" }}>
                <div className="bar">
                    <div className="title">社团介绍</div>
                    <ReactMarkdown className="w-full">{i.Descrption}</ReactMarkdown>
                </div>
                <div className="bar">
                    <div className="title">社团申请依据</div>
                    <div className="w-full">{i.ApplyText}</div>
                </div>
                <VoteBar Acid={i.Id} />
            </div>
        </li>
    )
    return (
        <main>
            <ul className=" flex flex-col gap-2 w-full">
                {showList}
            </ul>
        </main>
    )
}

function VoteBar({ Acid }) {
    const router = useRouter()
    async function vote(altitude) {
        var formData = new FormData()
        formData.append("altitude", altitude)
        formData.append("acid", Acid)
        const resStauts = await VoteFunc(formData)
        if (resStauts == 200) {
            router.refresh()
            return
        } else {
            alert("投票失败")
            router.refresh()
            return
        }
    }
    return (
        <div className='self-end flex gap-2'>
            <button className='text_b hover:w-20' onClick={() => vote(true)}>同意</button>
            <button className='text_b hover:w-20' onClick={() => vote(false)}>否决</button>
        </div>
    )
}