'use client'
import { useRouter } from "next/navigation"

export function JumpToIndex(){
    const router = useRouter()
    router.replace("/")
    return <a href="/">点我跳转到主页</a>
}