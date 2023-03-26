<template>
  <div class="adsContainer" @mouseenter="ADhover = !ADhover" @mouseleave="ADhover = !ADhover">
    <picture
      ><img v-show="!ADhover" id="ADpicture" src="" alt="ADS_PICTURE" />
      <iframe
        v-if="ADhover"
        width="591"
        height="309"
        :src="YTsets"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      ></iframe>
    </picture>
    <article>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum incidunt nulla ipsa!
        Similique, natus ea.
      </p>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { load_ONE_IMG } from '@/firebase/config'
export default defineComponent({
  components: {},
  setup() {
    let ADhover = ref(false)
    let YTid = 'VGa1imApfdg'
    let YTsets = ref(
      'https://www.youtube.com/embed/' +
        YTid +
        '?controls=1&autoplay=1&mute=1&fs=0&modestbranding=0&rel=0&showinfo=0'
    )
    load_ONE_IMG('/ADS_Module/Home_page/current_ad.jpg', 'ADpicture', 'loaderimg1')
    return { YTsets, ADhover }
  }
})
</script>

<style scoped>
.adsContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  grid-column: span 2;
  border-radius: 10px;
  background-color: rgb(5, 22, 44);
  margin-top: 60px;
}
img {
  max-width: 591px;
  max-height: 309px;
  border-radius: 10px;
  margin: 10px;
}
iframe {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  margin: 10px;
}
p {
  color: #fff;
  font-size: 30px;
  text-align: left;
  font-weight: bold;
  letter-spacing: 3px;
  line-height: 2;
}
</style>
