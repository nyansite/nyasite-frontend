"use client"
import { useState } from "react"
import Modal from 'react-modal'
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DeleteVideoFunc } from "./actions.js";
import { useRouter } from "next/navigation.js";

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '17rem',
        width: '80vw',
    },
};

export function Reason({ Reason, Id }) {
    const [isOpen, setIsOpen] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const rounter = useRouter()
    function CloseModal() { document.body.style.overflow = "auto"; setIsOpen(false) }
    async function DeleteVideo(){
        if(deleteStatus){
            var formData = new FormData()
            formData.append("id",Id)
            const resStauts = await DeleteVideoFunc(formData)
            if(resStauts == 200){
                document.body.style.overflow = "auto"
                setIsOpen(false)
                rounter.refresh()
                return
            }else{
                alert("删除失败")
                return
            }
        }else{
            setDeleteStatus(true)
            alert("确认删除视频吗?")
            return
        }
    }
    return (
        <>
            <button className="hyperlink" onClick={()=>{ document.body.style.overflow='hidden';setIsOpen(true)}}>详细</button>
            <Modal
                isOpen={isOpen}
                style={modalStyles}
                onRequestClose={CloseModal}
                ariaHideApp={false}
            >
                <div className="flex flex-auto flex-col gap-4 overflow-y-auto">
                    <button className="self-end w-12 h-12" onClick={CloseModal}>
                        <XMarkIcon className=" m-2 w-10 h-10" />
                    </button>
                    <div>{Reason}</div>
                    <div className="self-end flex items-center gap-2">
                        <button className="text_b" onClick={DeleteVideo}>{deleteStatus?"确认删除":"删除视频"}</button>
                        <button className="text_b" onClick={CloseModal}>取消</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}