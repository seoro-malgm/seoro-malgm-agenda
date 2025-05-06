import { getQuery } from "h3";
import { db } from "@/server/lib/firebase";

// firestore
import { getDocItem } from "@/server/lib/firestore";
import { getDocs, orderBy, query, collection } from "firebase/firestore";

/**
 * 메시지 불러오기
 */
export default defineEventHandler(async (evt) => {
  const response = new Promise(async (resolve, reject) => {
    try {
      const { collectionName, bid } = await getQuery(evt);
      const docId = await getDocItem("board", ["bid", bid]);
      const collectionRef = collection(db, collectionName, docId, "messages");
      const q = query(collectionRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (snapshot?.docs) {
        // 기본불러오기
        let documents = [];
        if (snapshot?.docs) {
          snapshot.docs.forEach((doc) => {
            documents.push({ ...doc.data() });
          });
          return resolve(documents);
        }
      }
    } catch (error) {
      return reject(error);
    }
  });
  return response;
});
