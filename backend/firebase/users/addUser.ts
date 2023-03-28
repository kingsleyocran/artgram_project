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
  setDoc
} from "@firebase/firestore";


export default async function addNewData ( data:any, id:string) {
  try {
    
    await setDoc(doc(db, "users", id), {
      userID: id,
      dateCreated: serverTimestamp(),
      dateUpdated: serverTimestamp(),
      ...data
    });

    const imageRef = ref(storage, `users/profile-image-${id}`);
  } catch (error) {
    console.error(error)
  }
};
