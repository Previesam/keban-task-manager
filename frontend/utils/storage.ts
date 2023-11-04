import Cookie from "universal-cookie";

const cookieStorage = new Cookie();

export const useCookieStorage = () => ({
  get: (name: string) => {
    return cookieStorage?.get(name);
  },
  set: (name: string, data: any) => {
    return cookieStorage.set(name, data, { path: "/" });
  },
  remove: (name: string) => cookieStorage.remove(name, { path: "/" }),
  clear: () => {
    let cookies = Object.assign({}, cookieStorage.getAll());
    for (let item in cookies) {
      cookieStorage.remove(item, { path: "/" });
    }
  },
});

export const useLocalStorage = () => ({
  get: (name: string) =>
    localStorage?.getItem(name) !== "undefined"
      ? JSON?.parse(localStorage?.getItem(name) || "")
      : null,
  set: (name: string, data: any) =>
    localStorage.setItem(name, JSON.stringify(data)),
  remove: (name: string) => localStorage.removeItem(name),
  clear: () => localStorage.clear(),
});
