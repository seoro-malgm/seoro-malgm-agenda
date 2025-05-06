import { db } from "@/server/lib/firebase";

// firestore
import {
  // getFirestore,
  // getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  where,
  // getCountFromServer,
  // startAt,
  onSnapshot,
  startAfter,
} from "firebase/firestore";

// dto

// boardItem 전체 불러오기
export const getAllBoardItems = async (
  collectionName = "board",
  queryData, // 쿼리
  size, // 갯수
  [orderType, orderValue]
) => {
  try {
    const queryConstraints = [];
    // 순서 색인
    if (orderType) {
      if (orderValue) {
        queryConstraints.push(orderBy(orderType, orderValue));
      } else {
        queryConstraints.push(orderBy(orderType));
      }
    }
    // 추가 쿼리
    if (queryData) {
      for (const [key, value] of Object.entries(queryData)) {
        if (typeof value === "object") {
          // 페이지네이션
          if (key === "startAfter" && value) {
            queryConstraints.push(startAfter(value));
          } else queryConstraints.push(where(key, value[0], value[1], value[2])); // 추가적으로 부호가 있을 경우
        }
        // // 갯수
        // if (key === "size") queryConstraints.push(limit(value));
        else queryConstraints.push(where(key, "==", value));
      }
    }
    // 갯수
    if (size) queryConstraints.push(limit(size));

    // 최종 쿼리
    const q = query(collection(db, collectionName), ...queryConstraints);
    const snapshot = await getDocs(q);
    if (snapshot) {
      const boardItems = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      return boardItems;
    }
  } catch (error) {
    console.error("error::", error);
  }
};

// boardItem 디테일 불러오기
export const getBoardItem = async (collectionName = "board", [key = "id", id]) => {
  try {
    const q = query(collection(db, collectionName), where(key, "==", id));
    const snapshot = await getDocs(q);
    if (snapshot) {
      const docs = snapshot.docs.map(async (doc) => {
        const author = await this.getAuthor("users", ["uid", doc?.data()?.author]);
        return {
          // id: doc.id,
          ...doc.data(),
          author,
        };
      });

      return docs[0];
    }
  } catch (error) {
    console.error("error::", error);
  }
};

// id 구하기
export const getDocItem = async (collectionName = "board", [key = "docId", id]) => {
  try {
    const q = query(collection(db, collectionName), where(key, "==", id));
    const snapshot = await getDocs(q);
    if (snapshot) {
      const docs = snapshot?.docs.map((doc) => {
        return {
          id: doc.id,
        };
      });
      return docs[0]?.id;
    }
  } catch (error) {
    console.error("error::", error);
  }
};

// 실시간 watcher
export const setWatcher = (collectionName = "board", docId, updateMessages) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionRef = collection(db, collectionName, docId, "messages");
      const q = query(collectionRef, orderBy("createdAt", "desc"));
      // const snapshot = await getDocs(q);
      // if (snapshot) {
      //   console.log("snapshot:", snapshot);
      // }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        // 실시간 업데이트 처리
        const newMessages = [];
        snapshot.forEach((doc) => {
          newMessages.push({ ...doc.data() });
        });
        updateMessages(newMessages);
      });
      resolve(unsubscribe); // unsubscribe 함수를 반환
    } catch (error) {
      reject(error); // 에러 발생 시 reject
    }
  });
};
