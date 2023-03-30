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

import postDataModel from "../../../models/postDataModel";
import { convertTimestamp } from "../../../utils/helpers";

const postsCollection = collection(db, "posts");

export default async function getPostByIDgetDataByUser(userID: string) {
  try {
    const querySnapshot = await getDocs(
      query(
        postsCollection, 
        orderBy("dateUpdated", "desc"),
        where("userID", "==", userID)
      )
    );

    const data: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      data.push(snapshot);
    });

    const result: Array<postDataModel> = []

    data?.forEach((item) => {
      result.push({
        id: item.id,
        caption: item.data().caption ?? "",
        imageUrl: item.data().imageUrl ?? "",
        userID: item.data().userID ?? "",
        userName: item.data().userName ?? "",
        userImgUrl: item.data().userImgUrl ?? "",
        likes: item.data().likes ?? 0,
        dateCreated: item.data().dateCreated ? convertTimestamp(item.data().dateCreated) : "",
        dateUpdated: item.data().dateUpdated ? convertTimestamp(item.data().dateUpdated) : "",
      });
    });
  
    return result == undefined ? [] : result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
