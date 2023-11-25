import { cookies } from 'next/headers'
import Login_c from "./login"
import { redirect } from 'next/navigation';


export default async function login() {
    const cookieStore = cookies()
    const is_login = cookieStore.get('is_login')
    if (!is_login){
        console.log(is_login)
    }else if (is_login.value == "true") {
        redirect("/")
    }
        return <Login_c />
    
}