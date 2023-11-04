"use client"

import { Icon } from "@iconify/react";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { NotificationContext } from "../../context/notification-context";
import "./styles.scss";

const Notif = function ({ data }: { data: Notification | any }) {
  const { close } = useContext(NotificationContext);
  const [timer, setTimer] = useState<any>(null);
  const [outAnimation, setOutAnimation] = useState("");

  const effectCount = useRef(0);

  function clearTimer() {
    clearTimeout(timer);
  }

  function startTimer() {
    setTimer(setTimeout(() => closeNoti(data?.id), data.timeout));
  }

  function closeNoti(id: any) {
    setOutAnimation("animate-out");
    setTimeout(() => close(id), 400);
  }

  useEffect(() => {
    if (effectCount.current > 0) return;
    startTimer();
    return () => {
      effectCount.current++;
    };
  }, []);
  return (
    <div
      key={data?.id || "none"}
      className={`toast-message ${data?.type
        } duration-500 slide-out-to-right slide-in-from-right ${outAnimation ? outAnimation : "animate-in"
        }`}
      id={data?.id || "none"}
      onMouseEnter={() => data.id && clearTimer()}
      onMouseLeave={() => data.id && startTimer()}
      onTouchStart={() => data.id && clearTimer()}
      onTouchEnd={() => data.id && startTimer()}
    >
      <Icon
        icon={
          data.type == "error"
            ? "mdi:cancel"
            : data.type == "success"
              ? "mdi:check-circle-outline"
              : "mdi:information"
        }
        className="icon"
      />
      <h4>{data.message}</h4>
      <Icon
        icon="mdi-close"
        className="icon text-xl"
        onClick={() => closeNoti(data.id)}
      />
    </div>
  );
};

export default function Snackbar(props: any) {
  const { notifications, close } = useContext(NotificationContext);

  return notifications.filter((i) => i.show).length > 0 ? (
    <div className="snackbar z-[99999] pointer-events-none fixed h-fit w-screen flex justify-end p-6">
      <div className="message-wrapper pointer-events-auto w-full max-w-[350px] flex flex-col gap-4">
        {notifications
          .filter((i) => i?.show)
          .map((data) => (
            <Notif data={data} key={data.id} />
          ))}
      </div>
    </div>
  ) : (
    <></>
  );
}
