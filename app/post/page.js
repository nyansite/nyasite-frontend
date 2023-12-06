import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PostVideo } from "./post.js";
export default async function Post() {
	//https://developers.cloudflare.com/stream/uploading-videos/direct-creator-uploads/#step-2-use-this-api-endpoint-with-your-tus-client
	//请使用tus客户端如uppy或tus-js-client
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
