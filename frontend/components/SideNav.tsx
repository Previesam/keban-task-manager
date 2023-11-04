"use client"

import Link from "next/link"
import Button from "./Button"
import Icon from "./Icon"
import { usePathname } from "next/navigation";

export const links = [{ title: "Overview", url: "/overview", icon: <Icon icon="mdi:menu" className='text-lg text-inherit' /> }, { title: "Tasks", url: "/tasks", icon: <Icon icon="grommet-icons:task" className='text-lg text-inherit' /> }]

export default function SideNav() {
    const path = usePathname();

    return <div className="side-nav w-full max-w-[289px] bg-white dark:bg-gray-800 min-h-screen overflow-y-auto px-[12px] py-16 border-r dark:border-r-gray-600">
        <div className="grid gap-2">
            {
                links.map(link => <Link href={link.url} className='w-full h-fit'>
                    <Button className={`py-3 justify-start text-left ${path == link.url ? "bg-blue-700/80" : "bg-transparent text-black"} text-sm dark:text-gray-100`} key={link.url}>
                        {link.icon}
                        <span>
                            {link.title}
                        </span>
                    </Button>
                </Link>)
            }
        </div>
    </div>
}