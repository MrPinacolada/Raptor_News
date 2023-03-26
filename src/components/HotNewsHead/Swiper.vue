<template>
  <div class="SwiperContainer">
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :loop="true"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false
      }"
      :modules="modules"
      class="newsSwiper"
    >
      <div class="loadIMG" v-if="!loaderIMG">
        <div class="loader-wheel"></div>
      </div>
      <swiper-slide v-for="slide in slideDataIMG" class="animate__animated animate__fadeIn">
        <div v-if="loaderIMG">
          <img id="myimg" :src="slide.img" />
        </div>

        <p>{{ slide.text }}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper'
import { doc, getDoc } from 'firebase/firestore'
import { getDownloadURL, listAll } from 'firebase/storage'
import { ref as fireRef } from 'firebase/storage'
import { RaptorNewsStorage, RaptorNewsStore } from '@/firebase/config'
import SwiperCore from 'swiper'
import '@SwiperBundleCss'
import 'swiper/css/bundle'
import 'animate.css'
import { Store } from '@/Main.vue'
SwiperCore.use([Pagination])

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    Store.foo = !Store.foo
    let slideDataIMG = ref([] as any)
    const loaderIMG = ref(false)
    const listRef = fireRef(RaptorNewsStorage, '/News_Slider')
    const loadIMG = async () => {
      try {
        await listAll(listRef)
          .then((res) => {
            res.items.forEach((itemRef) => {
              getDownloadURL(fireRef(RaptorNewsStorage, 'News_Slider/' + itemRef.name))
                .then(async (url) => {
                  const docRef = doc(RaptorNewsStore, 'Slider_text', itemRef.name)
                  const docSnap = await getDoc(docRef)
                  let key = await docSnap.data()?.data.key
                  let text = await docSnap.data()?.data.Topic
                  let fillSlide = (key = text ? text : undefined)
                  await slideDataIMG.value.push({ img: url, text: fillSlide })
                  // let data = {data:{Topic:'', key:itemRef.name}}
                  // await setDoc(doc(RaptorNewsStore, "Slider_text", itemRef.name), data);
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
    loadIMG()
    onMounted(() => {})
    return { modules: [Pagination, Autoplay], slideDataIMG, loaderIMG }
  }
})
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
