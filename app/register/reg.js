"use client";

import React from 'react'
import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import "./reg.css"

function AvatarInput() {
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
  return (
    <div className='avatar-edit'>
      <div className='select-edit'>
        <button onClick={getFilds}>
          上传文件
          <input id='file' accept='image' type='file' onChange={imgGet} />
        </button>
        <div className='avatarEditor'>
          <AvatarEditor
            ref={editor}
            image={originalImg}
            border={10}
            style={{position:"",width:"100%",height:"100%"}}
          />
        </div>
      </div>
      <button onClick={() => {
        if (editor) {
          const canvas = editor.current.getImage()
          let resizedCanvas = document.createElement("canvas");
          let resizedContext = resizedCanvas.getContext("2d");
          resizedCanvas.height = 200;
          resizedCanvas.width = 200;
          resizedContext.drawImage(canvas, 0, 0, 200, 200);
          resizedContext.save()
          setAvatarImgBase64(resizedCanvas.toDataURL("image/png", 0.3))
        }
      }}>Save</button>
      <img src={AvatarImgBase64} />
    </div>
  )
}

export default function Reg_c() {
  const handleSubmit = event => {//避免表单提交后刷新页面
    event.preventDefault();
  };
  async function handleClick() {
    var formData = new FormData(freg)
    let response = await fetch("/api/register", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    switch (response.status) {
      case 200:
        alert("200注册成功");
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
          <button onClick={handleClick}>登录</button>
        </form>
        <AvatarInput />
      </div>
    </main>
  )
}