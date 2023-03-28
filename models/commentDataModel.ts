import { Timestamp } from "firebase/firestore";

export default interface commentsDataModel {
  id: string;
  postID: string;
  userID: string;
  userName: string;
  userImgUrl: string;
  comment: string;
  dateCreated: Timestamp | string;
}
