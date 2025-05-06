import { readBody } from "h3";
import { db } from "@/server/lib/firebase";

// firestore
import { addDoc, collection } from "firebase/firestore";

/**
 * 방 추가하기
 */
export default defineEventHandler(async (evt) => {
  const response = new Promise(async (resolve, reject) => {
    const { form } = await readBody(evt);
    try {
      const docRef = await addDoc(collection(db, "board"), form);
      if (docRef) {
        return resolve(docRef);
      }
    } catch (error) {
      throw reject(error);
    }
  });
  return response;
});
