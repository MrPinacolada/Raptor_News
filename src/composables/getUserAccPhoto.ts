import { getStorage, ref as fireRef, getDownloadURL } from "firebase/storage";
import { RaptorNewsStore } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
const storage = getStorage();
let getUserAvatar = async (src: any, store: any) => {
  let docUserNameAndGenderRef = doc(
    RaptorNewsStore,
    "userNames",
    store.$state.UserUID
  );
  let response = await getDoc(docUserNameAndGenderRef);

  let userPhotoRef = fireRef(
    storage,
    `/UsersAvatars/${store.$state.UserUID}/UserAccPhoto`
  );
  getDownloadURL(userPhotoRef)
    .then(async (url) => {
      src.value = url;
      store.$state.isUserPhotoExists = true;
      if (response.exists()) {
        store.$state.UserName = response.data().userName;
        store.$state.UserGender = response.data().gender;
      } else {
        store.$state.UserName = "NoName";
        store.$state.UserGender = "male";
      }
    })
    .catch(async (error) => {
      if (response.exists()) {
        store.$state.UserName = response.data().userName;
        store.$state.UserGender = response.data().gender;
        src.value =
          "/src/assets/UserAcc/ModalWindowAcc/" +
          store.$state.UserGender +
          "AccIMG.png";
      } else {
        store.$state.UserName = "NoName";
        store.$state.UserGender = "male";
      }
      switch (error.code) {
        case "storage/object-not-found":
          break;
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;
        case "storage/unknown":
          break;
      }
    });
};
export default getUserAvatar;
