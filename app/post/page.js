import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PostVideo } from "./post.js";
export default async function Post() {
	const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() });
	const xhr = new XMLHttpRequest();
	

	if (res.status == 200) {
		const list = await res.json();
		return (
			<main>
				<div>
					<PostVideo />
				</div>
			</main>
		);
	} else if (res.status == 401) {
		return redirect("/login");
	} else {
		return <p>???????{res.status}</p>;
	}
}
