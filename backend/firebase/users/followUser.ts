import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { db, storage } from "../../../firebase";
import {
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
} from "@firebase/firestore";

export async function followUser(
  userID: string,
  userToFollow: string,
) {
  try {

    await updateDoc(doc(db, "users", userID), {
      following: arrayUnion(userToFollow)
    });

    await updateDoc(doc(db, "users", userToFollow), {
      follower: arrayUnion(userID)
    });

  } catch (error) {
    console.error(error);
  }
}

export async function unfollowUser(
  userID: string,
  userToUnfollow: string,
) {
  try {

    await updateDoc(doc(db, "users", userID), {
      following: arrayRemove(userToUnfollow)
    });

    await updateDoc(doc(db, "users", userToUnfollow), {
      follower: arrayRemove(userID)
    });

  } catch (error) {
    console.error(error);
  }
}

