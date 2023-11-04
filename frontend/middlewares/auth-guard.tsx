import { useCookieStorage } from "@/utils/storage"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const exluded_routes = ["/auth/login", "/auth/register"]

export default function AuthGuard({ children }: any) {
    const router = useRouter();
    const path = usePathname();
    const { get } = useCookieStorage();
    useEffect(() => {
        if (!get("task-effect:token") && !exluded_routes.includes(path)) {
            router.push("/auth/login")
        }
        console.log("Hello")
    }, [])
    return get("task-effect:token") || exluded_routes.includes(path) ? children : <></>
}