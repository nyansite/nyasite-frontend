import { cookies } from 'next/headers'
import Login_c from "./login"
import { redirect } from 'next/navigation';


export default async function login() {
    const cookieStore = cookies()
    const is_login = cookieStore.get('is_login').value
    if (is_login == "true") {
        redirect("/")
    } else {
        return <Login_c />
    }
}