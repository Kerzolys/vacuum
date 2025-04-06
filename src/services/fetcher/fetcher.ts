import {
  addDoc,
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
import { db, storage } from "../firebase/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

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
  try {
    const imagesCollection = collection(db, "images");
    const imagesSnapshot = await getDocs(imagesCollection);
    const imagesList = await imagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      link: doc.data().link,
    }));

    return imagesList;
  } catch (err) {
    console.error(`Error fetching images: ${err}`);
    throw err;
  }
};

export const addImage = async (file: File, title: string) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const imagesCollection = collection(db, "images");
    await addDoc(imagesCollection, { title, link: downloadURL });
    console.log("Image successfully uploaded and metadata saved.");
    return downloadURL;
  } catch (err) {
    console.error(`Error adding image: ${err}`);
    throw err;
  }
};

export const editImage = async (image: TImage, file?: File) => {
  try {
    if (!image.id) {
      throw new Error("Image ID is required");
    }
    const docRef = doc(db, "images", image.id);
    let updatedLink = image.link;
    if (file) {
      if (image.link) {
        const oldFileRef = ref(storage, `images/${image.id}`);
        await deleteObject(oldFileRef);
      }
      const newFileRef = ref(storage, `images/${file.name}`);
      await uploadBytes(newFileRef, file);
      updatedLink = await getDownloadURL(newFileRef);
    }
    const updatedImage = { ...image, link: updatedLink };
    await updateDoc(docRef, { ...image });
    return { id: docRef.id, ...updatedImage };
  } catch (err) {
    console.error(`Error editing image: ${err}`);
    throw err;
  }
};

export const deleteImage = async (imageId: string, imageLink?: string) => {
  try {
    const docRef = doc(db, "images", imageId);
    if (imageLink) {
      const imageRef = ref(storage, `images/${imageId}`);
      await deleteObject(imageRef);
    }
    await deleteDoc(docRef);
  } catch (err) {
    console.error(`Error deleting image: ${err}`);
    throw err;
  }
};
