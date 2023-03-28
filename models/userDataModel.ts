import { Timestamp } from "firebase/firestore";

export default interface postDataModel {
  id: string;
  name: string;
  userID: string;
  email:string;
  imageUrl: string;
  likedPosts: Array<string>; 
  followers: Array<string>;
  following: Array<string>;
  dateCreated: Timestamp | string;
  dateUpdated: Timestamp | string;
}
