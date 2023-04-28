<template>
  <!-- arrows back and forward -->
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
      v-if="ChangeUserPhoto"
      id="arrowBack"
    />
    <!-- arrows back and forward -->
    <!-- main content -->
    <div v-if="!ChangeUserPhoto" class="mainContentUserPage">
      <h3>Hello {{ store.$state.UserName }}!</h3>
      <div class="userSettings">
        <div class="img-wrapper">
          <img
            src="@/assets/UserAcc/ModalWindowAcc/icons8-test-account-48.png"
            alt="Account settings"
            class="forAll"
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
      <button class="logout-btn" v-if="!ChangeUserPhoto" @click="singOutUser">
        Sing Out
      </button>
    </div>
    <!-- main content -->

    <!-- //--------------change photoContainer -->
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
    <!-- //--------------change photoContainer -->
  </div>
</template>

<script lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted, defineComponent, onBeforeUnmount } from "vue";
import { Store } from "@/piniaStorage/dbPinia";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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
      ChangeUserPhoto.value = !ChangeUserPhoto.value;
    };
    //--------------drag&drop Area-----------------------------
    const isDragOver = ref(false);
    function handleDragEnter() {
      isDragOver.value = true;
    }

    function handleDragLeave() {
      isDragOver.value = false;
    }

    function handleDrop(event: DragEvent) {
      event.preventDefault();
      isDragOver.value = false;
      if (event.dataTransfer?.types?.includes("Files")) {
        const files = Array.from(event.dataTransfer?.files) as File[];
        onFileChange(files);
      }
    }
    //--------------drag&drop Area-------------------------------------------

    // Modal of loading IMG------------------------------------------------------
    let onFileChange = (event: any) => {
      let fileInput = event.target.files[0];
      let file = event[0];
      if (file || fileInput) {
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
        reader.readAsDataURL(file || fileInput);
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
            // switch (snapshot.state) {
            //   case "paused":
            //     console.log("Upload is paused");
            //     break;
            //   case "running":
            //     console.log("Upload is running");
            //     break;
            // }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              store.$state.userPhotoAcc = downloadURL as string;
            });
            closeModal();
          }
        );
      });
    };
    // Modal of loading IMG------------------------------------------------------

    onMounted(() => {
      document.addEventListener("scroll", checkScroll);
      getUserAvatar(UserGenderPhoto, store);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          UserUid = user.uid;
        } else {
        }
      });
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
.mainContentUserPage{
  display: grid;
}
</style>
