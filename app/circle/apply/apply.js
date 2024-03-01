"use client"
import React, { useEffect, useRef, useState, useCallback } from "react"
//dragzone
import { useDropzone } from "react-dropzone"
//cropper
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import { PostCircleApplicationFunc, UploadAvatarFunc } from "./actions"
//mdeditor
import { MdEditor } from "md-editor-rt"
import 'md-editor-rt/lib/style.css'
import { redirect } from "next/dist/server/api-utils"
//router
import { useRouter } from "next/navigation"

export function Apply_c({ Token }) {
    const [avatarUrl, setAvatarUrl] = useState("")
    const [text, setText] = useState("")
    const router = useRouter()
    async function postCircleApplication() {
        var formData = new FormData(application)
        for (var pair of formData.entries()) {
            if(pair[0] == "name" && pair[1] == ""){
                alert("没有输入标题")
                return
            }
            if(pair[0] == "pastworks" && pair[1] == ""){
                alert("没有输入过往作品")
                return
            }
        }
        formData.append("description",text)
        formData.append("avatar",avatarUrl)
        if (text == ""){
            alert("没有输入简介")
        }else if (formData.get("type") == null){
            alert("没有选择类别")
            return
        }else if(avatarUrl == ""){
            alert("没有输入头像")
            return
        }
        const res = await PostCircleApplicationFunc(formData)
        switch(res){
            case 200:
                alert("申请成功，等待审核")
                router.back()
                return 
            case 507:
                alert("社团名重复")
                return
            default :
                alert("未知错误")
                return 
        }
    }
    return (
        <main className=" flex flex-col w-11/12 gap-4">
            <Avatar GetAvatarUrl={setAvatarUrl} Token={Token} />
            <form className=" w-full flex flex-col gap-6" id="application">
                <div className="bar items-center">
                    <div className="title">社团名称</div>
                    <input name="name" maxLength={25} className="w-3/4 border border-gray-400  px-2 py-1 text-gray-700" type="text" autoComplete="invaild"/>
                </div>
                <div className="bar">
                    <div className="title">简介</div>
                    <div className="w-full">
                        <MdEditor
                            className="h-44 w-full"
                            editorId="mainEditor"
                            modelValue={text}
                            onChange={setText}
                            maxLength={1000}
                        />
                    </div>
                </div>
                <div className="bar">
                    <div className="title">过往作品</div>
                    <div className="w-full gap-1">
                        <div>其他平台账户/作品链接</div>
                        <input name="pastworks" maxLength={250} className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="text" autoComplete="invaild" />
                    </div>
                </div>
                <div className="bar items-center">
                    <div className="title">类型</div>
                    <input id="video" name="type" value="video" type="checkbox" />
                    <label for="video">视频</label>
                    <input id="music" name="type" value="music" type="checkbox" />
                    <label for="music">音乐</label>
                    <input id="image" name="type" value="image" type="checkbox" />
                    <label for="image">绘画/cos/实物</label>
                </div>
            </form>
            <div className="flex items-start justify-end w-full h-32">
                <div className="w-32 flex items-center justify-items-center">
                    <button className="text_b" onClick={postCircleApplication}>提交</button>
                </div>
            </div>
        </main>
    )
}

function Avatar({ GetAvatarUrl, Token }) {
    const [isEdit, setIsEdit] = useState(false)
    const [originalImg, setOriginalImg] = useState('')
    const [avatarImgBlob, setAvatarImgBlob] = useState()
    const [avatarImgBase64, setAvatarImgBase64] = useState()
    const [uploadStatus, setUploadStatus] = useState('')
    const cropperRef = useRef()
    const onDrop = useCallback(acceptFiles => {
        const reader = new FileReader()
        reader.onload = function (e) {
            let base64 = e.target.result
            setIsEdit(true)
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
        setIsEdit(true)
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
        var coverfile = new File([avatarImgBlob], "circle_avatar.png", { type: "image/png" })
        formData.append("file", coverfile)
        formData.append("token", Token)
        const res = await UploadAvatarFunc(formData)
        if (typeof res != "number") {
            if (res.status == true) {
                GetAvatarUrl(res.data.links.url)
                setUploadStatus("上传成功")
            } else {
                setUploadStatus("上传失败")
            }
        } else {
            setUploadStatus("上传失败")
        }
    }
    return (
        <main className=" flex flex-col gap-4 w-full">
            <div className="bar w-2/3">
                <div className="title">头像</div>
                <div className="w-full flex items-center gap-2">
                    <img src={avatarImgBase64} className=" h-20 w-20 rounded-full" style={{ display: (avatarImgBase64 ? "block" : "none") }} />
                    <button className="text_b"  {...getRootProps()}>
                        导入头像
                        <input id='file' accept="image/*" type="file" onChange={imgGet} style={{ display: "none" }} {...getInputProps()} />
                    </button>
                </div>
            </div>
            <div className=" flex-col w-full items-start gap-2" style={{ display: (isEdit ? "flex" : "none") }}>
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
                <div className="flex items-center gap-2">
                    <button className="text_b" onClick={changeAvatar}>上传</button>
                    <div>{uploadStatus}</div>
                </div>
            </div>
        </main>
    )
}