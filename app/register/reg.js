"use client";

import React from 'react'
import "./reg.css"
import { useState } from 'react'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useRouter } from 'next/navigation';


function AvatarInput({ getImg }) {
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
  const cropperRef = React.createRef();
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const canvas = cropper.getCroppedCanvas()
    let resizedCanvas = document.createElement("canvas");
    let resizedContext = resizedCanvas.getContext("2d");
    resizedCanvas.height = 160;
    resizedCanvas.width = 160;
    resizedContext.drawImage(canvas, 0, 0, 200, 200);
    resizedContext.save()
    setAvatarImgBase64(resizedCanvas.toDataURL("image/png", 0.5));
    getImg(resizedCanvas.toDataURL("image/png", 0.05)) //应该可以再猛点
  };
  return (
    <div className='avatar-edit'>
      <div className='select-edit'>
        <button onClick={getFilds}>
          上传文件
          <input id='file' accept='image/*' type='file' onChange={imgGet} style={{display:"none"}} />
        </button>
        <div className='avatarEditor'>
          <Cropper
            src={originalImg}
            style={{ height: "100%", width: "100%" }}
            // Cropper.js options
            crop={onCrop}
            ref={cropperRef}
            marginHeight={200}
            marginWidth={200}
            viewMode={2}
            cropBoxResizable={false}
            aspectRatio={1}
          />
        </div>
      </div>
      <img className="cropper-show" src={AvatarImgBase64} />
    </div>
  )
}

export default function Reg_c() {
  const handleSubmit = event => {//避免表单提交后刷新页面
    event.preventDefault();
  };
  const [Avatar, setAvatar] = useState('')
  function getImgMain(base64) {
    setAvatar(base64)
  }
  const router = useRouter()
  async function handleClick() {
    var formData = new FormData(freg)
    formData.append("avatar", Avatar)
    let response = await fetch("/api/register", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    switch (response.status) {
      case 200:
        alert("200注册成功");
        router.replace("/login");
        break;
      case 601:
        alert("601用户名重复");
        break;
      case 602:
        alert("602邮箱重复");
        break;
      default:
        alert("未知错误");
    }
  }

  return (
    <main className="lr">
      <div className='reg-pannel'>
        <form id="freg" onSubmit={handleSubmit}>
          <div className='title'>注册</div>
          <label className='input-bar'><input name="username" id="username" placeholder="用户名" autoComplete="username" required autoFocus /></label>
          <label className='input-bar'><input name="email" id="email" placeholder="邮箱" autoComplete="email" required /></label>
          <label className='input-bar'><input name="passwd" id="passwd" placeholder="密码" type="password" autoComplete="current-password" minLength="6" required /></label>
          <div><button onClick={handleClick}>登录</button></div>
        </form>
        <AvatarInput getImg={getImgMain} />
      </div>
    </main>
  )
}