import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const firebaseBaseQuery = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: string;
  body?: any;
}) => {
  try {
    const ref = collection(db, url);
    switch (method) {
      case "GET":
        const snapshot = await getDocs(query(ref));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return { data };
      case "POST":
        const newDocRef = await addDoc(ref, body);
        const id = newDocRef.id;
        return { data: {  ...body, id } };
        
      case "PUT":
        const docRef = doc(db, url, body.id);
        await updateDoc(docRef, body);
        return { data: body };
      case "DELETE":
        const [collectionName, docId] = url.split("/"); // Разделяем коллекцию и ID
        if (!collectionName || !docId) {
          throw new Error("Invalid document path");
        }
        
        debugger
        const deletedDocRef = doc(db, collectionName, docId); // Передаём коллекцию и ID
        await deleteDoc(deletedDocRef);
        return { data: { id: docId } };
      default:
        throw new Error("Unsupported method");
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    return { error: { status: 500, data: errorMessage } };
  }
};
