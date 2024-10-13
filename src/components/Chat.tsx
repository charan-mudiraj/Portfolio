"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Message, MessageStatus, User } from "../lib/types";
import {
  createUser,
  enqueueMessage,
  getCurrentUser,
  getUserId,
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
import { useAtom } from "jotai";
import { messagesAtom } from "../lib/atoms";

const userId = getUserId();

export default function Chat() {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useAtom(messagesAtom);
  const [isQueueProcessing, setIsQueueProcessing] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const updateName = async (e: FormEvent) => {
    e.preventDefault();
    const userId = getUserId();
    if (!userId) {
      await createUser(username);
    } else {
      await updateUserName(username);
    }

    const res = await getCurrentUser();
    if (res.isSuccess) {
      setUser(res.data);
    }
  };

  const sendMsg = async (e: FormEvent) => {
    e.preventDefault();
    const tempMsg = message;
    setMessage("");
    const msg = await enqueueMessage(tempMsg);
    if (msg) setMessages((curr) => [...curr, msg]);
  };

  useEffect(() => {
    if (isQueueProcessing) return;
    if (!messagesQueue.isEmpty()) {
      console.log("yes");
      sendQueuedMessages().then((res) => {
        console.log(res);
        setIsQueueProcessing(false);
      });
    }
  }, [messages]);

  useEffect(() => {
    getCurrentUser().then((res) => {
      if (res.isSuccess) {
        const userData = res.data as User;
        setUser(userData);
        setUsername(userData.name);
      }
    });
    const chatId = getUserId();
    let unsub: Unsubscribe | null;
    if (chatId) {
      const messagesCollectionRef = collection(DB, chatId);
      const q = query(messagesCollectionRef, orderBy("id"));
      unsub = onSnapshot(q, (snapshot) => {
        const newMessages: Message[] = [];
        snapshot.docChanges().forEach((change) => {
          const newMsg = change.doc.data() as Message;
          newMsg.docId = change.doc.id;
          newMessages.push(newMsg);
        });
        let currentMessages: Message[];
        setMessages((list) => {
          currentMessages = JSON.parse(JSON.stringify(list));
          return [...list];
        });
        newMessages.forEach((newMsg) => {
          // updated(with SENT or SEEN) or new(with WAITING)
          // check if the message aleary exists or not
          const index = currentMessages.findIndex((m) => m.id === newMsg.id);
          if (index >= 0 && newMsg.senderId === chatId) {
            // update the status
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
            // push the new message
            setMessages((curr) => [...curr, newMsg]);
            // if current user is not the sender of the message, update the status to SEEN.
            if (
              newMsg.senderId !== chatId &&
              newMsg.status !== MessageStatus.SEEN
            ) {
              const docRef = doc(DB, chatId, newMsg.docId!);
              updateDoc(docRef, {
                status: MessageStatus.SEEN,
              });
            }
          }
        });
      });
    }
    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 border-2 border-zinc-500 p-5 rounded-lg">
      <div className="flex gap-2">
        <form onSubmit={updateName}>
          <Input
            placeholder="Your Name (Optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            type="submit"
            disabled={!username || Boolean(user && user.name === username)}
          >
            Save
          </Button>
        </form>
      </div>

      <div>
        {messages.map((msg, i) => (
          <p key={i}>
            {msg.senderId === userId ? "You" : "Charan"}--{msg.message}--
            {msg.status}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <form onSubmit={sendMsg}>
          <Input
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
