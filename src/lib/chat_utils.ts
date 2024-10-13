import CryptoJS from "crypto-js";
import {
  errorMessages,
  fallbackUserIdEncryptionKey,
  firebaseCollectionsNames,
  localStorageKeys,
  successMessages,
} from "./constants";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { DB } from "../firestore";
import { getCurrentTime, getPromiseReturnValue, getUniqueID } from "./utils";
import { Message, MessageStatus, User } from "./types";
import { messagesQueue } from "./objects";

export const getUserId = () => {
  let encryptedUserDocId;
  if (typeof window !== "undefined") {
    encryptedUserDocId = window.localStorage.getItem(localStorageKeys.userId);
  }
  if (!encryptedUserDocId) return null;

  const decryptedUserDocId = CryptoJS.AES.decrypt(
    encryptedUserDocId,
    process.env.NEXT_PUBLIC_USERID_ENCRYPTION_KEY ?? fallbackUserIdEncryptionKey
  ).toString(CryptoJS.enc.Utf8);
  return decryptedUserDocId;
};

export const setUserId = (userId: string) => {
  const encryptedUserDocId = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_USERID_ENCRYPTION_KEY ?? fallbackUserIdEncryptionKey
  ).toString();
  if (typeof window !== "undefined") {
    window.localStorage.setItem(localStorageKeys.userId, encryptedUserDocId);
  }
};

export const updateUserName = async (newName: string) => {
  const userDocId = getUserId();
  try {
    if (!userDocId) throw new Error(errorMessages.userIdNotFound);
    const docRef = doc(DB, firebaseCollectionsNames.users, userDocId);
    await updateDoc(docRef, {
      name: newName,
    });
    return getPromiseReturnValue(true, successMessages.userNameUpdated);
  } catch (err: any) {
    console.error(err);
    return getPromiseReturnValue(false, err.message);
  }
};

export const createUser = async (username?: string) => {
  const newUserDocRef = doc(collection(DB, firebaseCollectionsNames.users));
  const newUser: User = {
    id: newUserDocRef.id,
    name: username ?? "",
    chatId: newUserDocRef.id,
  };
  try {
    await setDoc(newUserDocRef, newUser);
    setUserId(newUserDocRef.id);
    return getPromiseReturnValue(true, successMessages.userCreated);
  } catch (err) {
    console.error(err);
    return getPromiseReturnValue(false, errorMessages.userNotCreated);
  }
};

export const enqueueMessage = async (message: string) => {
  let userId = getUserId();
  if (!userId) {
    const res = await createUser();
    if (!res.isSuccess) return;
    userId = getUserId();
  }

  const newMessage: Message = {
    id: getUniqueID(),
    message,
    senderId: userId!,
    status: MessageStatus.WAITING,
    time: getCurrentTime(),
  };
  messagesQueue.enqueue(newMessage);
  return newMessage;
};

export const sendQueuedMessages = async () => {
  let messageToSend;
  const userId = getUserId();
  while ((messageToSend = messagesQueue.dequeue()) !== -1) {
    const messagesCollectionRef = collection(DB, userId!);
    try {
      console.log("were here");
      await addDoc(messagesCollectionRef, messageToSend as Message);
    } catch (err) {
      console.error(err);
      return getPromiseReturnValue(false, errorMessages.messageNotSent);
    }
  }
  return getPromiseReturnValue(true, successMessages.messagesSent);
};

export const getCurrentUser = async () => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error(errorMessages.userIdNotFound);
    const userDocRef = doc(DB, firebaseCollectionsNames.users, userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error(errorMessages.userNotFound);
    }
    return getPromiseReturnValue(
      true,
      successMessages.userFound,
      userDoc.data()
    );
  } catch (err: any) {
    console.error(err);
    return getPromiseReturnValue(false, err.message);
  }
};
