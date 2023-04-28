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
      // let userPhoto = document.getElementById("userPhotoAcc");
      // userPhoto?.setAttribute("style", "border-radius: 50%;");
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
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });
};
export default getUserAvatar;
