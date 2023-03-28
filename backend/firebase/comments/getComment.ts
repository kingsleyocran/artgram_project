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

export default async function getComment(postID:string) {
  try {
    const querySnapshot = await getDocs(
      query(
        commentsCollection,
        orderBy("dateCreated", "desc"),
        where("postID", "==", postID),
        //limit(10)
      )
    );

    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
  
    return result;
  } catch (error) {
    
  }
}
