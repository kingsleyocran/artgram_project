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

const userCollection = collection(db, "users");

export default async function getBatchData() {
  try {
    const querySnapshot = await getDocs(
      query(
        userCollection,
        orderBy("dateUpdated", "desc")
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
