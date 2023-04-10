<template>
  <div class="SwiperContainer">
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :modules="modules"
      class="newsSwiper"
    >
      <div class="loadIMG" v-if="!loaderIMG">
        <div class="loader-wheel"></div>
      </div>
      <swiper-slide
        v-for="slide in TopNewsSlider"
        class="animate__animated animate__fadeIn"
      >
        <div v-if="loaderIMG">
          <img :id="slide.id + 'headSwiper'" />
        </div>
        <p>{{ slide.subtitle }}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
import { Pagination, Autoplay } from "swiper";
import SwiperCore from "swiper";
import "@SwiperBundleCss";
import "swiper/css/bundle";
import "animate.css";
SwiperCore.use([Pagination]);

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = Store();
    const loaderIMG = ref(false);
    let TopNewsSlider = ref([] as any);
    let FillSliderArray = (
      store: any,
      PiniaTopic: keyof typeof store.$state,
      ChosenTitles: any
    ) => {
      const arts: any = store.$state[PiniaTopic];
      ChosenTitles.forEach((chosentitle: string) => {
        if (arts != undefined || null || false) {
          const chosenArt = arts.find((art: any) => {
            return art.title === chosentitle;
          });
          if (chosenArt) {
            load_ONE_IMG(
              chosenArt.path,
              chosenArt.id + "headSwiper",
              chosenArt.loaderID
            );
            TopNewsSlider.value.push({ ...chosenArt });
            loaderIMG.value = true;
          }
        }
      });
    };
    FillSliderArray(
      store,
      "PoliticARTS",
      store.$state.HeadSwiperTitles.Politics
    );
    FillSliderArray(store, "SportARTS", store.$state.HeadSwiperTitles.Sport);
    FillSliderArray(
      store,
      "WeatherARTS",
      store.$state.HeadSwiperTitles.Weather
    );
    FillSliderArray(
      store,
      "OpinionARTS",
      store.$state.HeadSwiperTitles.Opinion
    );
    FillSliderArray(
      store,
      "BusinesARTS",
      store.$state.HeadSwiperTitles.Busines
    );
    FillSliderArray(
      store,
      "LifeStyleARTS",
      store.$state.HeadSwiperTitles.LifeStyle
    );
    FillSliderArray(store, "GamesARTS", store.$state.HeadSwiperTitles.Games);
    return {
      modules: [Pagination, Autoplay],
      loaderIMG,
      TopNewsSlider,
    };
  },
});
</script>

<style scoped>
.loadIMG {
  width: 100%;
  height: 100%;
  border-radius: 11px;
}
.SwiperContainer {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
}

.swiper {
  margin-left: 2.5px;
  margin-right: 2.5px;
  margin-top: 3px;
}

.swiper-slide img {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
  object-fit: cover;
  cursor: pointer;
}
.swiper-slide {
  display: grid;
  gap: 15px;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  border-right: 1px solid #a9a9a9;
}
.swiper-slide p {
  align-self: center;
  text-align: left;
  line-height: 20pt;
  margin-right: 10px;
}
.loader-wheel {
  animation: spin 1s infinite linear;
  border-left: 4px solid rgb(17, 43, 69);
  border-radius: 50%;
  height: 50px;
  margin: 50px auto;
  width: 50px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
