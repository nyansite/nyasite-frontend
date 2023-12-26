'use client'
import React, { useEffect, useRef, useState } from "react"
import { render } from "react-dom"
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline"
//Uppy
import Uppy from '@uppy/core'
import Tus from "@uppy/tus"
import { Dashboard } from "@uppy/react"
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/drag-drop/dist/style.min.css'
//cropper
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
//react-tag-input
import { WithContext as ReactTags } from 'react-tag-input';
//self
import { UploadCoverFunc } from "./action.js"
import "./post.css"

//UploadVideo

function UploadVideo({ GetVideoUrl }) {
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

//uploadCover

function UploadCoverContnet({ PICUItoken, GetCoverUrl, Display }) {
    const [originalImg, setOriginalImg] = useState()
    const [coverImgBlob, setCoverImgBlob] = useState()
    const [uploadStatus, setUploadStatus] = useState('')
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
        var coverfile = new File([coverImgBlob], "cover.png", { type: "image/png" })
        console.log(typeof coverfile)
        formData.append("file", coverfile)
        formData.append("token", PICUItoken)
        const result = await UploadCoverFunc(formData)
        if (typeof result != "number") {
            if (result.status == true) {
                GetCoverUrl(result.data.links.url)
                setUploadStatus("上传成功")
            } else {
                setUploadStatus("上传失败")
            }
        } else {
            setUploadStatus("上传失败")
        }

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
        <>
            <button className="text_b" onClick={getFilds} style={{ display: Display ? "block" : "none" }}>
                选择图片
                <input id='file' accept="image/*" type="file" onChange={imgGet} style={{ display: "none" }} />
            </button>
            <div className="w-full" style={{ display: Display ? "block" : "none" }}>
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
                    aspectRatio={16 / 9}
                />
            </div>
            <div className=" flex items-center gap-2" style={{ display: Display ? "block" : "none" }}>
                <button className="text_b" onClick={uploadCover} style={{ display: originalImg ? "block" : "none" }}>上传</button>
                <div>{uploadStatus}</div>
            </div>
        </>
    )
}

function UploadCover({ PICUItoken, GetCoverUrl }) {
    const [uploadCoverShow, setUploadCoverShow] = useState(true)
    function ChangeUploadCoverShowStatus() {
        if (uploadCoverShow) {
            setUploadCoverShow(false)
        } else {
            setUploadCoverShow(true)
        }
    }
    return (
        <div className="flex flex-col w-full items-center gap-2">
            <div className="text-xl flex gap-2 items-center">
                <div>封面上传</div>
                <button className="img_b hover:w-14" onClick={ChangeUploadCoverShowStatus}>
                    {uploadCoverShow ?
                        <ArrowsPointingInIcon class="h-12 w-12 text-black" /> :
                        <ArrowsPointingOutIcon class="h-12 w-12 text-black" />
                    }
                </button>
            </div>
            <UploadCoverContnet PICUItoken={PICUItoken} GetCoverUrl={GetCoverUrl} Display={uploadCoverShow} />
        </div>
    )
}


//body

export function Post_c({ PICUItoken, TagList }) {
    //select tags
    const [tags, setTags] = useState([])
    const suggestions = TagList.map((tag) => {
        return {
            id: tag,
            text: tag,
        }
    })
    console.log(suggestions)
    const delimiters = [180, 20]
    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };
    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };
    //
    const [coverUrl, setCoverUrl] = useState('')

    return (
        <main className="flex flex-col w-full items-center">
            <div className="flex flex-col w-7/12 items-center gap-6">
                        <UploadVideo />
                        <UploadCover PICUItoken={PICUItoken} GetCoverUrl={setCoverUrl} />
                <form className="flex flex-col w-full gap-6">
                    <div className="bar">
                        <label className="title">标题</label>
                        <div className="w-full"><input id="title" className="w-full border border-gray-400  px-2 py-1 text-gray-700" type="text" autoComplete="off" /></div>
                    </div>
                    <div className="bar items-start">
                        <label className="title">简介</label>
                        <div className="w-full"><textarea id="description" rows={4} className="w-full border border-gray-400  px-2 py-1 text-gray-700" autoComplete="off" /></div>
                    </div>
                    <div className="bar items-start">
                        <label className="title">标签</label>
                        <div className="w-full">
                            <ReactTags
                                tags={tags}
                                suggestions={suggestions}
                                delimiters={delimiters}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                handleTagClick={handleTagClick}
                                inputFieldPosition="bottom"
                                minQueryLength={1}
                            />
                        </div>
                    </div>
                </form>
                <div className="flex items-start justify-end w-full h-32">
                    <div className="w-32 flex items-center justify-items-center">
                        <button className="text_b">发布</button>
                    </div>
                    
                </div>
            </div>
        </main>
    )
}