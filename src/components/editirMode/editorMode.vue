<template>
  <div class="editorModeContainer" v-if="store.$state.editorModeOn">
    <button class="editorButt" @click="ShowAllTitles">Change current</button>
    <form
      class="animate__animated"
      :class="{
        animate__backInLeft: handleVisible,
        animate__backOutRight: ExitAnimation,
      }"
      v-if="handleVisible"
    >
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
          @mouseenter="[loadIMG(art.path, art.id, art.loaderID)]"
          @mouseleave="showIMG[art.id] = false"
        >
          <img src="" alt="" :id="art.id" v-show="showIMG[art.id]" />
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
import { defineComponent, ref, watch, reactive } from "vue";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
import { RaptorNewsStore } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
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
    let GetTopics = doc(RaptorNewsStore, "Editor_mode", "Topics");
    let handleVisible = ref(false);
    let articles = ref();
    let lenghtToRender = 4;
    let titlesToRender = ref();
    let showIMG: any = ref({});
    let ExitAnimation = ref(false);
    let RefreshPosition = () => {
      emit("RefreshPosition");
      HandleCloseForm();
    };
    let loadIMG = async (path: any, id: any, loader: any) => {
      await load_ONE_IMG(path, id, loader);
      showIMG.value[id] = true;
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
      if (handleVisible.value) {
        ExitAnimation.value = true;
        setTimeout(() => {
          ExitAnimation.value = false;
          handleVisible.value = !handleVisible.value;
        }, 500);
      } else handleVisible.value = !handleVisible.value;
    };
    let HandleCloseForm = () => {
      ExitAnimation.value = true;
      setTimeout(() => {
        ExitAnimation.value = false;
        handleVisible.value = false;
      }, 500);
    };
    return {
      ExitAnimation,
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
  position: absolute;
  display: grid;
  height: fit-content;
  max-width: 720px;
  height: auto;
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
  left: 394px;
  height: 30px !important;
  top: 6px;
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
  transition: transform 0.5s;
  transform: rotate(0deg);
}
.choiseButt:hover {
  transform: rotate(360deg);
}
</style>
