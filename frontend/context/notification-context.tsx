"use client"

import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export interface Notification {
  message: string;
  type?: "error" | "info" | "success";
  timeout?: number;
  id: string | null;
  show?: boolean;
}

export interface NotificationContext {
  notifications: Notification[];
  notify: (data: Notification) => void;
  showErrorMessage: (message: string | string[], timeout?: number) => void;
  showSuccessMessage: (message: string | string[], timeout?: number) => void;
  showInfoMessage: (message: string | string[], timeout?: number) => void;
  close: (id: string | null) => void;
}

export const NotificationContext = createContext<NotificationContext>({
  notifications: [],
  notify: () => { },
  showErrorMessage: () => { },
  showSuccessMessage: () => { },
  showInfoMessage: () => { },
  close: () => { },
});

export default function NotificationProvider({ children }: any) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  function notify(data: Notification) {
    data.id = uuid();
    data.type = data.type || "info";
    data.timeout = data.timeout || 4000;
    data.show = true;
    setNotifications([...notifications, data]);
  }

  function close(id: string | null) {
    if (!id) return;
    setNotifications((prev) =>
      [...prev].map((item) => {
        if (item.id === id) {
          item.show = false;
        }
        return item;
      })
    );
  }

  function showSuccessMessage(message: string | string[], timeout?: number) {
    if (typeof message === "string") {
      let data: Notification = {
        message,
        type: "success",
        timeout: timeout || 4000,
        id: null,
      };
      notify(data);
    } else {
      let messages = [...notifications];

      for (let item of message) {
        messages.push({
          message: item,
          type: "success",
          timeout: timeout || 4000,
          id: "message-element-" + new Date().toISOString() + Math.random(),
          show: true,
        });
      }

      setNotifications(messages);
    }
  }

  function showErrorMessage(message: string | string[], timeout?: number) {
    console.log("Sending message")
    if (typeof message === "string") {
      let data: Notification = {
        message,
        type: "error",
        timeout: timeout || 4000,
        id: null,
      };
      notify(data);
    } else {
      let messages = [...notifications];

      for (let item of message) {
        messages.push({
          message: item,
          type: "error",
          timeout: timeout || 4000,
          id: "message-element-" + new Date().toISOString() + Math.random(),
          show: true,
        });
      }

      setNotifications(messages);
    }
  }

  function showInfoMessage(message: string | string[], timeout?: number) {
    if (typeof message === "string") {
      let data: Notification = {
        message,
        type: "error",
        timeout: timeout || 4000,
        id: null,
      };
      notify(data);
    } else {
      let messages = [...notifications];

      for (let item of message) {
        messages.push({
          message: item,
          type: "info",
          timeout: timeout || 4000,
          id: "message-element-" + new Date().toISOString() + Math.random(),
          show: true,
        });
      }

      setNotifications(messages);
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notify,
        showSuccessMessage,
        showErrorMessage,
        showInfoMessage,
        close,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
