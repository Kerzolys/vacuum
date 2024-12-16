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
        console.log(data)
        return { data };
      case "POST":
        const newDocRef = await addDoc(ref, body);
        return { data: { id: newDocRef.id, ...body } };
      case "PUT":
        const docRef = doc(db, url, body.id);
        await updateDoc(docRef, body);
        return { data: body };
      case "DELETE":
        await deleteDoc(doc(db, url, body.id));
        return { data: { id: body.id } };
      default:
        throw new Error("Unsupported method");
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    return { error: { status: 500, data: errorMessage } };
  }
};
