<script lang="ts">
import { RouterView } from "vue-router";
import {
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
  watch,
  computed,
} from "vue";
import SingIn from "@/components/Autentification/SingIN.vue";
import CreateAccount from "@/components/Autentification/CreateAccount.vue";
import HeadBar from "@/components/Header/HeadBar.vue";
import Swiper from "@/components/HotNewsHead/Swiper.vue";
import BodyContainer from "@/components/centralBody/BodyContainer.vue";
import { doc, getDoc, collection } from "firebase/firestore";
import { Store } from "@/piniaStorage/dbPinia";
import { RaptorNewsStore } from "@/firebase/config";
import { getAuth } from "firebase/auth";
import "animate.css";
export default defineComponent({
  components: { HeadBar, Swiper, BodyContainer, SingIn, CreateAccount },
  setup() {
    let store = Store();
    let auth = getAuth();
    let SCROLLtop = ref(200);
    store.$state.ArraysConcat = [
      ...store.$state.GamesARTS,
      ...store.$state.LifeStyleARTS,
      ...store.$state.BusinessARTS,
      ...store.$state.OpinionARTS,
      ...store.$state.WeatherARTS,
      ...store.$state.SportARTS,
      ...store.$state.PoliticARTS,
    ];
    let checkScroll = () => {
      SCROLLtop.value = window.scrollY;
    };
    let scrolling = () => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    };
    store.$state.UserUID = localStorage.getItem("auth-token");
    onMounted(() => {
      document.addEventListener("scroll", checkScroll);
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          store.$state.UserUID = user.uid;
          let Ref = doc(RaptorNewsStore, "Editor_mode", "Editors");
          let querySnapshot = await getDoc(Ref);
          let Editors = await querySnapshot.get("Editors");
          let response = Editors.find((doc: any) => {
            return doc.userUID == user.uid;
          });
          if (response) {
            store.$state.isEditor = true;
          }
        }
      });
    });
    onBeforeUnmount(() => {
      document.removeEventListener("scroll", checkScroll);
    });
    let checkCreateAcc = computed(() => store.$state.CreateAccount) as any;
    let checkSingIN = computed(() => store.$state.SingIN) as any;
    watch([checkCreateAcc, checkSingIN], () => {
      document.body.style.overflowY =
        checkCreateAcc.value || checkSingIN.value
          ? "hidden"
          : !checkCreateAcc.value || !checkSingIN.value
          ? "visible"
          : "visible";
    });
    return { SCROLLtop, scrolling, store };
  },
});
</script>

<template>
  <header>
    <HeadBar />
  </header>
  <!-- <Swiper /> -->
  <main>
    <RouterView />
  </main>
  <div
    class="UpButt animate__animated"
    :class="{
      animate__flipInY: SCROLLtop >= 400,
      animate__flipOutY: SCROLLtop <= 430,
    }"
    @click="scrolling"
  ></div>
  <SingIn />
  <CreateAccount />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans&family=Roboto&display=swap");
.cropper-view-box {
  border-radius: 50% !important;
}
.cropper-face {
  border-radius: 50% !important;
}

body {
  margin: 0;
  padding: 0;
  border: none;
  overflow-x: hidden;
  background-color: rgb(246, 248, 250);
  font-family: "Roboto", sans-serif;
}
.UpButt {
  display: inline-block;
  background-color: rgb(17, 43, 69);
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  transition: background-color 0.3s, opacity 0.5s, visibility 0.5s;
  z-index: 1000;
}
.UpButt::after {
  content: "\f077";
  font-family: FontAwesome;
  font-weight: normal;
  font-style: normal;
  font-size: 2em;
  line-height: 50px;
  color: #fff;
}
.UpButt:hover {
  cursor: pointer;
  background-color: #333;
}
.UpButt:active {
  background-color: #555;
}
a:-webkit-any-link {
  color: black;
  cursor: pointer;
  text-decoration: none;
}
.UpButtOn {
  opacity: 1;
}
</style>
