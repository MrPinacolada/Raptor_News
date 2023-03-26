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
        pauseOnMouseEnter: true
      }"
      :modules="modules"
      class="IopnewsSwiper"
    >
      <div class="loadIMG" v-if="!loaderIMG">
        <div class="loader-wheel"></div>
      </div>
      <swiper-slide
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
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper'
import SwiperCore from 'swiper'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getDownloadURL, listAll } from 'firebase/storage'
import { ref as fireRef } from 'firebase/storage'
import { RaptorNewsStorage, RaptorNewsStore } from '@/firebase/config'
// import '@justinribeiro/lite-youtube'
import '@SwiperBundleCss'
import 'swiper/css/bundle'
import 'animate.css'

export default defineComponent({
  components: { Swiper, SwiperSlide },
  setup() {
    let sliderIMG: any = ref([])
    const loaderIMG = ref(false)
    const listRef = fireRef(RaptorNewsStorage, '/Top_News_slider')
    let slideHover = ref(false)
    const loadIMG = async () => {
      try {
        await listAll(listRef)
          .then((res) => {
            res.items.forEach((itemRef) => {
              getDownloadURL(fireRef(RaptorNewsStorage, 'Top_News_slider/' + itemRef.name))
                .then(async (url) => {
                  const docRef = doc(RaptorNewsStore, 'Top_news_slider', itemRef.name)
                  const docSnap = await getDoc(docRef)
                  let key = await docSnap.data()?.data.key
                  let text = await docSnap.data()?.data.Topic
                  let getYTid = await docSnap.data()?.data.YTid
                  let fillSlide = (key = text ? text : undefined)
                  await sliderIMG.value.push({
                    img: url,
                    text: fillSlide,
                    YTid: getYTid,
                    ShowPlayer: false
                  })
                  // let data = {data:{Topic:'', key:itemRef.name, YTid:'123'}}
                  // await setDoc(doc(RaptorNewsStore, "Top_news_slider", itemRef.name), data);
                  // ------ add new img+topics
                  if ((url && fillSlide) != undefined || null || false) {
                    loaderIMG.value = true
                  }
                })
                .catch((error) => {
                  console.log('error: ', error.message)
                  loaderIMG.value = false
                })
            })
          })
          .catch((error) => {
            console.log('error: ', error.message)
            loaderIMG.value = false
          })
      } catch {
        loaderIMG.value = false
      }
    }

    onBeforeMount(() => {})
    onMounted(() => {
      loadIMG()
    })

    return {
      modules: [Pagination, Autoplay],
      sliderIMG,
      loaderIMG,
      slideHover
    }
  }
})
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
  border-radius: 3px;
  animation: shadow-inset-lr 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.swiper-slide > p {
  padding: 10px;
}
img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 2px;
  object-fit: contain;
  z-index: 10;
}

@keyframes shadow-inset-lr {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: -3px 0 7px -3px rgba(0, 0, 0, 0.5), 6px 0 14px -6px rgba(0, 0, 0, 0.5);
  }
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
.loader-wheel {
  animation: spin 1s infinite linear;
  border-left: 4px solid #220404;
  border-radius: 50%;
  height: 50px;
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
.loadIMG {
  width: 100%;
  height: 100%;
  border-radius: 11px;
  z-index: 50;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
}
</style>
