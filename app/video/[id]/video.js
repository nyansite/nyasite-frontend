"use client"
import { useState } from "react";
import { useRef,useEffect } from "react";
import { NPlayer } from "./nplayer.ts";
import { Plugin } from "@nplayer/danmaku";
import Hls from "hls.js";

export  function VideoPlayer({VideoUrl,DanmakuOptions,Vid,SendDamaku}){
    const player = useRef();
    const hls = useRef(new Hls)
    useEffect(()=>{
        hls.current.attachMedia(player.current.video)
        hls.current.on(Hls.Events.MEDIA_ATTACHED,function(){
            hls.current.loadSource(VideoUrl)
        })
        player.current.on('DanmakuSend', async function(opts){
            var formData = new FormData()
            formData.append("vid",Vid)
            formData.append("text",opts.text)
            formData.append("color",opts.color)
            formData.append("time",opts.time)
            formData.append("type",opts.type)
            const resStauts = await SendDamaku(formData)
            switch(resStauts){
                case 200:
                    break
                case 401:
                    alert("未登录无法发送弹幕")
                    break
                default:
                    alert("发送失败")
            }
        })
    },[])
    return(
        <div className=" w-10/12">
            <NPlayer
                ref={player}
                className=" w-full"
                options={{
                    plugins: [new Plugin(DanmakuOptions)],
                }}
            />
        </div>
    )
}

export function Author({Author,Avatar,Descrption}){
    return(
        <div className=" flex justify-start items-center h-full">

        </div>
    )
}