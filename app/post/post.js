"use client";

export function PostVideo() {
	xhr.open("POST", "/api/upload");
	xhr.onprogress = function (event) {
		if (event.lengthComputable) {
			console.log(`Received ${event.loaded} of ${event.total} bytes`);
		} else {
			console.log(`Received ${event.loaded} bytes`); // 没有 Content-Length
		}
	};
	return (
		<input
			id="file"
			accept="video/*"
			type="file"
			onChange={(e) => uploadVideos(e.target.files)}
		/>
	);
}
