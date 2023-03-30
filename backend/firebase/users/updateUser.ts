import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { db, storage } from "../../../firebase";
import {
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";

export default async function updateData(data: any, userID: string) {
  // update the doc by setting done to true
  await updateDoc(doc(db, "users", userID), {
    ...data,
    dateCreated: serverTimestamp(),
    dateUpdated: serverTimestamp(),
  });
}

export async function updateImage(selectedFile: any, userID: string) {
  // update the doc by setting done to true
  const imageRef = ref(storage, `users/${userID}`);

  await uploadString(imageRef, selectedFile, "data_url").then(
    async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", userID), {
        imageUrl: downloadURL,
        dateCreated: serverTimestamp(),
        dateUpdated: serverTimestamp(),
      });
    }
  );
}
