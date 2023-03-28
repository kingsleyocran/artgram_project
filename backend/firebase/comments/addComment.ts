import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { db, storage } from "../../../firebase";
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  collection,
  doc,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
  orderBy,
} from "@firebase/firestore";

const commentsCollection = collection(db, "comments");

export default async function addNewData (data:any, postID: string) {
  try {
    await addDoc(commentsCollection, {
      postID: postID,
      dateCreated: serverTimestamp(),
      ...data
    });
  } catch (error) {
    console.error(error)
  }
};
