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
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :modules="modules"
    >
      <!-- <div class="loadIMG" v-if="!loaderIMG">
        <div class="loader-wheel"></div>
      </div> -->
      <!-- <swiper-slide
        v-for="(slide, index) in sliderIMG"
        @mouseenter="slide.ShowPlayer = !slide.ShowPlayer"
        @mouseleave="slide.ShowPlayer = !slide.ShowPlayer"
        class="animate__animated animate__fadeIn"
      >
        <div v-if="loaderIMG">
          <img id="myimg" :src="slide.img" />
          <div class="YTplayer" v-if="slide.ShowPlayer">
            <lite-youtube
              params="controls=0&enablejsapi=1$disablekb=1&iv_load_policy=3&modestbranding=1&cc_load_policy=1&"
              :videoid="slide.YTid"
            ></lite-youtube>
          </div>
        </div>

        <p>{{ slide.text }}</p>
      </swiper-slide> -->
      <div id="loaderimg" v-show="!loaderIMG">
        <span id="loader"></span>
      </div>
      <swiper-slide
        v-for="slide in TopNewsSlider"
        class="animate__animated animate__fadeIn"
      >
        <div>
          <img :id="slide.id" v-show="checkTheLoader" />
          <!-- <div class="YTplayer" v-if="slide.ShowPlayer">
            <lite-youtube
              params="controls=0&enablejsapi=1$disablekb=1&iv_load_policy=3&modestbranding=1&cc_load_policy=1&"
              :videoid="slide.YTid"
            ></lite-youtube>
          </div> -->
        </div>

        <p>{{ slide.title }}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount, computed } from "vue";
import { RouterLink } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper";
import SwiperCore from "swiper";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, listAll } from "firebase/storage";
import { ref as fireRef } from "firebase/storage";
import { RaptorNewsStorage, RaptorNewsStore } from "@/firebase/config";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
import "@justinribeiro/lite-youtube";
import "@SwiperBundleCss";
import "swiper/css/bundle";
import "animate.css";

export default defineComponent({
  components: { Swiper, SwiperSlide },
  setup() {
    const store = Store();
    let TopNewsSlider = ref([] as any);
    let checkTheLoader = computed(
      () => Store().$state.TurnOffTheErrorLoaderIMG
    );
    let PoliticsTitles = [
      "On it differed repeated wandered required in.",
      "Merry alone do it burst me songs.",
    ];
    let SportTitles = [
      "Pleased him another was settled for.",
      "Stanhill on we if vicinity material in.",
    ];
    let Weather = [
      "Parish so enable innate in formed missed.",
      "Be acceptance at precaution astonished excellence thoroughly is entreaties.",
    ];
    let Opinion = [
      "For who thoroughly her boy estimating conviction.",
      "Particular way thoroughly unaffected projection favourable mrs can projecting own.",
    ];
    let Busines = ["Shewing met parties gravity husband sex pleased."];
    let LifeStyle = [
      "Add stairs admire all answer the nearer yet length.",
      "Whole front do of plate heard oh ought. His defective nor convinced residence own.",
      "Mr acuteness we as estimable enjoyment up.",
    ];
    let Games = ["Demesne far hearted suppose venture excited see had has."];
    let FillSliderArray = (
      store: any,
      PiniaTopic: keyof typeof store.$state,
      ChosenTitles: any
    ) => {
      const arts: any = store.$state[PiniaTopic];
      ChosenTitles.forEach((chosentitle: string) => {
        if (arts != undefined || null || false) {
          const chosenArt = arts.find((art: any) => {
            if (art.title === chosentitle) {
              load_ONE_IMG(art.path, art.id, art.loaderID);
            }

            return art.title === chosentitle;
          });
          if (chosenArt) {
            TopNewsSlider.value.push({ ...chosenArt });
            loaderIMG.value = true;
          }
        }
      });
    };
    let sliderIMG: any = ref([]);
    const loaderIMG = ref(false);
    const listRef = fireRef(RaptorNewsStorage, "/Top_News_slider");
    let slideHover = ref(false);
    // const loadIMG = async () => {
    //   try {
    //     await listAll(listRef)
    //       .then((res) => {
    //         res.items.forEach((itemRef) => {
    //           getDownloadURL(
    //             fireRef(RaptorNewsStorage, "Top_News_slider/" + itemRef.name)
    //           )
    //             .then(async (url) => {
    //               const docRef = doc(
    //                 RaptorNewsStore,
    //                 "Top_news_slider",
    //                 itemRef.name
    //               );
    //               const docSnap = await getDoc(docRef);
    //               let key = await docSnap.data()?.data.key;
    //               let text = await docSnap.data()?.data.Topic;
    //               let getYTid = await docSnap.data()?.data.YTid;
    //               let fillSlide = (key = text ? text : undefined);
    //               await sliderIMG.value.push({
    //                 img: url,
    //                 text: fillSlide,
    //                 YTid: getYTid,
    //                 ShowPlayer: false,
    //               });
    //               // let data = {data:{Topic:'', key:itemRef.name, YTid:'123'}}
    //               // await setDoc(doc(RaptorNewsStore, "Top_news_slider", itemRef.name), data);
    //               // ------ add new img+topics
    //               if ((url && fillSlide) != undefined || null || false) {
    //                 loaderIMG.value = true;
    //               }
    //             })
    //             .catch((error) => {
    //               console.log("error: ", error.message);
    //               loaderIMG.value = false;
    //             });
    //         });
    //       })
    //       .catch((error) => {
    //         console.log("error: ", error.message);
    //         loaderIMG.value = false;
    //       });
    //   } catch {
    //     loaderIMG.value = false;
    //   }
    // };

    onBeforeMount(() => {
      FillSliderArray(store, "1PoliticARTS", PoliticsTitles);
      // FillSliderArray(store, "SportARTS", SportTitles);
      // FillSliderArray(store, "WeatherARTS", Weather);
      FillSliderArray(store, "1OpinionARTS", Opinion);
      // FillSliderArray(store, "BusinesARTS", Busines);
      FillSliderArray(store, "1LifeStyleARTS", LifeStyle);
      // FillSliderArray(store, "GamesARTS", Games);
    });
    onMounted(() => {
      // loadIMG();
    });

    return {
      modules: [Pagination, Autoplay],
      sliderIMG,
      loaderIMG,
      slideHover,
      TopNewsSlider,
      checkTheLoader,
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
  height: 10px;
  border-radius: 3px;
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
  z-index: 10;
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
</style>
