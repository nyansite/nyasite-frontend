import { useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from "react-cropper";

export default function AvatarInput() {
    const editor = useRef(null)
    const [originalImg, setOriginalImg] = useState('')
    const [AvatarImgBase64, setAvatarImgBase64] = useState('')
    function getFilds() {
        const filedom = document.getElementById('file');
        filedom.click()
    }
    function imgGet(e) {
        const fileData = e.target.files[0]
        let reader = new FileReader();
        reader.onload = function (e) {
            let base64 = e.target.result;
            setOriginalImg(base64)
        }
        reader.readAsDataURL(fileData);
    }
    const cropperRef = useRef(null);
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        console.log(cropper.getCroppedCanvas().toDataURL());
    };
    return (
        <div className='avatar-edit'>
            <div className='select-edit'>
                <button onClick={getFilds}>
                    上传文件
                    <input id='file' accept='image' type='file' onChange={imgGet} />
                </button>
                <div className='avatarEditor'>
                    <Cropper
                        src={originalImg}
                        style={{ height: "100%", width: "100%" }}
                        // Cropper.js options
                        initialAspectRatio={16 / 9}
                        guides={false}
                        crop={onCrop}
                        ref={cropperRef}
                    />
                </div>
            </div>
            <img src={AvatarImgBase64} />
        </div>
    )
}