"use client";
import { useState } from "react";
import "./search-input.css";

export default function SearchInput({ suggestions }) {
	//补全部分
	const suggestionsUse = suggestions;
	const [inputString, setInputString] = useState("");
	const [suggestionsShow, setSuggestionsShow] = useState([]); //用于渲染的列表
	let suggestionsShowList = [];
	//标签部分
	const [tags, setTags] = useState([]);
	function addTagbySug(event) {
		let index = event.target.dataset.index;
		if (!tags.includes(index)) {
			setTags([...tags, index]);
		}
		setInputString("");
		setSuggestionsShow([]);
	}
	function DeleteTag(event) {
		let index = event.target.dataset.index;
		setTags(
			tags.filter(function (item) {
				return item != index;
			}),
		);
	}
	function handleBackSpace(e) {
		if (e.keyCode === 8 && inputString == "") {
			setTags(tags.slice(0, -1));
		}
	}
	function handleUpdate(e) {
		let i = 0;
		let count = 0;
		let show = "";
		let inputValueList = e.target.value.split(" ");
		while (count <= 5 && i <= suggestionsUse.length - 1) {
			// 空格分隔的最后部分默认为新输入部分
			if (suggestionsUse[i].includes(inputValueList.slice(-1)) && inputValueList.slice(-1) != "") {
				show = suggestionsUse[i];
				suggestionsShowList.push(
					<li key={show}>
						<button onClick={addTagbySug} data-index={show}>
							{suggestionsUse[i]}
						</button>
					</li>,
				);
				count++;
			}
			i++;
		}
		setSuggestionsShow(suggestionsShowList);
		setInputString(e.target.value);
	}
	function search() {
		console.log(tags);
	}
	let tagsShow = tags.map((tag) => (
		<button onClick={DeleteTag} data-index={tag}>
			{tag}
		</button>
	));
	return (
		<div className="all-bar bg-slate-200">
			<div className="tag-input">
				<div className="tags">{tagsShow}</div>
				<div>
					<input
						value={inputString}
						onChange={(e) => handleUpdate(e)}
						onKeyUpCapture={(e) => handleBackSpace(e)}
					/>
					<ul className="suggestion">{suggestionsShow}</ul>
				</div>
			</div>
			<div className="search-button-bar">
				<button className="search-button" onClick={search}>
					<div className="search-button-content">
						<svg
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							></path>
						</svg>
					</div>
				</button>
			</div>
		</div>
	);
}
