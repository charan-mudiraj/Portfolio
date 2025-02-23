import { MessageStatus } from "../lib/types";
import Image from "next/image";

function StatusIndicator({ status }: { status: MessageStatus }) {
  return (
    <>
      {(status == MessageStatus.WAITING && (
        <img src={"clock.png"} className="h-3" />
      )) ||
        (status == MessageStatus.SENT && (
          <img src={"sent.png"} className="h-2.5" />
        )) ||
        (status == MessageStatus.SEEN && (
          <img src={"seen.png"} className="h-2.5" />
        ))}
    </>
  );
}

export default function Message({
  msgStatus,
  isSender,
  msgText,
  time,
}: {
  msgStatus: MessageStatus;
  isSender: boolean;
  msgText: string;
  time: string;
}) {
  const bgColor = isSender ? "bg-chat" : "bg-secondary_chat";
  const justify = isSender ? "justify-end" : "justify-start";
  const roundedTop = isSender ? "rounded-tl-xl" : "rounded-tr-xl";

  return (
    <div className={"p-2 flex" + " " + justify}>
      <div
        className={
          "w-fit p-1.5 rounded-b-xl" + " " + bgColor + " " + roundedTop
        }
      >
        <p className="text-md">{msgText}</p>
        <div className="flex justify-end items-center text-xs">
          <p className="text-xs text-zinc-300 font-thin pr-1">{time}</p>
          {isSender && <StatusIndicator status={msgStatus} />}
        </div>
      </div>
    </div>
  );
}
