<template>
  <div class="MostLikedNewsContainer">
    <swiper
      :slidesPerView="1"
      :loop="true"
      :autoplay="{
        delay: 500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :modules="modules"
    >
      <swiper-slide v-for="art in LikedNewsContainer">
        <div class="likedNews">
          <picture>
            <img :id="art.id + 'LikedNews'" alt="" />
          </picture>
          <p>
            {{ art.title }}
          </p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
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
          LikedNewsContainer.value.map((item: any) => {
            load_ONE_IMG(item.path, item.id + "LikedNews", item.loaderID);
          });
        });
      }
    );

    return { store, LikedNewsContainer, modules: [Pagination, Autoplay] };
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

/* picture {
  border-radius: 7px;
  max-width: 300px;
  max-height: auto;
} */
picture > img {
  width: 100%;
  height: 100%;
  border-radius: 7px;
}
.swiper {
  margin: 0;
  width: 300px;
  height: auto;
}
.swiper-slide {
  width: 300px;
  height: 100%;
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
</style>
