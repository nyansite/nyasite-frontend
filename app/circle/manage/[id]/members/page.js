import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Invitation } from "./members.js"

function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
    return JheadersList;
}

export default async function Page({ params }) {
    const id = params.id
    const res = await fetch("http://localhost:8000/api/check_premission/" + id, { headers: get_header() })
    switch (res.status) {
        case 401:
            return redirect("/login")
        case 403:
            return redirect("/user/circle")
        case 200:
            const permission = await res.text()
            const resMembers = await fetch("http://localhost:8000/api/get_circle_members/" + id, { headers: get_header() })
            const members = await resMembers.json()
            const membersDisplay = members.others.map((i) => {
                console.log(i.Permission)
                switch (i.Permission) {
                    case 1:
                        var permissionDisplay = "普通成员"; break
                    case 2:
                        var permissionDisplay = "创作者"; break
                    case 3:
                        var permissionDisplay = "管理"; break
                    case 4:
                        var permissionDisplay = "主催"; break
                }
                return (
                    <div className="flex items-center w-11/12 h-14" key={i.Id}>
                        <div className=" flex flex-auto items-center justify-between h-12 ">
                            <div className="flex items-center h-full gap-2">
                                <img src={i.Avatar} className="h-12 w-12 rounded" />
                                <div className="text-lg text-gray-500 truncate">{i.Name}</div>
                                <div>{permissionDisplay}</div>
                            </div>
                            <div className="flex items-center h-full gap-2">
                                {(permission == "4" && i.Permission <= 3) || (permission == "3" && i.Permission <= 2) ?
                                    <button className="text-lg hyperlink">踢出社团</button> : null}
                            </div>
                        </div>
                    </div>
                )
            })
            return (
                <main className=" w-full flex justify-between border border-white gap-20">
                    <div className=" w-1/6 flex flex-col rounded-r-md">
                        <a className=" navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf] rounded-tr-md" href={"/circle/manage/" + id + "/self"}>
                            <div className=" text-lg">社团信息</div>
                        </a>
                        <div className=" navigation-unit bg-slate-200" >
                            <div className=" text-lg">社团成员</div>
                        </div>
                        <a className=" navigation-unit hover:bg-[#bfbfbf] hover:border-[#bfbfbf] rounded-br-md" href={"/circle/manage/" + id + "/video"}>
                            <div className=" text-lg">社团作品</div>
                        </a>
                    </div>
                    <div className=" w-full flex flex-col flex-auto items-start justify-start gap-2">
                        <div className="flex items-center w-11/12 h-14 border-b-2 border-gray-300">
                            <div className=" flex flex-auto items-center justify-between h-12 ">
                                <div className="flex items-center h-full gap-2">
                                    <img src={members.self.Avatar} className="h-12 w-12 rounded" />
                                    <div className="text-lg text-gray-500 truncate">{members.self.Name}</div>
                                </div>
                                <div className="flex items-center h-full gap-2">
                                    {permission == "4" ? null : <button className="text-lg hyperlink">退出社团</button>}
                                </div>
                            </div>
                        </div>
                        {membersDisplay}
                        <Invitation Permission={permission} CircleId={id} />
                    </div>
                </main>
            )
    }
}