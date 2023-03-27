import {React, useEffect, useState} from "react";
import Image from "next/image";
import ImageCard  from "./ImageCard";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs);
    });

    return unsubscribe;
  }, [db]);

  return (
    <main className="max-w-7xl mx-5 xl:mx-auto pt-5 -z-100">
      <div class="masonry-2-col md:masonry-3-col lg:masonry-4-col">
        {posts.map((posts) => (
            <ImageCard
                key={posts.id}
                id={posts.id}
                username={posts.data().username}
                imageUrl={posts.data().image}
                caption={posts.data().caption}
            />
          ))}
      </div>
    </main>
  );
}

export default Feed;
