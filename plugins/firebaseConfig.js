// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin({
  name: "firebase-config",
  enforce: "pre", // or 'post'
  async setup(nuxtApp) {
    // const config = useRuntimeConfig();
    // console.log("config:", config);
    // const firebaseConfig = {
    //   apiKey: config.public.API_KEY,
    //   authDomain: config.public.AUTH_DOMAIN,
    //   projectId: config.public.PROJECT_ID,
    //   storageBucket: config.public.STORAGE_BUCKET,
    //   messagingSenderId: config.public.MESSAGING_SENDER_ID,
    //   appId: config.public.APP_ID,
    //   measurementId: config.public.MEASUREMENT_ID || "",
    //   databaseURL: config.public.DATABASE_URL,
    // };
    // const firebaseApp = initializeApp(firebaseConfig);
    // const firestore = getFirestore(firebaseApp);
    // return {
    //   provide: {
    //     firebaseApp,
    //     firebaseDB,
    //   },
    // };
  },
});
