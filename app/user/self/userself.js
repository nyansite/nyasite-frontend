"use client"
import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
//dragzone
import { useDropzone } from "react-dropzone"
//cropper
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import { ChangeNameFunc, ChangeTimezone, UploadAvatar} from "./actions.js"

export function UserSelf_c({ data }) {
    return (
        <div className=" flex flex-col gap-3">
            <Avatar AvatarUrl={data.avatar} />
            <Name NameNow={data.name} />
            <div className="bar">
                <div className="title">经验</div>
                <div><progress max={16} value={data.level%16}/></div>
                <div>{(parseInt(data.level/16)+1)+"级 "+((data.level%16)*10)+"/160"}</div>
            </div>
            <Logout/>
        </div>
    )
}

function Avatar({ AvatarUrl }) {
    const [canEdit, setCanEdit] = useState(false)
    const [originalImg, setOriginalImg] = useState('')
    const [avatarImgBlob, setAvatarImgBlob] = useState()
    const [avatarImgBase64, setAvatarImgBase64] = useState(AvatarUrl)
    const cropperRef = useRef()
    const onDrop = useCallback(acceptFiles => {
        const reader = new FileReader()
        reader.onload = function (e) {
            let base64 = e.target.result
            setCanEdit(true)
            setOriginalImg(base64)
        }
        reader.readAsDataURL(acceptFiles[0])
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" })
    function imgGet(e) {
        const filedata = e.target.files[0]
        let reader = new FileReader()
        reader.onload = function (e) {
            let base64 = e.target.result
            setOriginalImg(base64)
        }
        reader.readAsDataURL(filedata)
        setCanEdit(true)
    }
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        const canvas = cropper.getCroppedCanvas()
        let resizedCanvas = document.createElement("canvas");
        let resizedContext = resizedCanvas.getContext("2d");
        resizedCanvas.width = 200;
        resizedCanvas.height = 200;
        resizedContext.drawImage(canvas, 0, 0, 200, 200);
        resizedContext.save()
        setAvatarImgBase64(resizedCanvas.toDataURL("image/png", 0.75))
        resizedCanvas.toBlob((blob) => {
            setAvatarImgBlob(blob)
        }, "image/png", 0.6)
    }
    async function changeAvatar() {
        var formData = new FormData()
        var coverfile = new File([avatarImgBlob], "avatar.png", { type: "image/png" })
        formData.append("file", coverfile)
        const resStautus = await UploadAvatar(formData)
        switch (resStautus) {
            case 200:
                alert("更改头像成功")
                setCanEdit(false)
                return
            case 502:
                alert("上传至图床失败")
                return
            default:
                alert("更改头像失败")
                return
        }
    }
    return (
        <div className=" flex flex-col gap-4">
            <div className="bar">
                <div className="title">头像</div>
                <div className="w-full flex items-center gap-2">
                    <img src={avatarImgBase64} className=" h-20 w-20 rounded-full" />
                    <button className="text_b"  {...getRootProps()}>
                        导入头像
                        <input id='file' accept="image/*" type="file" onChange={imgGet} style={{ display: "none" }} {...getInputProps()} />
                    </button>
                </div>
            </div>
            <div className=" flex-col w-full items-start gap-2" style={{ display: (canEdit ? "flex" : "none") }}>
                <div className=" h-52">
                    <Cropper
                        src={originalImg}
                        style={{ height: "100%", width: "100%" }}
                        // Cropper.js options
                        crop={onCrop}
                        ref={cropperRef}
                        marginWidth={500}
                        marginHeight={500}
                        minCropBoxWidth={200}
                        minCropBoxHeight={200}
                        viewMode={2}
                        cropBoxResizable={false}
                        aspectRatio={1}
                    />
                </div>
                <button className="text_b" onClick={changeAvatar}>上传</button>
            </div>
        </div>
    )
}

function Name({ NameNow }) {
    const [step, setStep] = useState(0)
    async function ChangeName() {
        if (step == 0) {
            alert("更改一次用户名需要80经验,确定更改吗(再次点击更改来更改昵称)?")
            setStep(1)
        } else if (step == 1) {
            var formData = new FormData(cn)
            const res = await ChangeNameFunc(formData)
            switch (res) {
                case 200:
                    alert("更改用户名成功")
                    setStep(2)
                    return
                case 403:
                    alert("等级不足,请到2级后更改")
                    return
                default:
                    alert("更改用户名失败")
            }
        }
    }
    return (
        <div className="bar items-center">
            <div className="title">昵称</div>
            <form className=" w-full" id="cn"><input name="name" defaultValue={NameNow} className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="text" autoComplete="off" /></form>
            <button onClick={ChangeName} className={"text_b hover:w-20 " + (step < 2 ? null : "hover:bg-white text-slate-300")} disabled={step > 2}>更改</button>
        </div>
    )
}



function Logout(){
    const router = useRouter()
    const logout = async () => {
		let response = await fetch("/api/logout", {
			method: "POST",
			credentials: "include",
		});
		if(response.status == 200){
            alert("登出成功")
            router.push("/")
        }else{
            alert("登出失败")
        }
	};
    return(
        <div className="bar items-center">
            <button className="text_b" onClick={logout}>退出登录</button>
        </div>
    )
}