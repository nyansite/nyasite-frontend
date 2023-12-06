"use client";

import { useState, } from "react";
import Dropzone from 'react-dropzone'
import { XMarkIcon } from "@heroicons/react/24/outline";


export function PostVideo({ Upload }) {
	const [step, setStep] = useState(0)
	//0.等待拖拽,1.开始上传,2.上传完成,可以提交
	const [videofiles, setVideofiles] = useState([])
	function deleteFile(filename) {
		setVideofiles(
			videofiles.filter(function(item) {
				if(item.name != filename){
					return item
				}
			}),
		)
	}
	let VideoFilesShow = videofiles.map((videoFile) =>
		<li key={videoFile.name}>
			<button  onClick={(e) => deleteFile(videoFile.name)} className=" w-full flex items-center" >
				<div className=" justify-self-start">{videoFile.name}</div>
				<XMarkIcon className="h-4 w-4 text-gray-500 justify-self-end" />
			</button>
		</li>
	)
	if (!(step)) {
		return (
			<main className=" h-screen">
				<div className="relative top-20 flex flex-col items-center w-full gap-2">
					<Dropzone onDrop={acceptedFiles => setVideofiles(acceptedFiles)} >
						{({ getRootProps, getInputProps }) => (
							<section {...getRootProps()} className="w-3/4 h-64 border bg-slate-100 rounded-2xl flex items-center justify-center">
								<div >
									<input {...getInputProps()} />
									<p className="">Drag 'n' drop some files here, or click to select files</p>
								</div>
							</section>
						)}
					</Dropzone>
					<ul className=" w-3/4 bg-white rounded-md flex items-center gap-2 flex-col">
						<div>上传视频列表，点击删除</div>
						{VideoFilesShow}	
					</ul>
				</div>
			</main>
		);
	} else {

	}
}
