import { readBody } from "h3";
import { db } from "@/server/lib/firebase";

// firestore
import { getDocItem } from "@/server/lib/firestore";
import { addDoc, collection } from "firebase/firestore";

/**
 * 방 내부의 메시지 추가하기
 */
export default defineEventHandler(async (evt) => {
  const response = new Promise(async (resolve, reject) => {
    try {
      const { bid, form } = await readBody(evt);
      const docId = await getDocItem("board", ["bid", bid]);
      if (docId) {
        const docRef = await addDoc(collection(db, "board", docId, "messages"), form);
        if (docRef) {
          return resolve(true);
        }
      }
    } catch (error) {
      throw reject(error);
    }
  });
  return response;
});
