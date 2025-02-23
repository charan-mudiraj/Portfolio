"use client";
import React, { FormEvent, memo, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Message, MessageStatus, User } from "../lib/types";
import {
  createUser,
  enqueueMessage,
  getCurrentUser,
  getUserId as getUserIdFromLC,
  sendQueuedMessages,
  updateUserName,
} from "../lib/chat_utils";
import { messagesQueue } from "../lib/objects";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
  updateDoc,
} from "firebase/firestore";
import { DB } from "../firestore";
import { atom, useAtom } from "jotai";
import { userAtom } from "../lib/atoms";
import {
  MessageCircleCode,
  MessageCircleIcon,
  MessageCircleMore,
} from "lucide-react";
import MessageComp from "./Message";

let userId = getUserIdFromLC();

const getUserId = () => {
  if (!userId) {
    userId = getUserIdFromLC();
    return userId;
  }
  return userId;
};

const SenderNameInputForm = memo(
  ({
    onSubmit,
    user,
  }: {
    onSubmit: (name: string) => Promise<void>;
    user: User;
  }) => {
    const [name, setName] = useState<string>(user.name);
    const [loading, setLoading] = useState<boolean>(false);

    const onFormSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      await onSubmit(name);
      setLoading(false);
    };

    return (
      <form onSubmit={onFormSubmit} className="flex gap-2">
        <Input
          placeholder="Your Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!name || Boolean(user && user.name === name.trim())}
          loading={loading}
        >
          Save
        </Button>
      </form>
    );
  }
);

const MessageInputForm = memo(
  ({
    onSubmit,
    loading,
  }: {
    onSubmit: (msg: string) => Promise<void>;
    loading: boolean;
  }) => {
    const [msg, setMsg] = useState<string>("");

    const onFormSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (loading) return;
      onSubmit(msg);
      setMsg("");
    };

    return (
      <form onSubmit={onFormSubmit} className="flex gap-2">
        <Input
          placeholder="Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button type="submit" loading={loading}>
          Send
        </Button>
      </form>
    );
  }
);

export const chatMessagesAtom = atom<Message[]>([]);

function UserChat() {
  const [messages, setMessages] = useAtom<Message[]>(chatMessagesAtom);
  const [isQueueProcessing, setIsQueueProcessing] = useState<boolean>(false);
  const [user, setUser] = useAtom(userAtom);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(true);
  const unsub = useRef<Unsubscribe | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const updateName = async (name: string) => {
    if (!getUserId()) {
      await createUser(name);
    } else {
      await updateUserName(name);
    }

    const res = await getCurrentUser();
    if (res.isSuccess) {
      setUser(res.data);
    }
  };

  const sendMsg = async (msg: string) => {
    const messageObj = await enqueueMessage(msg);
    if (messageObj) setMessages((curr) => [...curr, messageObj]);
  };

  const scrollListToBottom = () => {
    if (!scrollerRef.current) return;
    if (
      messages.length !== 0 &&
      scrollerRef.current.scrollHeight > scrollerRef.current.clientHeight
    ) {
      console.log("scrolling");
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  };

  const handleQueue = () => {
    if (isQueueProcessing || messagesQueue.isEmpty()) return;
    setIsQueueProcessing(true);
    sendQueuedMessages().then(() => {
      setIsQueueProcessing(false);
    });
  };

  useEffect(() => {
    handleQueue();
    scrollListToBottom();
    if (unsub.current) return;
    getCurrentUser().then((res) => {
      if (res.isSuccess) {
        const userData = res.data as User;
        setUser(userData);
      } else {
        setIsChatLoading(false);
      }
    });

    const chatId = getUserId();
    if (!chatId) return;
    const messagesCollectionRef = collection(DB, chatId);
    const q = query(messagesCollectionRef, orderBy("id"));
    unsub.current = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.docChanges().forEach((change) => {
        const newMsg = change.doc.data() as Message;
        newMsg.docId = change.doc.id;
        newMessages.push(newMsg);
      });

      let currentMessages: Message[] = [];
      setMessages((msgs) => {
        currentMessages = structuredClone(msgs);
        return msgs;
      });

      newMessages.forEach(
        (newMsg /* updated(with SENT or SEEN) or new(with WAITING */) => {
          // check if the message already exists or not
          const index = currentMessages.findIndex((m) => m.id === newMsg.id);
          if (index >= 0 && newMsg.senderId === chatId) {
            // "this message is sent by me. So, I'll just update its status"
            if (newMsg.status === MessageStatus.WAITING) {
              const docRef = doc(DB, chatId, newMsg.docId!);
              updateDoc(docRef, {
                status: MessageStatus.SENT,
              });
            } else {
              currentMessages[index].status = newMsg.status;
              setMessages(currentMessages);
            }
          } else {
            // "this message is new one from the list. It can be my message or recipient's."
            // push the new message
            setMessages((curr) => [...curr, newMsg]);

            // if current user is not the sender of the message, update the status to SEEN.
            // if (
            //   newMsg.senderId !== chatId &&
            //   newMsg.status !== MessageStatus.SEEN
            // ) {
            //   const docRef = doc(DB, chatId, newMsg.docId!);
            //   updateDoc(docRef, {
            //     status: MessageStatus.SEEN,
            //   });
            // }
          }
        }
      );
      setIsChatLoading(false);
      scrollListToBottom();
    });
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 border-2 border-zinc-500 p-5 rounded-lg bg-black max-h-[70vh]">
      {/* {user && <SenderNameInputForm onSubmit={updateName} user={user} />} */}
      <div className="overflow-auto" ref={scrollerRef}>
        {messages.map((msg, i) => (
          <MessageComp
            time={msg.time}
            isSender={msg.senderId === getUserId()}
            msgStatus={msg.status}
            msgText={msg.message}
          />
        ))}
      </div>
      <MessageInputForm onSubmit={sendMsg} loading={isChatLoading} />
    </div>
  );
}

export function Chat() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-4 right-3 flex flex-col items-end gap-3 max-h-screen z-50">
      {isOpen && <UserChat />}
      <button
        onClick={() => {
          setIsOpen((curr) => !curr);
        }}
        className="bg-white rounded-full p-2 flex item-center justify-center"
      >
        <MessageCircleMore className="text-black w-12 h-12 p-1" />
      </button>
    </div>
  );
}
