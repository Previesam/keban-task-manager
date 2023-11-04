"use client"

import { IconProps, Icon as Iconify, loadIcons } from "@iconify/react/dist/iconify.js";

// interface IconProps extends IconifyEle {
//     className?: string
// }

loadIcons(["mdi:menu"])

export default function Icon(props: IconProps) {
    return <Iconify {...props} />
}