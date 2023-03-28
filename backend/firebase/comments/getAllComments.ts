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

import commentsDataModel from "../../../models/commentDataModel";
import { convertTimestamp } from "../../../utils/helpers";

const commentsCollection = collection(db, "comments");

export default async function getAllComments(postID: string) {
  try {
    const querySnapshot = await getDocs(
      query(
        commentsCollection,
        orderBy("dateCreated", "asc"),
        where("postID", "==", postID)
      )
    );

    const data: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      data.push(snapshot);
    });

    const result: Array<commentsDataModel> = [];

    data?.forEach((item) => {
      result.push({
        id: item.id,
        postID: item.data().postID ?? "",
        userID: item.data().userID ?? "",
        userName: item.data().userName ?? "",
        userImgUrl: item.data().userImgUrl ?? "",
        comment: item.data().comment ?? "",
        dateCreated: item.data().dateCreated ? convertTimestamp(item.data().dateCreated) : "",
      });
    });

    return result == undefined ? [] : result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
