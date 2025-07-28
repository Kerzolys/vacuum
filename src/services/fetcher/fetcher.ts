import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { TBio, TEvent, TImage, TVideo } from "../../utils/types";
import { db } from "../firebase/firebase";

import { BUCKET_NAME, s3 } from "../yandexCloud/yc";

export const fetchBio = async (): Promise<TBio[]> => {
  const bioCollection = collection(db, "bio");
  const bioSnapshot = await getDocs(bioCollection);
  const bioList = await bioSnapshot.docs.map((doc) => ({
    id: doc.id,
    paragraph: doc.data().paragraph,
    position: doc.data().position,
  }));

  return bioList;
};

export const addBio = async (bio: TBio) => {
  try {
    const docRef = doc(collection(db, "bio"));
    const newBio = await setDoc(docRef, bio);
    return { id: docRef.id, ...bio };
  } catch (err) {
    console.error(`Error adding bio: ${err}`);
    throw err;
  }
};

export const editBio = async (bio: TBio) => {
  try {
    if (!bio.id) {
      throw new Error("Bio ID is required");
    }
    const docRef = doc(db, "bio", bio.id);
    await updateDoc(docRef, { ...bio });
    return { id: docRef.id, ...bio };
  } catch (err) {
    console.error(`Error editing bio: ${err}`);
    throw err;
  }
};
export const deleteBio = async (id: string) => {
  try {
    const docRef = doc(db, "bio", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error(`Error deleting bio: ${err}`);
    throw err;
  }
};

export const fetchEvents = async (): Promise<TEvent[]> => {
  // const eventsCollection = collection(db, "events");
  const eventsCollection = query(
    collection(db, "events"),
    orderBy("createdAt", "desc")
  );
  const eventsSnapshot = await getDocs(eventsCollection);
  const eventsList = await eventsSnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    date: doc.data().date,
    time: doc.data().time,
    location: doc.data().location,
    program: doc.data().program,
    link: doc.data().link,
    createdAt: doc.data().createdAt,
    archived: doc.data().archived,
  }));

  return eventsList;
};

export const addEvent = async (event: TEvent) => {
  try {
    const docRef = doc(collection(db, "events"));
    const fullEvent = {
      ...event,
      createdAt: serverTimestamp(),
      archived: false,
    };
    await setDoc(docRef, fullEvent);
    return { id: docRef.id, ...fullEvent };
  } catch (err) {
    console.error(`Error adding event: ${err}`);
    throw err;
  }
};

export const editEvent = async (event: TEvent) => {
  try {
    if (!event.id) {
      throw new Error("Event ID is required");
    }
    const docRef = doc(db, "events", event.id);
    await updateDoc(docRef, { ...event });
    return { id: docRef.id, ...event };
  } catch (err) {
    console.error(`Error editing event: ${err}`);
    throw err;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const docRef = doc(db, "events", eventId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error(`Error deleting event: ${err}`);
    throw err;
  }
};

export const archiveEvent = async (eventId: string) => {
  try {
    const docRef = doc(db, "events", eventId);
    await updateDoc(docRef, { archived: true });
    console.log(docRef);
  } catch (err) {
    console.error(`Error archiving event: ${err}`);
    throw err;
  }
};

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
    const docRef = doc(collection(db, "videos"));
    const newVideo = await setDoc(docRef, video);
    return { id: docRef.id, ...video };
  } catch (err) {
    console.error(`Error adding video: ${err}`);
    throw err;
  }
};

export const editVideo = async (video: TVideo) => {
  try {
    if (!video.id) {
      throw new Error("Video ID is required");
    }
    const docRef = doc(db, "videos", video.id);
    await updateDoc(docRef, { ...video });
    return { id: docRef.id, ...video };
  } catch (err) {
    console.error(`Error editing video: ${err}`);
    throw err;
  }
};

export const deleteVideo = async (videoId: string) => {
  try {
    const docRef = doc(db, "videos", videoId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error(`Error deleting video: ${err}`);
    throw err;
  }
};

export const fetchImages = async (): Promise<TImage[]> => {
  const imagesCollection = collection(db, "images");
  const imagesSnapshot = await getDocs(imagesCollection);
  const imagesList = await imagesSnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    link: doc.data().link,
  }));

  return imagesList;
};

export const addImage = async (file: File, title: string) => {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const params = {
      Bucket: BUCKET_NAME,
      Key: `images/${file.name}`,
      Body: arrayBuffer,
      ContentType: file.type,
      ACL: "public-read",
    };

    const uploadResult = await s3.upload(params).promise();

    const image: TImage = {
      title: title,
      link: uploadResult.Location,
    };

    const docRef = doc(collection(db, "images"));
    await setDoc(docRef, image);

    return {
      id: docRef.id,
      ...image,
    };
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};

export const deleteImage = async (imageId: string, imageLink?: string) => {
  try {
    if (imageLink) {
      const key = new URL(imageLink).pathname.slice(1);

      await s3
        .deleteObject({
          Bucket: BUCKET_NAME,
          Key: key,
        })
        .promise();
      const docRef = doc(db, "images", imageId);
      await deleteDoc(docRef);
    }
  } catch (err) {
    console.error("Error deleting image:", err);
    throw err;
  }
};

