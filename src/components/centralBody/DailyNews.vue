<template>
  <article class="dailyNews" v-for="art in CurrentArt">
    <picture class="dailyPhoto">
      <div id="loaderimg" v-show="!checkTheLoader">
        <span class="loader"></span>
      </div>
      <RouterLink :to="{ name: art.tag + 'Arts', params: { id: art.id } }">
        <span class="TagSpan">{{ art.tag }}</span>
        <img src="" alt="" :id="art.id" v-show="checkTheLoader" />
      </RouterLink>
      <editorMode :topic="toEditorTopic" @RefreshPosition="uploadTheTopic()" />
    </picture>
    <RouterLink :to="{ name: art.tag + 'Arts', params: { id: art.id } }">
      <div class="dailyRead">
        <h1>
          {{ art.title }}
        </h1>
        <p>
          {{ art.subtitle }}
        </p>
      </div>
    </RouterLink>
    <div class="likesContainer">
      <likesModal :artNumb="CurrentArt" />
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
import likesModal from "../UserPageAccount/likesModal.vue";
import editorMode from "../editirMode/editorMode.vue";
import { RaptorNewsStore } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import "animate.css";
export default defineComponent({
  components: { likesModal, editorMode },
  setup() {
    let store = Store();
    let checkTheLoader = computed(() => store.$state.TurnOffTheErrorLoaderIMG);
    let CurrentArt = ref();
    let GetTopics = doc(RaptorNewsStore, "Editor_mode", "Topics");
    const toEditorTopic = "MajorPageCurrent";
    let currentTitleMajorPage: string;
    let uploadTheTopic = async () => {
      let TopicDoc = await getDoc(GetTopics);
      currentTitleMajorPage = await TopicDoc.get(toEditorTopic);
      CurrentArt.value = store.$state.ArraysConcat.filter((item: any) => {
        return item.title == currentTitleMajorPage;
      });
      CurrentArt.value.map(async (item: any) => {
        load_ONE_IMG(item.path, item.id, item.loaderID);
      });
    };
    onMounted(() => {
      uploadTheTopic();
    });
    return { uploadTheTopic, toEditorTopic, checkTheLoader, CurrentArt };
  },
});
</script>

<style scoped>
picture {
  position: relative;
}
.dailyNews {
  position: relative;
  display: grid;
  margin: 0;
  padding: 0;
  height: 745px;
  width: 900px;
  background-color: #fff;
}
.dailyPhoto {
  width: 900px;
  height: 630px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  justify-self: center;
}
img {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}
.dailyRead {
  margin-top: -15px;
  padding: 10px;
  text-align: left;
  letter-spacing: 0.3px;
  border: 1px rgb(100, 146, 210, 0.5) solid;
}
#loaderimg {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid rgb(211, 212, 213);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
.likesContainer {
  position: absolute;
  display: block;
  top: 96%;
  left: 90%;
}
</style>
