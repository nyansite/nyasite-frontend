"use client"
import { useState } from "react"
import { UserSelect } from "./userSelect.js";



export function Invitation() {
    const [isOpen, setIsOpen] = useState(false)
    const [inviterId,setInviterId] = useState()
    return (
        <main className="w-full h-12 flex items-center">
            <div className="flex flex-auto items-center justify-between w-full h-12">
                <div className="h-12 flex items-start">
                    <UserSelect ReturnId={setInviterId}/>
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                    <button className="text_b w-32 hover:w-32" onClick={() => setIsOpen(true)}>邀请新成员</button>
                </div>
            </div>
        </main>
    )
}