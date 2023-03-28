import { db } from "../../../firebase";
import {
  updateDoc,
  doc,
  increment,
  arrayUnion,
  arrayRemove,
} from "@firebase/firestore";

export async function addLike(postData: any, userID: string) {
  try {
    //Add like to post
    await updateDoc(doc(db, "posts", postData.id), {
      likes: increment(1),
    });

    //add post to like array in users
    await updateDoc(doc(db, "users", userID), {
      likedPosts: arrayUnion(postData),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function unLike(postData: any, userID: string) {
  try {
    //Add like to post
    await updateDoc(doc(db, "posts", postData.id), {
      likes: increment(-1),
    });

    //add post to like array in users
    await updateDoc(doc(db, "users", userID), {
      likedPosts: arrayRemove(postData),
    });
  } catch (error) {
    console.error(error);
  }
}
