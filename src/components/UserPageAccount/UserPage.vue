<template>
  <div
    class="accountContainer animate__backInDown animate__animated"
    :class="{ animate__backOutUp: closeModalClass }"
    v-if="store.$state.OpenCloseAccountModalWindow"
  >
    <img
      id="closeUserPage"
      src="@/assets/AuthAssets/icons8-close.svg"
      alt="Close"
      @click="closeModal"
    />
    <img
      src="@/assets/UserAcc/ModalWindowAcc/icons8-left-arrow-96.png"
      alt="Back"
      @click="goBackToMajorModal"
      v-if="ChangeUserPhoto || userSettingsON"
      id="arrowBack"
    />
    <div v-if="!ChangeUserPhoto && !userSettingsON" class="mainContentUserPage">
      <h3>Hello {{ store.$state.UserName }}!</h3>
      <div class="userSettings">
        <div class="img-wrapper">
          <img
            src="@/assets/UserAcc/ModalWindowAcc/icons8-test-account-48.png"
            alt="Account settings"
            class="forAll"
            @click="userSettingsON = !userSettingsON"
          />
          <span class="text">Settings</span>
        </div>

        <div class="img-wrapper">
          <img
            src="@/assets/UserAcc/ModalWindowAcc/icons8-facebook-like-100.png"
            alt="Your liked news"
            class="forAll"
          />
          <span class="text">Liked news</span>
        </div>

        <div class="img-wrapper">
          <img
            src="@/assets/UserAcc/ModalWindowAcc/icons8-push-notifications-96.png"
            alt="Notifications"
            class="forAll"
          />
          <span class="text">Notifications</span>
        </div>

        <div class="img-wrapper">
          <img
            class="userPhotoAcc forAll"
            :class="{ userPhotoAccBorder50: store.$state.isUserPhotoExists }"
            :src="UserGenderPhoto"
            alt="UserPhoto"
            @click="ChangeUserPhoto = !ChangeUserPhoto"
          />
          <span class="text">Change photo</span>
        </div>
      </div>
      <button
        class="logout-btn"
        v-if="!ChangeUserPhoto && !userSettingsON"
        @click="singOutUser"
      >
        Sing Out
      </button>
    </div>
    <div class="changePhoto" v-if="ChangeUserPhoto">
      <img
        id="svgSpace"
        v-if="isloadIMGProcess"
        src="@/assets/UserAcc/ModalWindowAcc/space.svg"
        alt=""
      />

      <div class="loadingProcess" v-if="isloadIMGProcess">
        <span class="loader"></span>
        <p>Process {{ innerLoadProcess.toFixed(0) }}%</p>
      </div>
      <div
        class="changePhotoContainer"
        v-if="!isloadIMGProcess && cropperIMGvalue"
      >
        <img id="IMGCropper" :src="cropperIMGvalue" alt="avatar" />
      </div>

      <div
        v-if="!isCropped"
        class="drag-drop-container"
        @dragover.prevent
        @drop="handleDrop"
        @dragenter="handleDragEnter"
        :class="{ 'drag-over': isDragOver }"
      >
        <input
          v-if="!isCropped"
          type="file"
          ref="inputFile"
          @change="onFileChange"
        />
        <p>Drag and drop files here or click to select files</p>
      </div>
      <button
        class="saveCroppedImage"
        v-if="isCropped && !isloadIMGProcess"
        @click="saveCroppedImage"
      >
        Save this cute fase!
      </button>
    </div>
    <form @submit.prevent v-if="userSettingsON">
      <div class="changedSuccesfully" v-if="changedSuccess">
        <img
          id="svgSpace"
          src="@/assets/UserAcc/ModalWindowAcc/space.svg"
          alt=""
        />

        <div class="loadingProcess">
          <span class="loader"></span>
          <span class="loaderChange"></span>
        </div>
      </div>
      <label>Please, write your old email:</label>
      <input v-model="oldEmail" type="email" required />
      <p class="Perror" v-if="errorOldEmail">
        It isn't your old email. Pleas, try again
      </p>

      <label>Please, write your new email:</label>
      <input
        placeholder="example@example.com"
        v-model="newEmail"
        type="email"
        required
      />
      <label>Please, write your old password:</label>
      <input v-model="oldPass" type="password" required />
      <label>Please, write your new password:</label>
      <input v-model="newPass" type="password" required />
      <p class="Perror" v-if="passCheck">
        {{ passCheck }}
      </p>
      <p v-if="errorTotalMessage" id="UserSetsTotalError">
        Something went wrong. Please, refresh the page.
      </p>
      <button class="ChangePassAndEmailButt" @click="changeEmailandPassword">
        Confirm changes
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted, defineComponent, onBeforeUnmount, watch } from "vue";
import { Store } from "@/piniaStorage/dbPinia";
import {
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  getStorage,
  ref as fireRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import getUserAvatar from "@/composables/getUserAccPhoto";
import singOutUser from "@/composables/singOutUser";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
export default defineComponent({
  setup() {
    let auth = getAuth();
    let UserUid;
    let storage = getStorage();
    let store = Store();
    let router = useRouter();
    // Modal of UserSettings------------------------------------------------------
    let userSettingsON = ref(false);
    let oldEmail = ref();
    let newEmail = ref();
    let oldPass = ref();
    let newPass = ref();
    let passCheck = ref();
    let changedSuccess = ref(false);
    let errorTotalMessage = ref(false);
    let errorOldEmail = ref(false);
    // Modal of UserSettings------------------------------------------------------
    // Modal of loading IMG------------------------------------------------------
    let UserGenderPhoto = ref();
    let cropperIMGvalue = ref();
    let ChangeUserPhoto = ref(false);
    let isCropped = ref(false);
    let isloadIMGProcess = ref(false);
    let innerLoadProcess = ref();
    let cropper: any = null;
    let isModalOpen = ref(true);
    // Modal of loading IMG------------------------------------------------------
    let closeModalClass = ref(false);
    let checkScroll = () => {
      if (window.scrollY >= 600) {
        closeModal();
      }
    };
    let closeModal = () => {
      closeModalClass.value = true;
      setTimeout(() => {
        closeModalClass.value = false;
        store.$state.OpenCloseAccountModalWindow = false;
      }, 500);
      router.push({ path: "/" });
    };
    let goBackToMajorModal = () => {
      ChangeUserPhoto.value = ChangeUserPhoto.value ? false : false;
      userSettingsON.value = userSettingsON.value ? false : false;
    };
    //--------------drag&drop Area-----------------------------
    const isDragOver = ref(false);
    function handleDragEnter() {
      isDragOver.value = true;
    }
    let handleDragLeave = () => {
      isDragOver.value = false;
    };
    let handleDrop = (event: DragEvent) => {
      event.preventDefault();
      isDragOver.value = false;
      if (event.dataTransfer?.types?.includes("Files")) {
        const files = Array.from(event.dataTransfer?.files) as File[];
        onFileChange(files);
      }
    };
    //--------------drag&drop Area-------------------------------------------
    // Modal of loading IMG------------------------------------------------------
    let onFileChange = (event: any) => {
      let fileInput = event.target.files[0];
      let fileDragDrop = event[0];
      if (fileDragDrop || fileInput) {
        let reader = new FileReader();
        reader.onload = (e) => {
          cropperIMGvalue.value = e.target?.result;
        };
        reader.onloadend = () => {
          let cropFile = document.getElementById(
            "IMGCropper"
          ) as HTMLImageElement;
          cropper = new Cropper(cropFile, {
            aspectRatio: 1,
            guides: false,
            background: false,
            cropBoxResizable: false,
            center: false,
            viewMode: 3,
            crop() {
              isCropped.value = true;
            },
            ready: function () {
              cropper.setCropBoxData({
                width: 200,
                height: 200,
              });
            },
          });
        };
        reader.readAsDataURL(fileDragDrop || fileInput);
      }
    };
    let saveCroppedImage = () => {
      handleFileUpload(cropper);
    };
    let handleFileUpload = async (img: any) => {
      img?.getCroppedCanvas().toBlob((blob: any) => {
        let formData = new FormData();
        formData.append("avatar", blob as Blob);
        let storageRef = fireRef(
          storage,
          `/UsersAvatars/${store.$state.UserUID}/UserAccPhoto`
        );
        let uploadTask = uploadBytesResumable(storageRef, blob as Blob);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            innerLoadProcess.value =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            isloadIMGProcess.value = true;
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                break;
              case "storage/canceled":
                break;
              case "storage/unknown":
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              store.$state.userPhotoAcc = downloadURL as string;
              console.log(store.$state.userPhotoAcc);
            });
            closeModal();
          }
        );
      });
    };
    // Modal of loading IMG------------------------------------------------------
    // modal of user settings
    const changeEmailandPassword = async () => {
      try {
        const user = auth.currentUser;
        const userOldEmail = user?.email;
        if (!userOldEmail || userOldEmail !== oldEmail.value) {
          errorOldEmail.value = true;
          return;
        } else errorOldEmail.value = false;
        const credential = EmailAuthProvider.credential(
          userOldEmail,
          oldPass.value
        );
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, newEmail.value);
        await updatePassword(user, newPass.value);
        changedSuccess.value = true;
        setTimeout(() => {
          localStorage.setItem("SingIN-Butt-Class", "SingIN-Butt-b4-SingIN");
          closeModal();
          singOutUser();
        }, 2900);
      } catch (error) {
        errorTotalMessage.value = true;
      }
    };
    let checkRepeatedChars = (str: any) => {
      for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) !== i) {
          return true;
        }
      }
      return false;
    };
    watch(newPass, () => {
      passCheck.value =
        newPass.value.length == 0
          ? " "
          : newPass.value.length < 8
          ? "Your password must have at least 8 symbols"
          : checkRepeatedChars(newPass.value)
          ? "We've found repeated symbols in your password. Please, change that."
          : false;
    });
    // modal of user settings
    onMounted(() => {
      document.addEventListener("scroll", checkScroll);
      if (store.$state.UserUID) {
        getUserAvatar(UserGenderPhoto, store);
      }
      onBeforeUnmount(() => {
        document.removeEventListener("scroll", checkScroll);
      });
    });
    return {
      isModalOpen,
      closeModal,
      store,
      closeModalClass,
      UserGenderPhoto,
      ChangeUserPhoto,
      handleFileUpload,
      goBackToMajorModal,
      onFileChange,
      isCropped,
      saveCroppedImage,
      innerLoadProcess,
      isloadIMGProcess,
      auth,
      isDragOver,
      handleDragEnter,
      handleDragLeave,
      handleDrop,
      cropperIMGvalue,
      singOutUser,
      userSettingsON,
      oldEmail,
      newEmail,
      newPass,
      errorTotalMessage,
      errorOldEmail,
      changeEmailandPassword,
      passCheck,
      changedSuccess,
      oldPass,
    };
  },
});
</script>

<style scoped>
.accountContainer {
  position: absolute;
  top: 20%;
  left: 30%;
  display: grid;
  align-items: center;
  justify-items: center;
  height: fit-content;
  max-width: 410px;
  border: none;
  border-radius: 10px;
  background: rgb(230, 228, 228);
  margin: 30px auto;
  padding: 50px;
  z-index: 21;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
}
h3 {
  margin-top: -20px;
  text-align: center;
}
.userSettings {
  display: grid;
  align-items: center;
  justify-items: center;
  gap: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.img-wrapper {
  position: relative;
}

.forAll {
  width: 55px;
  height: 55px;
  cursor: pointer;
  transform: scale(1);
  transition: 0.5s;
}

.img-wrapper:hover img {
  transform: scale(1.4);
}

.text {
  font-size: 12px;
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: 0.3s;
  font-weight: bold;
  text-align: center;
}

.img-wrapper:hover .text {
  opacity: 1;
}

#closeUserPage {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 5%;
  left: 90%;
}
.changePhoto {
  max-width: 420px;
  display: grid;
  grid-template-rows: 1fr 0.1fr;
  gap: 30px;
  align-items: center;
  justify-items: center;
}
#arrowBack {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 5%;
  left: 5%;
}
.userPhotoAcc {
  max-width: 100%;
  display: block;
}
.userPhotoAccBorder50 {
  border-radius: 50%;
}
input[type="file"] {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
}

#IMGCropper {
  max-width: 100%;
  display: block;
  height: auto;
  object-fit: cover;
  border-radius: 2%;
}

.changePhotoContainer {
  margin-top: 30px;
  width: 400px;
  height: 400px;
  overflow: hidden;
}
.saveCroppedImage {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  padding: 10px;
}
.saveCroppedImage:hover {
  background-color: #f2f2f2;
}

/* loaderIMGtoDB */
.loadingProcess {
  top: 100px;
  position: relative;
  width: 420px;
  height: 300px;
  z-index: 1000;
}
#svgSpace {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
}
.loadingProcess > p {
  text-align: center;
  margin-top: 50px;
}
.loader {
  width: 32px;
  height: 90px;
  display: block;
  margin: 20px auto;
  position: relative;
  border-radius: 50% 50% 0 0;
  border-bottom: 10px solid #ff3d00;
  background-color: #fff;
  background-image: radial-gradient(
      ellipse at center,
      #fff 34%,
      #ff3d00 35%,
      #ff3d00 54%,
      #fff 55%
    ),
    linear-gradient(#ff3d00 10px, transparent 0);
  background-size: 28px 28px;
  background-position: center 20px, center 2px;
  background-repeat: no-repeat;
  box-sizing: border-box;
  animation: animloaderBack 1s linear infinite alternate;
}
.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0px 15px #ff3d00 inset;
  top: 67px;
}
.loader::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 34px;
  height: 34px;
  top: 112%;
  background: radial-gradient(
    ellipse at center,
    #ffdf00 8%,
    rgba(249, 62, 0, 0.6) 24%,
    rgba(0, 0, 0, 0) 100%
  );
  border-radius: 50% 50% 0;
  background-repeat: no-repeat;
  background-position: -44px -44px;
  background-size: 100px 100px;
  box-shadow: 4px 4px 12px 0px rgba(255, 61, 0, 0.5);
  box-sizing: border-box;
  animation: animloader 1s linear infinite alternate;
}

@keyframes animloaderBack {
  0%,
  30%,
  70% {
    transform: translateY(0px);
  }
  20%,
  40%,
  100% {
    transform: translateY(-5px);
  }
}

@keyframes animloader {
  0% {
    box-shadow: 4px 4px 12px 2px rgba(255, 61, 0, 0.75);
    width: 34px;
    height: 34px;
    background-position: -44px -44px;
    background-size: 100px 100px;
  }
  100% {
    box-shadow: 2px 2px 8px 0px rgba(255, 61, 0, 0.5);
    width: 30px;
    height: 28px;
    background-position: -36px -36px;
    background-size: 80px 80px;
  }
}
/* loaderIMGtoDB */
.drag-drop-container {
  align-items: center;
  border: 2px dashed #ccc;
  padding: 3px;
  text-align: center;
  display: flex;
  position: relative;
  top: 14%;
  width: 100%;
  height: 200px;
  justify-content: center;
}

.drag-over {
  background-color: #eee;
}
.logout-btn {
  background-color: #007bff;
  color: #fff;
  border-radius: 30px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 50px;
  width: 120px;
  justify-self: center;
  margin-bottom: -20px;
}

.logout-btn:hover {
  background-color: #0062cc;
}
.mainContentUserPage {
  display: grid;
}
.userSetContainer {
}
#UserSetsTotalError {
}
form {
  border-radius: 10px;
  background: #f5f5f5;
  text-align: left;
  padding: 60px;
}
label {
  color: #aaa;
  text-transform: uppercase;
  margin: 25px 0px 15px;
  display: inline-block;
  font-size: 0.9em;
}
input {
  display: block;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background-color: whitesmoke;
  border-bottom: 1px solid #e2bebe;
  padding: 5px 6px;
}
input:focus {
  outline: none;
}
.Perror {
  color: rgba(231, 9, 9, 0.49);
  font-size: 10px;
  margin: 0;
  padding: 0;
}
.changedSuccesfully {
  position: absolute;
  display: grid;
  width: 100%;
  height: 100%;
  z-index: 999999;
  border-radius: 10px;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: start;
}
.changedSuccesfully > img {
  max-width: 100%;
  max-height: 100%;
}
.loaderChange {
  width: 100%;
  height: 4.8px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
  top: 318px;
}
.loaderChange::after {
  content: "";
  width: 0%;
  height: 4.8px;
  background-color: #fff;
  font-size: 15px;
  background-image: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.25) 25%,
    transparent 25%,
    transparent 50%,
    rgba(0, 0, 0, 0.25) 50%,
    rgba(0, 0, 0, 0.25) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1em 1em;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  animation: animFw 3s ease-in infinite, barStripe 1s linear infinite;
}

@keyframes barStripe {
  0% {
    background-position: 1em 0;
  }
  100% {
    background-position: 0 0;
  }
}

@keyframes animFw {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.ChangePassAndEmailButt {
  left: 64px;
  top: 23px;
  border: 1px solid #ccc;
  display: inline-block;
  position: relative;
  padding: 10px;
  cursor: pointer;
}
.ChangePassAndEmailButt:hover {
  background-color: #f2f2f2;
}
</style>
