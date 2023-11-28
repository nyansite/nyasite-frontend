"use client";
import { useState, useRef } from "react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import "./post.css";

export function PostVideo() {
	const [step, setStep] = useState(0);

	if (step == 0) {
		return (
			<button className="capture">
				<input id="file" accept="video/*" type="file" style={{ display: "none" }} />
			</button>
		);
	}
}
