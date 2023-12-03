"use client";

import { useRequest } from "alova";

export function PostVideo({Upload}) {
	
	function uploadVideos(files){
		const { uploading,data,onSuccess,onError } = useRequest(Upload(files))
		
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
