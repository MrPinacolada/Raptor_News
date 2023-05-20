<template>
  <div class="editorContainer">
    <span class="stepArrows" v-if="hideFirstModule" @click="backToFIrstModule"
      >PREVIOUS STEP</span
    >
    <span
      v-if="!hideFirstModule"
      :class="{ animate__backOutLeft: changeToBodyTextArea }"
    ></span>
    <article
      v-if="!hideFirstModule"
      class="dailyNews animate__animated"
      :class="{
        animate__backOutLeft: changeToBodyTextArea,
        animate__backInLeft: !changeToBodyTextArea,
      }"
    >
      <picture class="dailyPhoto">
        <span class="TagSpan">
          <label id="topicCh">Choose the topic:</label>
          <select required v-model="NewsTAGS">
            <option value="/PoliticsPage/Politics_articles">Politic</option>
            <option value="/SportsPage/Sports_Articles">Sport</option>
            <option value="/WeatherPage/Weather_Articles">Weather</option>
            <option value="/OpinionPage/Opinion_Articles">Opinion</option>
            <option value="/BusinessPage/Business_Articles">Busines</option>
            <option value="/LifeStylePage/LIfeStyle_Articles">LifeStyle</option>
            <option value="/GamesPage/Games_Articles">Games</option>
          </select>
        </span>
        <div class="changePhoto">
          <img
            id="svgSpace"
            src="@/assets/UserAcc/ModalWindowAcc/space.svg"
            alt=""
            v-if="isloadIMGProcess"
          />

          <div class="loadingProcess" v-if="isloadIMGProcess">
            <span class="loader"></span>
            <p>Process {{ innerLoadProcess.toFixed(0) }}%</p>
          </div>
          <div class="changePhotoContainer">
            <img
              :src="IMGvalue"
              v-if="isPick && !isloadIMGProcess"
              id="artIMG"
            />
          </div>

          <div
            v-if="!isPick"
            @dragover.prevent
            @drop="handleDrop"
            @dragenter="handleDragEnter"
            :class="{ 'drag-over': isDragOver }"
          >
            <label for="imgInput" class="drag-drop-container">
              <input
                id="imgInput"
                type="file"
                ref="inputFile"
                @change="onFileChange"
              />
              <p>Drag and drop files here or click to select files</p>
            </label>
          </div>
        </div>
      </picture>
      <div class="dailyRead">
        <label>Write the major Title:</label>
        <span class="counterSpan" v-if="titleCounter"
          >Chars left: {{ 50 - titleCounter }}</span
        >
        <input
          type="text"
          required
          v-model="title"
          @input="handleCharsInput"
          placeholder="50 chars max"
        />
        <label>Write the SubTitle:</label>
        <span class="counterSpan" v-if="subTitleCounter"
          >Chars left: {{ 70 - subTitleCounter }}</span
        >
        <input
          type="text"
          required
          v-model="subTitle"
          @input="handleCharsInput"
          placeholder="70 chars max"
        />
      </div>
    </article>
    <div
      class="bodyContainer animate__animated"
      :class="{
        animate__backInRight: changeToBodyTextArea,
        animate__backOutRight: goTofirstModule,
      }"
      v-if="changeToBodyTextArea"
    >
      <h3 style="text-align: center">Write the body of article:</h3>

      <textarea v-model="bodyArticle" rows="5" class="notes"></textarea>
    </div>
    <span
      v-if="nextStepApprove && !changeToBodyTextArea"
      @click="fillThebodyTextArea"
      class="stepArrows"
      >NEXT STEP</span
    >
    <span v-if="seePreview" @click="uploadHandle" class="stepArrows"
      >PUBLISH</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { RaptorNewsStore } from "@/firebase/config";
import { Store } from "@/piniaStorage/dbPinia";
import {
  getStorage,
  ref as fireRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import Cropper from "cropperjs";

export default defineComponent({
  components: {},
  setup() {
    let store = Store();
    let storage = getStorage();
    let ArtsRef = collection(RaptorNewsStore, "/Art_db");
    let imgFile: HTMLImageElement;
    let title = ref();
    let subTitle = ref();
    let NewsTAGS = ref();
    let IMGvalue: any = ref(undefined);
    let isDragOver = ref(false);
    let isPick = ref(false);
    let innerLoadProcess = ref();
    let isloadIMGProcess = ref(false);
    let nextStepApprove = ref(false);
    let changeToBodyTextArea = ref(false);
    let hideFirstModule = ref(false);
    let seePreview = ref(false);
    let goTofirstModule = ref(false);
    let bodyArticle = ref();
    let titleCounter = ref();
    let subTitleCounter = ref();
    let fillThebodyTextArea = () => {
      changeToBodyTextArea.value = true;
      setTimeout(() => {
        hideFirstModule.value = true;
      }, 500);
    };
    let handleCharsInput = (event: Event) => {
      if (titleCounter.value >= 50) {
        title.value = title.value.substring(0, 50);
      }

      if (subTitleCounter.value >= 70) {
        subTitle.value = subTitle.value.substring(0, 70);
      }
    };
    let backToFIrstModule = () => {
      goTofirstModule.value = true;
      setTimeout(() => {
        seePreview.value = false;
        goTofirstModule.value = false;
        changeToBodyTextArea.value = false;
        hideFirstModule.value = false;
      }, 500);
    };
    let handleDragEnter = () => {
      isDragOver.value = true;
    };

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
    let onFileChange = (event: any) => {
      let fileInput = event.target?.files[0];
      let fileDragDrop = event[0];
      if (fileDragDrop || fileInput) {
        let reader = new FileReader();
        reader.onload = (e) => {
          IMGvalue.value = e.target?.result;
        };
        reader.onloadend = () => {
          imgFile = document.getElementById("artIMG") as HTMLImageElement;
        };

        isPick.value = true;
        reader.readAsDataURL(fileDragDrop || fileInput);
      }
    };
    let handleFileUpload = async (img: any) => {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = imgFile.naturalWidth;
      canvas.height = imgFile.naturalHeight;
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob: any) => {
        console.log("blob");
        let formData = new FormData();
        formData.append("imgFile", blob as Blob);
        let linkToStorage = `${NewsTAGS.value}/${imgName}`;
        let storageRef = fireRef(storage, linkToStorage);
        let uploadTask = uploadBytesResumable(storageRef, blob as Blob);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            innerLoadProcess.value =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            isloadIMGProcess.value = true;
          },
          (error) => {
            console.log(error);
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
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("done");
                await setDoc(doc(ArtsRef, title.value.replace(/\s/g, "-")), {
                  tag: NewsTAGS.value,
                  title: title.value,
                  id: title.value.replace(/\s/g, "-"),
                  YTid: "jfKfPfyJRdk",
                  path: downloadURL,
                  subtitle: subTitle.value,
                  body: bodyArticle.value,
                });
              }
            );
          }
        );
      });
    };

    let uploadHandle = () => {
      if (
        (imgFile != undefined || null) &&
        (NewsTAGS.value != undefined || null)
      )
        handleFileUpload(imgFile);
    };
    let generateRandomString = (length: number): string => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };
    let imgName = generateRandomString(20);
    watch([title, subTitle, NewsTAGS, IMGvalue], () => {
      titleCounter.value = title.value ? title.value.length : "";
      subTitleCounter.value = subTitle.value ? subTitle.value.length : "";
      if (
        (title.value && subTitle.value && NewsTAGS.value && IMGvalue.value) !=
        undefined
      ) {
        nextStepApprove.value = true;
      } else nextStepApprove.value = false;
    });
    watch(bodyArticle, () => {
      if (bodyArticle.value.length >= 1) {
        seePreview.value = true;
      } else seePreview.value = false;
    });
    return {
      uploadHandle,
      onFileChange,
      handleDrop,
      handleDragLeave,
      handleDragEnter,
      isDragOver,
      IMGvalue,
      store,
      NewsTAGS,
      subTitle,
      title,
      isPick,
      innerLoadProcess,
      isloadIMGProcess,
      nextStepApprove,
      fillThebodyTextArea,
      changeToBodyTextArea,
      hideFirstModule,
      bodyArticle,
      seePreview,
      backToFIrstModule,
      goTofirstModule,
      titleCounter,
      handleCharsInput,
      subTitleCounter,
    };
  },
});
</script>

<style scoped>
.editorContainer {
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  gap: 100px;
  align-items: center;
  justify-items: center;
  align-content: center;
}
.stepArrows {
  font-size: 1.3em;
  font-weight: bold;
  text-shadow: 0 0 18px rgba(0, 0, 0, 0.35);
  letter-spacing: 3px;
  color: #a5a1a1;
  cursor: pointer;
  animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
.dailyNews {
  position: relative;
  display: grid;
  margin: 0;
  padding: 0;
  height: auto;
  width: 900px;
  background-color: #fff;
  margin: 0 auto;
  align-content: center;
  margin-bottom: 15px;
}
.dailyPhoto {
  width: 100%;
  height: 510px;
  margin: 0;
  padding: 0;
}
img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 2px;
}
.dailyRead {
  padding: 10px;
  text-align: left;
  display: grid;
  letter-spacing: 0.3px;
  border: 1px rgb(100, 146, 210, 0.5) solid;
  align-content: center;
  align-items: center;
  justify-items: start;
}

.TagSpan {
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  background-color: rgb(65, 65, 65, 0.8);
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  /* border-radius: 3px; */
  padding: 7px;
  display: block;
  z-index: 5;
  border-top-left-radius: 3px;
}
input,
select {
  display: block;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background-color: whitesmoke;
  border-bottom: 1px solid #e2bebe;
  padding: 5px 6px;
  border-radius: 10px;
}
#imgInput {
  display: block;
  border: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  visibility: hidden;
  margin: 0 auto;
}
input:focus {
  outline: none;
}
label {
  color: #aaa;
  text-transform: uppercase;
  margin: 10px 0px 15px;
  display: inline-block;
  font-size: 0.9em;
}
#topicCh {
  color: #aaa;
  text-transform: uppercase;
  margin: 25px 0px 15px;
  display: inline-block;
  font-size: 0.6em;
}
.changePhoto {
  margin-top: 150px;
}
.changePhotoContainer {
  margin: 0 auto;
  align-self: center;
  height: 510px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  align-content: center;
  width: 100%;
}
.drag-drop-container {
  align-items: center;
  border: 2px dashed #ccc;
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
.bodyContainer {
  display: grid;
}
textarea {
  resize: none !important;
  overflow: auto !important;
  outline: none;
  box-shadow: none !important;
  border-color: #ced4da !important;
}
textarea.notes {
  width: 600px;
  height: 40em;
  line-height: 31px;
  background-image: -webkit-linear-gradient(left, white 0, transparent 0),
    -webkit-linear-gradient(right, white 0, transparent 0),
    -webkit-linear-gradient(white 30px, #ccc 30px, #ccc 31px, white 31px);
  background-repeat: repeat-y;
  background-size: 100% 100%, 100% 100%, 100% 31px;
  background-attachment: local;
}
textarea:hover {
  resize: none !important;
  overflow: auto !important;
  outline: none;
  box-shadow: none !important;
  border-color: #daeafb !important;
}
.counterSpan {
  font-size: 10px;
  color: red;
}
</style>
