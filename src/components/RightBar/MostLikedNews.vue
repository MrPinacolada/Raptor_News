<template>
  <div
    class="MostLikedNewsContainer"
    v-if="store.$state.UserUID && likedNewsExists"
  >
    <swiper
      :slidesPerView="1"
      :loop="true"
      :autoplay="{
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :modules="modules"
    >
      <swiper-slide v-for="art in LikedNewsContainer">
        <RouterLink :to="{ name: art.tag + 'Arts', params: { id: art.id } }">
          <div class="likedNews">
            <picture>
              <span class="TagSpan">{{ art.tag }}</span>
              <img :id="art.id + 'LikedNews'" alt="" />
              <span class="LikedSpan">News you liked</span>
            </picture>
            <p>
              {{ art.title }}
            </p>
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { RouterLink } from "vue-router";
import { Store } from "@/piniaStorage/dbPinia";
import {
  addDoc,
  getDocFromCache,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { load_ONE_IMG } from "@/firebase/config";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper";
import "@SwiperBundleCss";
import "swiper/css/bundle";

export default defineComponent({
  components: { Swiper, SwiperSlide },
  setup() {
    let store = Store();
    let FirebaseFunc = getFunctions();
    let LikedNewsContainer = ref([] as any);
    let likedNewsExists = ref(false);
    let topics = [
      store.$state.PoliticARTS,
      store.$state.BusinessARTS,
      store.$state.WeatherARTS,
      store.$state.GamesARTS,
      store.$state.OpinionARTS,
      store.$state.LifeStyleARTS,
      store.$state.SportARTS,
    ];
    let mergeArr = topics.flat();
    const GetLikedUsersNewsFIRESTORE = httpsCallable(
      FirebaseFunc,
      "GetLikedUsersNewsFIRESTORE"
    );
    GetLikedUsersNewsFIRESTORE(store.$state.UserUID as string).then(
      (result) => {
        store.$state.userLikedContainer = result.data;
        store.$state.userLikedContainer.userLiked.map((id: any) => {
          let search = mergeArr.filter((art: any) => {
            return art.id == id.id;
          });
          LikedNewsContainer.value.push(...search);
          if (LikedNewsContainer.value) {
            LikedNewsContainer.value.map((item: any) => {
              load_ONE_IMG(item.path, item.id + "LikedNews", item.loaderID);
            });
            likedNewsExists.value = true
          }else console.log('hi');
        });
      }
    );
    return {
      store,
      LikedNewsContainer,
      modules: [Pagination, Autoplay],
      likedNewsExists,
    };
  },
});
</script>

<style scoped>
.MostLikedNewsContainer {
  display: grid;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  gap: 5px;
  border: 1px rgb(100, 146, 210, 0.3) solid;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.35);
  background-color: rgb(246, 248, 250);
}
.likedNews {
  display: grid;
  align-items: center;
  justify-items: center;
}

picture {
  border-radius: 7px;
  width: 301px;
  height: 201px;
}
picture > img {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  position: relative;
}
.swiper {
  margin: 0;
  width: 300px;
  height: auto;
}
.swiper-slide {
  width: 300px;
  height: auto;
  position: relative;
  text-align: center;
  font-size: 16px;
  background: #fff;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  border-radius: 5px;
}

.swiper-slide > p {
  padding: 10px;
  margin: 0;
}
p {
  text-align: center;
}
.TagSpan {
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  height: fit-content;
  background-color: rgb(65, 65, 65, 0.8);
  cursor: pointer;
  font-size: 15px;
  color: #fff;
  /* border-radius: 3px; */
  padding: 5px;
  display: block;
  z-index: 5;
  border-top-left-radius: 7px;
}
.LikedSpan {
  position: absolute;
  top: 172px;
  left: 0px;
  width: fit-content;
  height: fit-content;
  background-color: rgb(65, 65, 65, 0.8);
  cursor: pointer;
  font-size: 15px;
  color: #fff;
  /* border-radius: 3px; */
  padding: 5px;
  display: block;
  z-index: 5;
  border-bottom-left-radius: 7px;
}
</style>
