"use client"

import { useEffect, useState } from "react"
import Icon from "./Icon"

export default function Loading() {
    const [display, setDisplay] = useState("grid")
    useEffect(() => {
        console.log("Loaded")
        setDisplay("hidden")
    }, [])
    return <div className={`fixed top-0 left-0 h-screen w-screen bg-white ${display} place-items-center`}>
        <Icon icon="mdi:loading" className="text-6xl animate-spin" />
    </div>
}