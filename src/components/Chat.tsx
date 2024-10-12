"use client";
import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { DB } from "../firestore";
import { Chat as ChatClass } from "../lib/classes";
import { Message } from "../lib/types";

export default function Chat() {
  const [chat, setChat] = useState<ChatClass>(new ChatClass());
  const senderNameRef = useRef<string>("");
  const msgRef = useRef<string>("");
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const updateName = (e: FormEvent) => {
    e.preventDefault();
    chat.updateSenderName(senderNameRef.current);
    setChat(new ChatClass(chat));
  };

  const sendMsg = (e: FormEvent) => {
    e.preventDefault();
    chat.addMessage(msgRef.current);
    setChat(new ChatClass(chat));
  };

  useEffect(() => {
    const messagesCollectionRef = collection(DB, chat.chatId);
    const q = query(messagesCollectionRef, orderBy("id"));
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        chat.handleNewMessage(change.doc.data() as Message, change.doc.id);
      });
      setChat(chat);
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  useEffect(() => {
    console.log(chat);
    setMessages(chat.messages);
  }, [chat.messages]);

  return (
    <div className="flex flex-col gap-4 border-2 border-zinc-500 p-5 rounded-lg">
      <div className="flex gap-2">
        <form onSubmit={updateName}>
          <Input
            placeholder="Your Name (Optional)"
            onChange={(e) => {
              const currentValue = e.target.value.trim();
              const isInputEmpty = !currentValue;
              const isSameAsReference = senderNameRef.current === currentValue;

              if ((isInputEmpty || isSameAsReference) && !isSaveBtnDisabled) {
                setIsSaveBtnDisabled(true);
              } else if (
                !isInputEmpty &&
                !isSameAsReference &&
                isSaveBtnDisabled
              ) {
                setIsSaveBtnDisabled(false);
              }

              senderNameRef.current = e.target.value;
            }}
            defaultValue={senderNameRef.current}
          />
          <Button type="submit" disabled={isSaveBtnDisabled}>
            Save
          </Button>
        </form>
      </div>

      <div>
        {messages.map((msg, i) => (
          <p key={i}>
            {msg.message}---{msg.status}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <form onSubmit={sendMsg}>
          <Input
            placeholder="Message"
            onChange={(e) => (msgRef.current = e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
