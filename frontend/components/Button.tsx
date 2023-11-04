"use client"

import { twMerge } from "tw-merge";
import Icon from "./Icon";

export default function Button({
    className,
    children,
    disabled = false,
    loading = false,
    onClick = () => false,
    ...rest
}: {
    className?: string;
    children: any;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void
}) {
    return (
        <button
            className={twMerge(`py-[11px] px-[28px] w-full bg-blue-700 disabled:bg-blue-200 flex justify-center items-center gap-x-2 rounded text-white text-sm ` + className)}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            {loading && <Icon icon="mdi:loading" className="text-xl text-inherit animate-spin" />}
            {children}
        </button>
    );
}
