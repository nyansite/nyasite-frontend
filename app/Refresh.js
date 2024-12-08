"use client"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
export default function Refresh() {
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        const refresh = async () => {
            const res = await fetch("/api/refresh", {
                credentials: "include"
            })
            switch (res.status) {
                case 401:
                    router.replace("/login")
            }
        }
        if (!(pathname == "/login" || pathname == "/register")) {
            refresh()
        }
    }, [])

    return <main></main>
}