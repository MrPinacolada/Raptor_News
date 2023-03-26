<template>
  <article class="dailyNews">
    <picture class="dailyPhoto">
      <div id="loaderimg"><span class="loader"></span></div>
      <img src="" alt="" id="dailyIMG" />
    </picture>
    <div class="dailyRead">
      <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, voluptatum!</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas totam saepe
        necessitatibus, ipsum recusandae velit quaerat quod quos ratione vitae?
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { load_ONE_IMG } from '@/firebase/config'
import 'animate.css'
export default defineComponent({
  components: {},
  setup() {
    load_ONE_IMG(
      'Daily_News/c2a9-bulent-kilic-broken-border-13-15-june-sanliurfa-turkey-02.webp',
      'dailyIMG',
      'loaderimg'
    )

    return { }
  }
})
</script>

<style scoped>
.centralSide {
  display: grid;
}
.dailyNews {
  display: grid;
  margin: 0;
  padding: 0;
  height: 745px;
  width: 900px;
  background-color: #fff;
}
.dailyPhoto {
  width: 900px;
  height: 600px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  justify-self: center;
}
img {
  max-width: 100%;
  max-height: 100%;
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
</style>
