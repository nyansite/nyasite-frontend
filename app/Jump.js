'use client'
import { useRouter } from "next/navigation"

export function JumpToIndex(){
    const router = useRouter()
    router.replace("/")
    return <a href="/">点我跳转到主页</a>
}

export function JumpToLogin(){
    const router = useRouter()
    router.replace("/login")
    return <a href="/login">点我跳转到登录页</a>
}