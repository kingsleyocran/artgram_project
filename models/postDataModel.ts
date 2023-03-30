import { Timestamp } from "firebase/firestore";
import commentDataModel from "./commentDataModel";

export default interface postDataModel {
  id: string;
  caption: string;
  imageUrl: string;
  userID: string;
  userName: string;
  userImgUrl: string;
  likes: number;
  dateCreated: any;
  dateUpdated: any;
}

export interface postCommentDataModel {
  post: postDataModel;
  comments: Array<commentDataModel>;
}
