"use client";
import { useState} from "react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import "./post.css";
import { redirect } from "next/navigation";

export function PostVideo({Upload}) {
	
	async function uploadVideos(files){
		const uploadAxiosInstance = Upload(files)
		
	}
	if (step == 0) {
		return (
			<button className=" w-10/12 h-3/5 border rounded-xl">
				<input id="file" accept="video/*" type="file" style={{ display: "none" }} 
					onChange={(e) => uploadVideos(e.target.files)}/>
			</button>
		);
	}
}
