"use client";
import { Message } from "./types";
import { fallbackUserIdEncryptionKey, localStorageKeys } from "./constants";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { MessageStatus, User } from "./types";
import { DB } from "../firestore";
import { getCurrentTime, getUniqueID } from "./utils";
import CryptoJS from "crypto-js";

class Queue {
  private list: Message[];

  constructor() {
    this.list = [];
  }

  enqueue(x: Message) {
    this.list.push(x);
  }

  dequeue() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.list.shift();
  }

  isEmpty() {
    if (this.getSize() == 0) {
      return true;
    }
    return false;
  }

  getSize() {
    return this.list.length;
  }
}

export class Chat {
  senderId: string; //current user's ID who are sending messages
  senderName: string = "";
  chatId: string;
  messages: Message[] = [];
  queue: Queue;
  isProcessingQueue: boolean = false;

  constructor();
  constructor(chatObj: Chat);

  constructor(chatObj?: Chat) {
    if (chatObj) {
      this.senderId = chatObj.senderId;
      this.senderName = chatObj.senderName;
      this.chatId = chatObj.chatId;
      this.messages = chatObj.messages;
      this.queue = chatObj.queue;
      this.isProcessingQueue = chatObj.isProcessingQueue;
      return;
    }
    const encryptedUserDocId = window.localStorage.getItem(
      localStorageKeys.userId
    );

    if (!encryptedUserDocId) {
      this.senderId = "";
    } else {
      const decryptedUserDocId = CryptoJS.AES.decrypt(
        encryptedUserDocId,
        process.env.NEXT_PUBLIC_USERID_ENCRYPTION_KEY ??
          fallbackUserIdEncryptionKey
      ).toString(CryptoJS.enc.Utf8);
      this.senderId = decryptedUserDocId;
    }
    this.chatId = this.senderId;
    this.queue = new Queue();
  }

  async createUser() {
    const newUserDocRef = doc(collection(DB, "users"));
    const newUser: User = {
      id: newUserDocRef.id,
      name: "",
      chatId: newUserDocRef.id,
    };

    try {
      await setDoc(newUserDocRef, newUser);
    } catch (err) {
      console.error(err);
      return;
    }

    this.senderId = newUserDocRef.id;
    this.chatId = newUserDocRef.id;
    // store id in local-storage
    const encryptedUserDocId = CryptoJS.AES.encrypt(
      newUserDocRef.id,
      process.env.NEXT_PUBLIC_USERID_ENCRYPTION_KEY ??
        fallbackUserIdEncryptionKey
    ).toString();
    console.log("here");

    window.localStorage.setItem(localStorageKeys.userId, encryptedUserDocId);
  }

  addMessage(message: string) {
    if (!this.senderId) {
      console.log("threr");
      this.createUser();
    }
    const newMessage: Message = {
      id: getUniqueID(),
      message,
      senderId: this.senderId,
      status: MessageStatus.WAITING,
      time: getCurrentTime(),
    };
    this.queue.enqueue(newMessage);
    this.messages = [...this.messages, newMessage];

    if (!this.isProcessingQueue) {
      console.log("quququ");
      this.sendQueuedMessages();
    }
  }

  async sendQueuedMessages() {
    this.isProcessingQueue = true;
    let messageToSend;
    while ((messageToSend = this.queue.dequeue()) !== -1) {
      console.log("msg");
      const messagesCollectionRef = collection(DB, this.senderId);
      try {
        await addDoc(messagesCollectionRef, messageToSend as Message);
      } catch (err) {
        console.error(err);
        // re-enqueue if necessary
      }
    }
    this.isProcessingQueue = false;
  }

  // listenToChatCollection(meth: (ch: Chat) => void) {
  //   if (!this.chatId) return null;
  //   const messagesCollectionRef = collection(DB, this.chatId);
  //   const q = query(messagesCollectionRef, orderBy("id"));
  //   return onSnapshot(q, (snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       this.handleNewMessage(change.doc.data() as Message, change.doc.id);
  //     });
  //   });
  // }

  handleNewMessage(newMessage: Message, docId: string) {
    // updated(with SENT or SEEN) or new(with WAITING)
    // check if the message aleary exists or not
    const index = this.messages.findIndex((m) => m.id === newMessage.id);
    if (index >= 0) {
      // update the status
      if (newMessage.status === MessageStatus.WAITING) {
        this.messages[index].status = MessageStatus.SENT;
        // let sender know that their message is recieved
        const docRef = doc(DB, this.chatId, docId);
        try {
          updateDoc(docRef, {
            status: MessageStatus.SENT,
          }); // no need to await
        } catch (err) {
          console.error(err);
        }
      } else if (newMessage.status === MessageStatus.SEEN) {
        this.messages[index].status = MessageStatus.SEEN;
      }
    } else {
      // push the new message
      this.messages.push(newMessage);
      // if current user is not the sender of the message, update the status to SEEN.
      if (newMessage.senderId !== this.senderId) {
        const docRef = doc(DB, this.chatId, docId);
        updateDoc(docRef, {
          status: MessageStatus.SEEN,
        });
      }
    }
  }

  async getSenderName() {
    try {
      if (!this.senderId) throw new Error("Sender ID not defined.");
      const senderDocRef = doc(DB, "users", this.senderId);
      const docSnapshot = await getDoc(senderDocRef);
      if (docSnapshot.exists()) {
        const sender = docSnapshot.data() as User;
        this.senderName = sender.name;
      } else {
        throw new Error("Sender Doc not found.");
      }
    } catch (err) {
      console.error(err);
      return "";
    }
  }

  async updateSenderName(newName: string) {
    try {
      if (!this.senderId) throw new Error("Sender ID not defined.");
      const senderDocRef = doc(DB, "users", this.senderId);
      await updateDoc(senderDocRef, {
        name: newName,
      });
      this.getSenderName();
    } catch (err) {
      console.error(err);
    }
  }
}
