import { cookies } from "next/headers";
import Login_c from "./login";
import { redirect } from "next/navigation";

export default async function Page() {
	const cookieStore = cookies();
	const is_login = cookieStore.get("is_login");
	if (!is_login) {
	} else if (is_login.value == "true") {
		//不能放在同一个语句因为undefined没有value
		redirect("/");
	}
	return <Login_c />;
}
