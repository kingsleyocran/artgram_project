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
  getDoc,
} from "@firebase/firestore";

export default async function updateData(
  data: any,
  postID: string,
  userID: string
) {
  try {
    const docRef = doc(db, "posts", postID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().userID == userID) {
        await updateDoc(doc(db, "posts", postID), {
          ...data,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateImage(
  selectedFile: any,
  postID: string
) {
  try {
    const imageRef = ref(storage, `posts/image-${postID}`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", postID), {
          imageUrl: downloadURL,
        });
      }
    );
  } catch (error) {
    console.error(error);
  }
}
