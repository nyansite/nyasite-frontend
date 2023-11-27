"use client";
import { useState } from "react";
import { MdEditor } from "md-editor-rt";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import "md-editor-rt/lib/style.css";
import "./unitforum.css";

export function PostCommentFourmPannel() {
	//跟帖的输入面板
	const [text, setText] = useState("");
	return (
		<div className="post-pannel">
			<MdEditor modelValue={text} onChange={setText} style={{ height: "30vh" }} />
			<button className="duration-300 bg-white rounded-xl border w-16 hover:bg-[#bfbfbf]">
				发帖
			</button>
		</div>
	);
}

export function JumpToForumIndex() {
	const router = useRouter();
	router.replace("/forum");
	return <a href="/forum">没有对应的帖子或页码</a>;
}
export function JumpToCommentForum({ cid }) {
	const router = useRouter();
	router.replace("/forum/" + cid + "/1");
	return <></>;
}
export function Unitforum_c({ content, changeEmoji }) {
	const [showData, setShowData] = useState(content.Body); //用于在浏览器渲染的列表

	var showList = showData.map((i) => (
		<li className="unit" key={i.Id} id={i.Id}>
			<a className="author-bar">
				<img src={content.UserShow.find((user) => user.Id == i.Author).Avatar} />
				<div>{content.UserShow.find((user) => user.Id == i.Author).Name}</div>
			</a>
			<ReactMarkdown className="flex flex-auto items-center justify-center bg-white mx-4 rounded-xl duration-300">
				{i.Text}
			</ReactMarkdown>
			<div></div>
			<EmojiBar fmct={i} changeEmoji={changeEmoji} />
		</li>
	)); //用于在浏览器渲染的列表
	//fmct forumcomment
	return (
		<>
			<div className="title bg-white mx-4 rounded-xl duration-300">
				{content.Origin.Title}
			</div>
			<ul className="unitforum-show">{showList}</ul>
		</>
	);
}
//用于显示表情和回复按钮的栏
function EmojiBar({ fmct, changeEmoji }) {
	const [choose, setChoose] = useState(fmct.Choose);
	var like = fmct.Like;
	var dislike = fmct.Dislike;
	var smile = fmct.Smile;
	var celebration = fmct.Celebration;
	var confused = fmct.Confused;
	var heart = fmct.Heart;
	var rocket = fmct.Rocket;
	var eyes = fmct.Eyes;
	//删掉用户已选择的，在渲染时加回来
	switch (fmct.Choose) {
		case 1:
			like--;
			break;
		case 2:
			dislike--;
			break;
		case 3:
			smile--;
			break;
		case 4:
			celebration--;
			break;
		case 5:
			confused--;
			break;
		case 6:
			heart--;
			break;
		case 7:
			rocket--;
			break;
		case 8:
			eyes--;
			break;
	}
	const handleSubmit = (event) => {
		//避免表单提交后刷新页面
		event.preventDefault();
	};
	async function handleClickChangeEmoji(cid, emoji) {
		if (emoji == choose) {
			return;
		}
		const code = await changeEmoji(cid, emoji);
		if (code == 200) {
			setChoose(emoji);
		} else {
			alert("发送表情失败");
			return;
		}
	}
	//如果被选择就显示阴影 ((choose == 1) ? 'bg-gray-300' : 'bg-white  hover:bg-[#bfbfbf]')}>{"👍" + ((choose == 1)? (like+1):like)
	//补回用户选择的表情 ((choose == 1)? (like+1):like)
	return (
		<form className="emoji-bar" onSubmit={handleSubmit}>
			<button
				onClick={() => handleClickChangeEmoji(fmct.Id, 1)}
				className={
					"unit-emoji " + (choose == 1 ? "bg-gray-300" : "bg-white  hover:bg-[#bfbfbf]")
				}
			>
				{"👍" + (choose == 1 ? like + 1 : like)}
			</button>
			<button
				onClick={() => handleClickChangeEmoji(fmct.Id, 2)}
				className={
					"unit-emoji " + (choose == 2 ? "bg-gray-300" : "bg-white  hover:bg-[#bfbfbf]")
				}
			>
				{"👎" + (choose == 2 ? dislike + 1 : dislike)}
			</button>
			<button
				onClick={() => handleClickChangeEmoji(fmct.Id, 3)}
				className={
					"unit-emoji " + (choose == 3 ? "bg-gray-300" : "bg-white  hover:bg-[#bfbfbf]")
				}
			>
				{"😄" + (choose == 3 ? smile + 1 : smile)}
			</button>
			<button
				onClick={() => handleClickChangeEmoji(fmct.Id, 4)}
				className={
					"unit-emoji " + (choose == 4 ? "bg-gray-300" : "bg-white  hover:bg-[#bfbfbf]")
				}
			>
				{"🎉" + (choose == 4 ? celebration + 1 : celebration)}
			</button>
			<button
				onClick={() => handleClickChangeEmoji(fmct.Id, 5)}
				className={
					"unit-emoji " + (choose == 5 ? "bg-gray-300" : "bg-white  hover:bg-[#bfbfbf]")
				}
			>
				{"😕" + (choose == 5 ? confused + 1 : confused)}
			</button>
			<button
				onClick={() => handleClickChangeEmoji(fmct.Id, 6)}
				className={
					"unit-emoji " + (choose == 6 ? "bg-gray-300" : "bg-white  hover:bg-[#bfbfbf]")
				}
			>
				{"❤️" + (choose == 6 ? heart + 1 : heart)}
			</button>
			<button
				onClick={() => handleClickChangeEmoji(fmct.Id, 7)}
				className={
					"unit-emoji " + (choose == 7 ? "bg-gray-300" : "bg-white  hover:bg-[#bfbfbf]")
				}
			>
				{"🚀" + (choose == 7 ? rocket + 1 : rocket)}
			</button>
			<button
				onClick={() => handleClickChangeEmoji(fmct.Id, 8)}
				className={
					"unit-emoji " + (choose == 8 ? "bg-gray-300" : "bg-white  hover:bg-[#bfbfbf]")
				}
			>
				{"👀" + (choose == 8 ? eyes + 1 : eyes)}
			</button>
			<button className="unit-emoji bg-white hover:bg-[#bfbfbf]">回复</button>
		</form>
	);
}
