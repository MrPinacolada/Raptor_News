<template>
  <div class="weeklyIMG">
    <article class="dailyPicture">
      <p>News of the week</p>
      <span></span>
    </article>
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :modules="modules"
    >
      <div id="loaderimg" v-show="!loaderIMG">
        <span id="loader"></span>
      </div>
      <swiper-slide
        v-for="(slide, index) in TopNewsSlider"
        class="animate__animated animate__fadeIn"
      >
        <div
          @mouseenter="onSlideChange(index)"
          @mouseleave="ShowPlayer = !ShowPlayer"
        >
          <span class="TagSpan">{{ slide.tag }}</span>
          <img :id="slide.id + 'bodySwiper'" />
          <div class="YTplayer" v-if="ShowPlayer && currentIndexSlide == index">
            <lite-youtube
              params="controls=0&enablejsapi=1$disablekb=1&iv_load_policy=3&modestbranding=1&cc_load_policy=1&"
              :videoid="slide.YTid"
            ></lite-youtube>
          </div>
        </div>

        <p>{{ slide.title }}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
import "@justinribeiro/lite-youtube";
import "@SwiperBundleCss";
import "swiper/css/bundle";
export default defineComponent({
  components: { Swiper, SwiperSlide },
  setup() {
    const store = Store();
    let ShowPlayer = ref(false);
    let TopNewsSlider = ref([] as any);
    let currentIndexSlide = ref();
    let onSlideChange = (index: any) => {
      currentIndexSlide.value = index;
      ShowPlayer.value = !ShowPlayer.value;
    };
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
              chosenArt.id + "bodySwiper",
              chosenArt.loaderID
            );
            TopNewsSlider.value.push({ ...chosenArt });
            loaderIMG.value = true;
          }
        }
      });
    };
    const loaderIMG = ref(false);
    FillSliderArray(
      store,
      "PoliticARTS",
      store.$state.BodySwiperTitles.Politics
    );
    // FillSliderArray(store, "SportARTS", SportTitles);
    // FillSliderArray(store, "WeatherARTS", Weather);
    FillSliderArray(
      store,
      "OpinionARTS",
      store.$state.BodySwiperTitles.Opinion
    );
    // FillSliderArray(store, "BusinesARTS", Busines);
    FillSliderArray(
      store,
      "LifeStyleARTS",
      store.$state.BodySwiperTitles.LifeStyle
    );
    // FillSliderArray(store, "GamesARTS", Games);
    return {
      modules: [Pagination, Autoplay],
      loaderIMG,
      TopNewsSlider,
      ShowPlayer,
      currentIndexSlide,
      onSlideChange,
    };
  },
});
</script>

<style scoped>
lite-youtube {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  border-radius: 3px;
  border: none;
  z-index: 5;
}

.weeklyIMG {
  display: grid;
  gap: 20px;
  justify-items: center;
  grid-template-rows: 0.1fr 1fr;
  gap: 30px;
  align-items: center;
  width: 900px;
  height: auto;
}

span {
  margin: 0;
  padding: 0;
  width: 70%;
  height: 3px;
  background: rgba(99, 99, 99, 0.508);
  margin-left: 10px;
}

.swiper {
  margin: 0;
  width: 900px;
  height: 279px;
}

.swiper-slide {
  width: 100%;
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
img {
  max-width: 100%;
  max-height: 100%;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  object-fit: contain;
  /* z-index: 4; */
}

.dailyPicture {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
.dailyPicture > p {
  font-weight: 900;
  font-size: 20px;
}

#loaderimg {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
  position: absolute;
  top: 0;
}
#loader {
  width: 48px;
  height: 48px;
  border: 5px solid rgb(211, 212, 213);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  background: none;
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
  top: 0px;
  left: -10px;
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
  border-top-left-radius: 5px;

}
</style>
