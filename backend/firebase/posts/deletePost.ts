import {
  ref,
  getDownloadURL,
  uploadString,
  deleteObject,
  listAll,
} from "@firebase/storage";
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
  getDoc,
  deleteDoc,
} from "@firebase/firestore";

export default async function deleteData(postID: any, userID: string) {
  const docRef = doc(db, "posts", postID);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    if (docSnap.data().userID == userID) {
      await deleteDoc(doc(db, "posts", postID));
      await deleteDataImage(postID);
    }
  }
}

export async function deleteDataImage(id: string) {
  const imageRef = ref(storage, `posts/image-${id}`);
  await deleteObject(imageRef);
}
