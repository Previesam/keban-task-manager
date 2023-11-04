import axios from "axios";
import { useCookieStorage } from "./storage";

const baseURL = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (error) => {
    const res = error?.response;
    if (res?.status == 403) {
      useCookieStorage()?.remove("task-effect:token");
      useCookieStorage()?.remove("task-effect:user");
      const path = location.pathname;
      useCookieStorage().set("task-effect:redirect", path);
      let timer = setTimeout(
        () => location?.replace("/auth/login"),
        2000
      ) as any as number;
      while (timer--) {
        clearTimeout(timer);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export function getRequest(url: string) {
  const { get } = useCookieStorage();
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${get("task-effect:token")}` },
  });
}

export function postRequest(url: string, body: { [key: string]: any }) {
  const { get } = useCookieStorage();
  return axiosInstance.post(url, body, {
    headers: { Authorization: `Bearer ${get("task-effect:token")}` },
  });
}

export function patchRequest(url: string, body: { [key: string]: any }) {
  const { get } = useCookieStorage();
  return axiosInstance.patch(url, body, {
    headers: { Authorization: `Bearer ${get("task-effect:token")}` },
  });
}

export function deleteRequest(url: string) {
  const { get } = useCookieStorage();
  return axiosInstance.delete(url, {
    headers: { Authorization: `Bearer ${get("task-effect:token")}` },
  });
}
