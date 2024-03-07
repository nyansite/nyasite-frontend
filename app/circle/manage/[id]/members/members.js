"use client"
import { useState } from "react"
import { InviteFunc, SearchUsersFunc } from "./actions.js";

export function Invitation({ Permission, CircleId }) {
    const [isOpen, setIsOpen] = useState(false)
    const [inviteeId, setInviteeId] = useState()
    const [text, setText] = useState("")
    const [usersDisplay, setUsersDisplay] = useState([])
    const [userSelected, setUserSelected] = useState()
    async function changeInput(e) {
        setText(e.target.value)
        const res = await SearchUsersFunc(e.target.value)
        if (typeof res == "object") {
            if (res.users != null) {
                var showList = res.users.map(i =>
                    <button className=" h-9 flex gap-2 items-center border-b border-x border-gray-400" key={i.id}
                        onClick={() => selectUser(i)}>
                        <img src={i.avatar} className="h-8 w-8 rounded-full" />
                        <div className="w-20 truncate">{i.name}</div>
                    </button>
                )
                setUsersDisplay(showList)
            } else {
                setUsersDisplay([])
            }
        } else if (res == 404) {
            setUsersDisplay([])
        }
    }
    function selectUser(user) {
        setUserSelected(
            <button className=" w-full h-9 flex gap-2 items-center border" onClick={() => {
                setUserSelected();
                setUsersDisplay()
                setText("");
            }}>
                <img src={user.avatar} className="h-8 w-8 rounded-full" />
                <div className="w-20 truncate">{user.name}</div>
            </button>
        )
        setInviteeId(user.id)
    }
    async function invite() {
        var formData = new FormData(chooseKind)
        formData.append("eid", inviteeId)
        formData.append("cid", CircleId)
        const resStauts = await InviteFunc(formData)
        if (resStauts == 200) {
            setIsOpen()
            setInviteeId()
            setUserSelected();
            setUsersDisplay([])
            setText("");
            alert("邀请成功,等待回复")
        } else {
            alert("邀请失败")
        }
    }
    return (
        <main className="w-full h-12 flex items-center">
            <div className="flex flex-auto items-center justify-between w-full h-12">
                {isOpen ?
                    <div className="h-9 flex items-start gap-4">
                        <div className="flex flex-auto items-start justify-center gap-2">
                            <div className="flex flex-auto h-9 items-center"><div>选择用户</div></div>
                            <div className="flex flex-auto flex-col w-32 items-center">
                                {userSelected ? userSelected : <input className=" h-9 w-32 border"
                                    value={text}
                                    onChange={(e) => changeInput(e)}
                                />}
                                <div className="w-32">
                                    {userSelected ? null : usersDisplay}
                                </div>
                            </div>
                        </div>
                        <form className="h-full flex items-center gap-2" id="chooseKind">
                            <label>选择职位</label>
                            <select name="kind">
                                <option value={1}>普通成员</option>
                                <option value={2}>创作者</option>
                                {Permission == "4" ? <option value={3}>管理</option> : null}
                            </select>
                        </form>
                        <div className="h-full flex items-center gap-2">
                            <button className="text_b" onClick={invite}>邀请</button>
                            <button className="text_b" onClick={() => setIsOpen(false)}>取消</button>
                        </div>
                    </div> : <div/>}
                <div className="h-12 w-32 flex items-center justify-center">
                    <button className="w-32 hover:underline text-blue-400" onClick={() => setIsOpen(true)}>邀请新成员</button>
                </div>
            </div>
        </main>
    )
}