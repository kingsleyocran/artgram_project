import { db, storage } from "../../../firebase";
import { doc, getDoc } from "@firebase/firestore";

import userDataModel from "../../../models/userDataModel";
import { convertTimestamp } from "../../../utils/helpers";

export default async function getData(userID: string) {
  const docRef = doc(db, "users", userID);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {

      const result: userDataModel = {
        id: docSnap.id ?? "",
        name: docSnap.data().name ?? "",
        userID: docSnap.data().userID ?? "",
        email: docSnap.data().email ?? "",
        imageUrl: docSnap.data().imageUrl ?? "",
        likedPosts: docSnap.data().likedPosts ?? [],
        followers: docSnap.data().followers ?? [],
        following: docSnap.data().following ?? [],
        dateCreated: docSnap.data().dateCreated ? convertTimestamp(docSnap.data().dateCreated) : "",
        dateUpdated: docSnap.data().dateUpdated ? convertTimestamp(docSnap.data().dateUpdated) : "",
      };

      return result == undefined ? null : result;
    } else {
      console.log("User does not exist");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
