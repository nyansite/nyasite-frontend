'use client'
import React, { useEffect, useRef, useState } from "react"
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline"
import Uppy from '@uppy/core'
import Tus from "@uppy/tus"
import { Dashboard } from "@uppy/react"
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/drag-drop/dist/style.min.css'
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import { UploadCoverFunc } from "./action.js"

function UploadVideo({GetVideoUrl}) {
    const [uppyShow, setUppyShow] = useState(true)
    const [uppy] = useState(() => new Uppy({
        debug: true, autoProceed: true,
        restrictions: {
            allowedFileTypes: [
                "video/*",
            ],
            maxNumberOfFiles: 1,
        }
    }))
    function ChangeUppyShowStatus() {
        if (uppyShow) {
            setUppyShow(false)
        } else {
            setUppyShow(true)
        }
    }
    return (
        <div className="flex flex-col w-full items-center gap-2">
            <div className="text-xl flex gap-2 items-center" >
                <div>视频上传</div>
                <button className="img_b hover:w-14" onClick={ChangeUppyShowStatus}>
                    {uppyShow ?
                        <ArrowsPointingInIcon class="h-12 w-12 text-black" /> :
                        <ArrowsPointingOutIcon class="h-12 w-12 text-black" />
                    }
                </button>
            </div>
            <Dashboard uppy={uppy} id={"dashboard"} style={{ display: uppyShow ? "block" : "none" }}
                height={350} singleFileFullScreen={true} />
        </div>
    )
}

function UploadCover({PICUItoken,GetCoverUrl}) {
    const [originalImg, setOriginalImg] = useState()
    const [coverImgBlob, setCoverImgBlob] = useState()
    const cropperRef = useRef()
    function getFilds() {
        const filedom = document.getElementById('file')
        filedom.click()
    }
    function imgGet(e) {
        const filedata = e.target.files[0]
        let reader = new FileReader()
        reader.onload = function (e) {
            let base64 = e.target.result
            setOriginalImg(base64)
        }
        reader.readAsDataURL(filedata)
    }
    async function uploadCover() {
        console.log(PICUItoken)
        var formData = new FormData()
        var coverfile = new File([coverImgBlob],"cover.png",{type:"image/png"})
        console.log(typeof coverfile)       
        formData.append("file",coverfile)
        formData.append("token", PICUItoken)
        const json = await UploadCoverFunc(formData)
        GetCoverUrl(json.data.links.url)
    }
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        const canvas = cropper.getCroppedCanvas()
        let resizedCanvas = document.createElement("canvas");
        let resizedContext = resizedCanvas.getContext("2d");
        resizedCanvas.width = 800;
        resizedCanvas.height = 450;
        resizedContext.drawImage(canvas, 0, 0, 800, 450);
        resizedContext.save()
        resizedCanvas.toBlob((blob) => {
            setCoverImgBlob(blob)
        }, "image/png", 0.75)
    }
    return (
        <div className="flex flex-col w-9/12 items-center gap-2">
            <div className="text-xl">封面上传</div>
            <button className="text_b" onClick={getFilds}>
                选择图片
                <input id='file' accept="image/*" type="file" onChange={imgGet} style={{ display: "none" }} />
            </button>
            <div className="w-full">
                <Cropper
                    src={originalImg}
                    style={{ height: "100%", width: "100%" }}
                    // Cropper.js options
                    crop={onCrop}
                    ref={cropperRef}
                    marginWidth={800}
                    marginHeight={450}
                    minCropBoxWidth={400}
                    minCropBoxHeight={225}
                    viewMode={2}
                    cropBoxResizable={false}
                    aspectRatio={16/9}
                />
            </div>
            {coverImgBlob ?
                <button className="text_b" onClick={uploadCover}>上传</button>
                : null}
        </div>
    )
}

export function Post_c({ PICUItoken}) {
    const [coverUrl,setCoverUrl] = useState('')
    return (
        <main className="flex flex-col w-full items-center">
            <div className="flex flex-col w-10/12 items-center">
                <UploadVideo/>
                <UploadCover PICUItoken={PICUItoken} GetCoverUrl={setCoverUrl} />
                <form>

                </form>
            </div>
        </main>
    )
}