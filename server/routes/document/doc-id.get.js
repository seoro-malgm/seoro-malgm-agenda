import { getQuery } from "h3";
import { db } from "@/server/lib/firebase";

// firestore
import { getDocs, where, query, collection } from "firebase/firestore";

/**
 * document id 불러오기
 */
export default defineEventHandler(async (evt) => {
  const { collectionName, bid } = await getQuery(evt);
  const q = query(collection(db, collectionName), where("bid", "==", bid));
  const snapshot = await getDocs(q);
  if (snapshot) {
    const docs = snapshot?.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return docs[0];
  }
});
