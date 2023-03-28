import { ref, getDownloadURL, uploadString, deleteObject, listAll } from "@firebase/storage";
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
  deleteDoc,
} from "@firebase/firestore";

export default async function deleteData(id: any) {
  await deleteDoc(doc(db, "users", id));
  await deleteDataImage(id)
}

export async function deleteDataImage(id: string) {
  const imageRef = ref(storage, `users/${id}`);
  await deleteObject(imageRef)
}
