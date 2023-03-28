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

const postsCollection = collection(db, "posts");

export default async function addNewData (selectedFile: any, data:any) {
  try {
    const docRef = await addDoc(postsCollection, {
      dateCreated: serverTimestamp(),
      dateUpdated: serverTimestamp(),
      ...data
    });
  
    const imageRef = ref(storage, `posts/image-${docRef.id}`);
  
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
  
        await updateDoc(doc(db, "posts", docRef.id), {
          imageUrl: downloadURL,
          dateUpdated: serverTimestamp(),
        });
      }
    );
  } catch (error) {
    console.error(error)
  }
};
