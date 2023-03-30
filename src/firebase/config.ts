import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import VueLazyload from "vue-lazyload";
import appVUE from "@/main";
import MainVue from "@/Main.vue";

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

const load_ONE_IMG = async (path: any, imgid: any, loaderID: any) => {
  try {
    await getDownloadURL(ref(RaptorNewsStorage, path))
      .then((url) => {
        let img = document.getElementById(imgid);
        if (url != undefined || null || false) {
          img?.setAttribute("src", url);
          img?.setAttribute("class", "animate__animated animate__fadeIn");
          document
            .getElementById(loaderID)
            ?.setAttribute("style", "display:none");
        } else {
          img?.setAttribute("style", "display:none");
        }
      })
      .catch((error) => {
        document.getElementById(imgid)?.setAttribute("style", "display:none");

        console.log(error.message + "hi");
      });
  } catch {}
};

export { RaptorNewsStore, RaptorNewsStorage, load_ONE_IMG };
