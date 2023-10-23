"use client";

import React from 'react'
import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

function AvatarInput() {
  const editor = useRef(null)
  const [originalImgBase64,setOriginalImgBase64] = useState('')
  const [AvatarImgBase64,setAvatarImgBase64] = useState('')
  function imgGet(e){
    const fileData = e.target.files[0]
    let reader = new FileReader();
    reader.onload = function (e) {
      let base64 = e.target.result;
      setOriginalImgBase64(base64)
    }
    reader.readAsDataURL(fileData);
  }
  return (
    <div>
      <input type='file' onChange={imgGet}/>
      <AvatarEditor
        ref={editor}
        image={originalImgBase64}
        width={250}
        height={250}
        border={50}
        scale={1.2}
      />
      <button onClick={() => {
        if (editor) {
          // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
          // drawn on another canvas, or added to the DOM.
          setAvatarImgBase64(editor.current.getImage().toDataURL('image/png', 1))
          // If you want the image resized to the canvas size (also a HTMLCanvasElement)
        }
      }}>Save</button>
      <img src={AvatarImgBase64}/>
    </div>
  )
}

export default function Reg_c() {
  const handleSubmit = event => {//避免表单提交后刷新页面
    event.preventDefault();
  };
  async function handleClick() {
    let response = await fetch("/api/register", {
      method: "POST",
      body: new FormData(freg),
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
      <form id="freg" onSubmit={handleSubmit}>
        <label>用户名:<input name="username" id="username" placeholder="用户名" autoComplete="username" required autoFocus /></label>
        <label>邮箱:<input name="email" id="email" placeholder="邮箱" autoComplete="email" required /></label>
        <label>密码:<input name="passwd" id="passwd" placeholder="密码" type="password" autoComplete="current-password" minLength="6" required /></label>
        <AvatarInput />
        <button onClick={handleClick}>登录</button>
      </form>
    </main>
  )
}