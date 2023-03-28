import { db, storage } from "../../../firebase";
import { doc, getDoc } from "@firebase/firestore";
import getUserByID from "../users/getUserByID";
import postDataModel, {
  postCommentDataModel,
} from "../../../models/postDataModel";
import getAllComments from "../comments/getAllComments";
import commentsDataModel from "../../../models/commentDataModel";
import { convertTimestamp } from "../../../utils/helpers";

export default async function getData(postID: string) {
  const docRef = doc(db, "posts", postID);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const postData: postDataModel = {
        id: docSnap.id ?? "",
        title: docSnap.data().title ?? "",
        userID: docSnap.data().userID ?? "",
        userName: docSnap.data().userName ?? "",
        userImgUrl: docSnap.data().userImgUrl ?? "",
        caption: docSnap.data().caption ?? "",
        imageUrl: docSnap.data().imageUrl ?? "",
        likes: docSnap.data().likes ?? 0,
        dateCreated: docSnap.data().dateCreated ? convertTimestamp(docSnap.data().dateCreated) : "",
        dateUpdated: docSnap.data().dateUpdated ? convertTimestamp(docSnap.data().dateUpdated) : "",
      };

      //Fetch Comments
      const commentData: Array<commentsDataModel> | undefined =
        await getAllComments(postID);

      const result: postCommentDataModel = {
        post: postData,
        comments: commentData!,
      };

      return result == undefined ? null : result;
    } else {
      console.log("Posts does not exist");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
