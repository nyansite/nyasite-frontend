"use client"
import { useLayoutEffect, useState } from "react";
import { useRef, useEffect } from "react";
import { NPlayer } from "./nplayer.ts";
import { Popover } from "nplayer";
import { Plugin } from "@nplayer/danmaku";
import Hls from 'hls.js'
import "./video.css"

export function VideoPlayer({ VideoUrl, DanmakuOptions, Vid, SendDamaku }) {
    const player = useRef();
    const hls = useRef(new Hls)
    const Quantity = useRef(
        {
            el: document.createElement("div"),
            init() {
                this.btn = document.createElement("div")
                this.btn.textContent = "画质";
                this.el.appendChild(this.btn)
                this.popover = new Popover(this.el)
                this.btn.addEventListener("click", () => this.popover.show())
                // 点击按钮的时候展示 popover
                this.el.style.display = "none"
                // 默认隐藏
                this.el.classList.add("quantity")
            }
        }
    )
    useEffect(() => {
        player.current.on('DanmakuSend', async function (opts) {
            var formData = new FormData()
            formData.append("vid", Vid)
            formData.append("text", opts.text)
            formData.append("color", opts.color)
            formData.append("time", opts.time)
            formData.append("type", opts.type)
            const resStauts = await SendDamaku(formData)
            switch (resStauts) {
                case 200:
                    break
                case 401:
                    alert("无法验证登录状态")
                    break
                default:
                    alert("发送失败")
            }
        })
        hls.current.attachMedia(player.current.video)
        hls.current.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.current.on(Hls.Events.MANIFEST_PARSED, function () {
                //https://nplayer.js.org/docs/examples/quantity-switch
                //// 4. 给清晰度排序，清晰度越高的排在最前面
                hls.current.levels.sort((a, b) => b.height - a.height)
                const frag = document.createDocumentFragment()
                // 5. 给与清晰度对应的元素添加，点击切换清晰度功能
                const listener = (i) => (init) => {
                    const last = Quantity.current.itemElements[Quantity.current.itemElements.length - 1]
                    const prev = Quantity.current.itemElements[Quantity.current.value] || last
                    const el = Quantity.current.itemElements[i] || last
                    prev.classList.remove("quantity_item-active")
                    el.classList.add("quantity_item-active")
                    Quantity.current.btn.textContent = el.textContent
                    if (init !== true && !player.current.paused)
                        setTimeout(() => player.current.play())
                    // 因为 HLS 切换清晰度会使正在播放的视频暂停，我们这里让它再自动恢复播放
                    Quantity.current.value = hls.current.currentLevel = hls.current.loadLevel = i
                    Quantity.current.popover.hide()
                }
                // 6. 添加清晰度对应元素
                Quantity.current.itemElements = hls.current.levels.map((l, i) => {
                    const el = document.createElement("div")
                    el.textContent = l.name + "P"
                    if (l.height === 1080) el.textContent = "1080p 超清"
                    if (l.height === 720) el.textContent = "720p 高清"
                    if (l.height === 480) el.textContent = "480p 清晰"
                    if (l.height === 360) el.textContent = "360p 普通"
                    if (l.height === 240) el.textContent = "240p 快速"
                    el.classList.add("quantity_item")
                    el.addEventListener("click", listener(i))
                    frag.appendChild(el)
                    return el
                })
                const el = document.createElement("div")
                el.textContent = "自动"
                el.addEventListener("click", listener(-1))
                el.classList.add("quantity_item")
                frag.appendChild(el)
                Quantity.current.itemElements.push(el)
                // 这里再添加一个 `自动` 选项，HLS 默认是根据网速自动切换清晰度

                Quantity.current.popover.panelEl.appendChild(frag)
                Quantity.current.el.style.display = "block"

                listener(1)(true)
                // 初始化当前清晰度
            })
            hls.current.loadSource(VideoUrl)
            console.log(hls.current.bandwidthEstimate)
        })
    }, [])
    return (
        <div className=" w-4/5">
            <NPlayer
                ref={player}
                className=" w-full"
                options={{
                    controls: [[
                        "play",
                        "volume",
                        "time",
                        "spacer",
                        Quantity.current,
                        "airplay",
                        "settings",
                        "web-fullscreen",
                        "fullscreen",
                        "danmaku-settings"
                    ], ['progress']],
                    plugins: [new Plugin(DanmakuOptions)],
                }}
            />
        </div>
    )
}

export function Descrption({ Desc }) {
    const [doesHideOverflow, setDoesHideOverflow] = useState(false)
    const descrptionDiv = useRef()
    const [isOverflow, setIsOverflow] = useState(true)
    useLayoutEffect(() => {
        console.log(descrptionDiv.current.clientHeight - descrptionDiv.current.scrollHeight)
        setIsOverflow(descrptionDiv.current.clientHeight < descrptionDiv.current.scrollHeight)
    }, [])
    return (
        <div className=" w-3/4 h-full flex flex-col items-end gap-1">
            <div className="w-full ">
                <div className={doesHideOverflow ? null : "line-clamp-3"} ref={descrptionDiv}>
                    {Desc}
                </div>
            </div>
            {isOverflow ? <button onClick={() => setDoesHideOverflow(!doesHideOverflow)} className=" text_b w-16 hover:w-16">
                {doesHideOverflow ? "收起" : "展开"}
            </button> : null}
        </div>
    )

}

export function Author({ Author, Avatar, Descrption }) {
    return (
        <div className=" flex justify-start items-center h-full">

        </div>
    )
}