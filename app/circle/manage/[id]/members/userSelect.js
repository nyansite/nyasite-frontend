"use client"
import { useState } from "react"
import { SearchUsersFunc } from "./actions.js";


export function UserSelect({ ReturnId }) {
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
        }else if(res == 404){
            setUsersDisplay([])
        }
    }
    function selectUser(user){
        console.log(user);
        setUserSelected(
            <button className="w-32 h-9 flex gap-2 items-center border" onClick={() => {
                setUserSelected();
                setText("");
            }}>
                <img src={user.avatar} className="h-8 w-8 rounded-full"/>
                <div className="w-20 truncate">{user.name}</div>
            </button>
        )
        ReturnId(user.id)
    }
    return (
        <main className="flex flex-auto flex-col items-end justify-center gap-1">
            <div className="flex flex-auto justify-start items-center gap-2">
                <div>选择用户</div>
                {userSelected?userSelected:<input className=" h-9 w-32 border"
                    value={text}
                    onChange={(e) => changeInput(e)}
                />}
            </div>
            <div className="w-32">
                {userSelected?null:usersDisplay}
            </div>
        </main>
    )
    /*<li className=" h-9 flex gap-2 items-center border-b border-x border-gray-400">
        <img src="https://ui-avatars.com/api/?background=b3c6d7&name=flyingsnoopy" className="h-8 w-8 rounded-full" />
        <div>非苟</div>
     </li>*/
}