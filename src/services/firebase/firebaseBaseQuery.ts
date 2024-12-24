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
  console.log("BaseQuery Called:", { url, method, body });
  try {
    const ref = collection(db, url);
    console.log("HTTP Method:", method);
    switch (method) {
      case "GET":
        const snapshot = await getDocs(query(ref));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        return { data };
      case "POST":
        const newDocRef = await addDoc(ref, body);
        const id = newDocRef.id;
        console.log(id)
        return { data: {  ...body, id } };
        
      case "PUT":
        const docRef = doc(db, url, body.id);
        await updateDoc(docRef, body);
        return { data: body };
      case "DELETE":
        // console.log(url)
        // const docToDelete = doc(db, url); // Указываем точный путь к документу
        // await deleteDoc(docToDelete);
        // return { data: { id: body.id } };
        const [collectionName, docId] = url.split("/"); // Разделяем коллекцию и ID
        if (!collectionName || !docId) {
          throw new Error("Invalid document path");
        }
        
        debugger
        const deletedDocRef = doc(db, collectionName, docId); // Передаём коллекцию и ID
        console.log(deletedDocRef);
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
