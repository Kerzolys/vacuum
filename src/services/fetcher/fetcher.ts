import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { TVideo } from "../../utils/types";
import { db } from "../firebase/firebase";

export const fetchVideos = async (): Promise<TVideo[]> => {
  const videosCollection = collection(db, "videos");
  const videosSnapshot = await getDocs(videosCollection);
  const videosList = await videosSnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    link: doc.data().link,
  }));

  return videosList;
};

export const addVideo = async (video: { title: string; link: string }) => {
  try {
    // const docRef = await addDoc(collection(db, "videos"), video);
    // return { id: docRef.id, ...video };
    const docRef = doc(collection(db, "videos"));
    const newVideo = await setDoc(docRef, video) 
    return { id: docRef.id, ...video };

  } catch (err) {
    console.error(`Error adding video: ${err}`);
    throw err;
  }
};

export const deleteVideo = async (videoId: string) => {
  try {
    const docRef = doc(db, "videos", videoId);
    await deleteDoc(docRef)
  } catch (err) {
    console.error(`Error deleting video: ${err}`);
    throw err;
  }
}
