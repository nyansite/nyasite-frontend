"use client"
import Hls from "hls.js"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";
import { WithContext as ReactTags } from 'react-tag-input';
import { PassVideoFunc, RejectVideoFunc } from "./actions.js"
import Modal from 'react-modal';
import { XMarkIcon } from "@heroicons/react/24/outline";


const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '17rem',
        width: '80vw',
    },
};

export function CheckVideo_c({ Content, TagList }) {
    const showList = Content.map(i =>
        <li className=" flex w-full gap-4" key={i.Id}>
            <div className=" flex flex-col gap-2 flex-auto" style={{ width: "calc(100% - 8rem)" }}>
                <div className="bar">
                    <div className="title">视频标题</div>
                    <div>{i.Title}</div>
                </div>
                <div className="bar">
                    <div className="title">视频封面</div>
                    <div className="w-full"><img className="w-full" src={i.CoverPath} /></div>
                </div>
                <div className="bar">
                    <div className="title">视频</div>
                    <div className="w-full">
                        <VideoPlayer Url={"https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.m3u8"} />
                    </div>
                </div>
                <div className="bar">
                    <div className="title">标签</div>
                    <div className="w-full">
                        <Tags AllTags={TagList} Tags={i.Tags} />
                    </div>
                </div>
                <div className="bar">
                    <div className="title">简介</div>
                    <div className="w-full">{i.Description}</div>
                </div>
                <VoteBar Avid={i.Id} />
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

function VoteBar({ Avid }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState()
    async function check(altitude) {
        if (altitude) {
            var formData = new FormData()
            formData.append("vcid", Avid)
            const resStauts = await PassVideoFunc(formData)
            if (resStauts == 200) {
                router.refresh()
                return
            } else {
                alert("审核失败")
                router.refresh()
                return
            }
        } else {
            var formData = new FormData(reject)
            if(formData.get("reason")==""){
                alert("请输入原因!")
                return
            }
            formData.append("vcid", Avid)
            const resStauts = await RejectVideoFunc(formData)
            if (resStauts == 200) {
                router.refresh()
                return
            } else {
                alert("审核失败")
                router.refresh()
                return
            }
        }
    }
    return (
        <div className='self-end flex gap-2'>
            <button className='text_b hover:w-20' onClick={() => check(true)}>同意</button>
            <button className='text_b hover:w-20' onClick={() => { setIsOpen(true); document.body.style.overflow = "hidden" }}>否决</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => { document.body.style.overflow = "auto"; setIsOpen(false) }}
                style={modalStyles}
                ariaHideApp={false}
            >
                <div className="flex flex-auto flex-col gap-4 overflow-y-auto">
                    <div className="flex flex-auto items-center justify-between">
                        <div className="h-12">
                            <div className="text-xl my-5">原因</div>
                        </div>
                        <button className="w-12 h-12" onClick={() => { document.body.style.overflow = "auto"; setIsOpen(false) }}>
                            <XMarkIcon className="mx-2 my-2 w-10 h-10" />
                        </button>
                    </div>
                    <form className="w-full flex items-center justify-center" id="reject">
                        <textarea className="mx-2 w-full h-20 border" name="reason" maxLength={250}/>
                    </form>
                    <button className="text_b self-end" onClick={()=>check(false)}>
                        <div>驳回</div>
                    </button>
                </div>
            </Modal>
        </div>
    )
}

function Tags({ AllTags, Tags }) {
    const tagsDisplay = Tags.map(function (i) {
        return { id: String(i), text: AllTags.find(tag => tag.Id == i).Text }
    })
    return <ReactTags
        tags={tagsDisplay}
        readOnly={true}
    />
}

function VideoPlayer({ Url }) {
    const videoRef = useRef()
    const hls = useRef(new Hls)
    useEffect(() => {
        hls.current.attachMedia(videoRef.current)
        hls.current.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.current.loadSource(Url)
        })
    })
    return (
        <video controls={true} ref={videoRef} />
    )
}
