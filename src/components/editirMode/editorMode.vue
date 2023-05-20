<template>
  <div class="editorModeContainer" v-if="store.$state.editorModeOn">
    <button class="editorButt" @click="ShowAllTitles">Change current</button>
    <form action="" v-if="handleVisible">
      <img
        id="CloseButt"
        class="CloseButt"
        src="@/assets/AuthAssets/icons8-close.svg"
        @click="HandleCloseForm"
      />
      <label for="">Please, select the topic</label>
      <select required v-model="articles">
        <option :value="store.$state.PoliticARTS">Politic</option>
        <option :value="store.$state.SportARTS">Sport</option>
        <option :value="store.$state.WeatherARTS">Weather</option>
        <option :value="store.$state.OpinionARTS">Opinion</option>
        <option :value="store.$state.BusinessARTS">Busines</option>
        <option :value="store.$state.LifeStyleARTS">LifeStyle</option>
        <option :value="store.$state.GamesARTS">Games</option>
      </select>
      <div class="chooseNewCurrentContainer" v-if="articles">
        <div
          class="currentNewsTag"
          v-for="art in titlesToRender"
          @mouseenter="
            [(showIMG[art.id] = true), loadIMG(art.path, art.id, art.loaderID)]
          "
          @mouseleave="showIMG[art.id] = false"
        >
          <img src="" alt="" :id="art.id" v-if="showIMG[art.id]" />
          <div class="dailyRead">
            <h1>
              {{ art.title }}
            </h1>
            <p>
              {{ art.subtitle }}
            </p>
          </div>
          <span class="choiseButt" @click="handleUploadArt(art.title)"
            >Pick as current</span
          >
        </div>
        <span class="loadRestSpan" @click="LoadMoreTitels"
          >Load the rest...</span
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, reactive } from "vue";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
import { RaptorNewsStore } from "@/firebase/config";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export default defineComponent({
  emits: ["RefreshPosition"],
  props: {
    topic: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    let store = Store();
    let art: any = props.topic;
    let TopicsRef = collection(RaptorNewsStore, "/Editor_mode");
    let GetTopics = doc(RaptorNewsStore, "Editor_mode", "Topics");
    let handleVisible = ref(false);
    let articles = ref();
    let lenghtToRender = 4;
    let titlesToRender = ref();
    let showIMG: any = ref({});
    let RefreshPosition = () => {
      emit("RefreshPosition");
      HandleCloseForm();
    };
    let loadIMG = (path: any, id: any, loader: any) => {
      load_ONE_IMG(path, id, loader);
    };
    let handleUploadArt = async (ArtID: any) => {
      await updateDoc(GetTopics, {
        [art]: ArtID,
      });
      RefreshPosition();
    };
    watch(articles, () => {
      titlesToRender.value = articles.value.slice(0, lenghtToRender);
    });
    let LoadMoreTitels = () => {
      let rem = lenghtToRender;
      lenghtToRender = lenghtToRender + 4;
      titlesToRender.value = articles.value.slice(rem, lenghtToRender);
      if (titlesToRender.value.length == 0) {
        lenghtToRender = 4;
        titlesToRender.value = articles.value.slice(0, lenghtToRender);
      }
    };
    let ShowAllTitles = () => {
      handleVisible.value = !handleVisible.value;
    };
    let HandleCloseForm = () => {
      setTimeout(() => {
        handleVisible.value = false;
      }, 500);
    };
    return {
      store,
      loadIMG,
      showIMG,
      LoadMoreTitels,
      titlesToRender,
      articles,
      HandleCloseForm,
      ShowAllTitles,
      handleVisible,
      handleUploadArt,
    };
  },
});
</script>

<style scoped>
.editorButt {
  display: inline-block;
  padding: 5px 10px;
  background-color: rgb(85, 85, 234);
  color: white;
  text-decoration: none;
  border-radius: 15px;
  transition: background-color 0.3s ease;
}
.editorButt:hover {
  background-color: darkblue;
}
.editorModeContainer {
  display: grid;
  align-items: center;
  justify-items: end;
  margin-right: 15px;
}

.chooseNewCurrentContainer {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
}
.currentNewsTag {
  margin-top: 10px;
  display: grid;
  gap: 10px;
  border: none;
  border-radius: 25px;
  padding: 10px;
  background-color: #ffffff;
  cursor: context-menu;
  position: relative;
}
.dailyRead {
  display: grid;
  gap: 10px;
}
form {
  display: block;
  position: relative;
  display: grid;
  height: fit-content;
  max-width: 720px;
  border: none;
  border-radius: 10px;
  background: whitesmoke;
  text-align: left;
  margin: 30px auto;
  padding: 60px;
  z-index: 21;
  cursor: auto;
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
}
input:focus {
  outline: none;
}
select:focus {
  outline: none;
}
#CloseButt {
  left: 247px;
    height: 30px !important;
    width: 30px !important;
    top: 6px;
    position: absolute;
    cursor: pointer;
}

.loadRestSpan {
  background-color: #ececec;
  border-radius: 10px;
  padding: 15px;
  font-weight: 500;
  cursor: pointer;
  grid-column: span 2;
  justify-self: center;
}
.PopUpIMG {
  position: absolute;
  /* top: -80px; */
  /* left: -200px; */
  /* max-width: 95%; */
  width: 100%;
  height: 100%;
}
img {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 25px;
}
.choiseButt {
  left: 88%;
  position: absolute;
  display: flex;
  width: 40px;
  top: 1%;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: #fff;
  font-size: 9px;
  cursor: pointer;
  text-align: center;
  align-items: center;
}
</style>
