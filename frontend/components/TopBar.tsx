"use client";

import { usePathname, useRouter } from "next/navigation";
import { links } from "./SideNav";
import Button from "./Button";
import Icon from "./Icon";
import { useState } from "react";
import { useCookieStorage } from "@/utils/storage";
import { useNotification } from "@/context/notification-context";
import { getRequest } from "@/utils/api";

export default function TopBar() {
    const navigate = useRouter().push;

    const { showErrorMessage, showSuccessMessage } = useNotification();

    const path = usePathname();

    const [showDropdown, setShowDropdown] = useState(false);

    const { get, remove } = useCookieStorage();

    const user = get("task-effect:user");

    const [loading, setLoading] = useState(false);

    async function logout() {
        setLoading(true);
        try {
            const {
                data: { message },
            } = await getRequest("/auth/logout");
            navigate("/auth/login");
            remove("task-effect:token");
            remove("task-effect:user");
        } catch (err: any) {
            console.log(err);
            showErrorMessage(
                err?.response?.data?.message ||
                err?.request?.message ||
                err?.message ||
                err ||
                "Unknown error occured"
            );
        }
        setLoading(false);
    }
    return (
        <header className="w-full py-4 bg-white dark:bg-gray-800 px-[16px] flex justify-between items-center border-b dark:border-b-gray-600">
            <h4 className="text-blue-700 dark:text-white">
                {links.find((i) => i.url == path)?.title}
            </h4>
            <button
                onClick={(e) => (e.stopPropagation(), setShowDropdown(!showDropdown))}
                className="profile-ctn text-left flex gap-2 relative"
            >
                <div className="avatar h-[38px] w-[38px] uppercase aspect-square rounded-full grid place-items-center bg-blue-100 text-blue-700 font-black text-xl">
                    {user?.first_name?.substring(0, 1)}
                </div>
                <div className="name-ctn flex flex-col justify-center">
                    <h4 className="text-sm font-semibold">
                        {user?.first_name} {user?.last_name}
                    </h4>
                    <p className="text-[10px]">{user?.email}</p>
                </div>
                {showDropdown && (
                    <div className="absolute top-[calc(100%+8px)] w-full shadow bg-white dark:bg-gray-800">
                        <Button
                            className="bg-transparent text-black dark:text-white justify-start border-b dark:border-b-gray-700 rounded-none text-xs hover:bg-gray-50 dark:hover:bg-gray-700"
                            loading={loading}
                            onClick={logout}
                        >
                            <Icon icon="mdi:logout" className="text-lg text-inherit" />
                            <span>Logout</span>
                        </Button>
                    </div>
                )}
            </button>
        </header>
    );
}
