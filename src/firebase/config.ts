import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { Store } from "@/piniaStorage/dbPinia";
const firebaseConfig = {
  apiKey: "AIzaSyD0QMUgarT7H4Knkeq3lWabN8WjbNTXQts",
  authDomain: "raptor-news-58e13.firebaseapp.com",
  projectId: "raptor-news-58e13",
  storageBucket: "raptor-news-58e13.appspot.com",
  messagingSenderId: "673655207769",
  appId: "1:673655207769:web:9f382d61c4cc0dcb2bbe48",
};
const app = initializeApp(firebaseConfig);
const RaptorNewsStore = getFirestore(app);
const RaptorNewsStorage = getStorage(app);
const auth = getAuth(app);
const load_ONE_IMG = async (path: any, imgid: any, loaderID: any) => {
  try {
    const url = await getDownloadURL(ref(RaptorNewsStorage, path));
    let img = document.getElementById(imgid);
    if (url != undefined && url != null) {
      img?.setAttribute("src", url);
      img?.setAttribute("class", "animate__animated animate__fadeIn");
      setTimeout(() => {
        Store().$state.TurnOffTheErrorLoaderIMG = true;
      }, 2000);
    } else {
      Store().$state.TurnOffTheErrorLoaderIMG = false;
    }
    return url;
  } catch (error: any) {
    Store().$state.TurnOffTheErrorLoaderIMG = false;
    console.log(error.message);
    return null;
  }
};
export { RaptorNewsStore, RaptorNewsStorage, load_ONE_IMG };
