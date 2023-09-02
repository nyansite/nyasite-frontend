"use client";
import { useEffect } from 'react';
export default function Login_c({ username, passwd }) {
    useEffect(() => {
        const res = fetch("/api/login", {
            method: "POST",
        }).then(function (response) {
            console.log(response.ok)
        })

    }, [username, passwd]);
}