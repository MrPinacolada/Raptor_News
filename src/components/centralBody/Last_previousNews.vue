<template>
  <div class="last_previous_container">
    <article class="last">
      <div id="loaderimg1"><span class="loader"></span></div>
      <picture>
        <p class="timeline">Yesterday</p>
        <img id="lastIMG" src="" alt=""
      /></picture>
      <div class="dailyRead">
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, fugiat?</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
    </article>
    <article class="previous">
      <div id="loaderimg2"><span class="loader"></span></div>
      <picture>
        <p class="timeline">07.03.2023</p>

        <img id="previousIMG" src="" alt="" />
      </picture>
      <div class="dailyRead">
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, et?</h3>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent, ref } from 'vue'
import { load_ONE_IMG } from '@/firebase/config'

export default defineComponent({
  components: {},
  setup() {
    load_ONE_IMG(
      'Daily_News/previous/spt-0306-af-Beld-Craner-runner-up-3-960x720.webp',
      'previousIMG',
      'loaderimg1'
    )
    load_ONE_IMG(
      'Daily_News/last/loc-0306-cs-Pancake-breakfast-benefit-2-960x720.webp',
      'lastIMG',
      'loaderimg2'
    )

    return {}
  }
})
</script>

<style scoped>
.last_previous_container {
  width: 900px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.last {
  position: relative;
  display: grid;
  background-color: #fff;
}
.previous {
  position: relative;
  display: grid;
  background-color: #fff;
}
picture {
  width: 440px;
  height: 330px;
}
.dailyRead {
  padding: 10px;
  text-align: left;
  letter-spacing: 0.3px;
  border-bottom: 1px rgb(100, 146, 210, 0.5) solid;
  border-left: 1px rgb(100, 146, 210, 0.5) solid;
  border-right: 1px rgb(100, 146, 210, 0.5) solid;
  align-self: flex-start;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 2px;
}

#loaderimg1 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 2;
}
#loaderimg2 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 2;
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
.timeline {
  position: absolute;
  margin: 0;
  padding: 10px;
  z-index: 10;
  color: #fff;
  background-color: rgb(65, 65, 65, 0.8);
}
h3{
  margin-top: 10px;
}
p{
  margin-bottom: 5px;
  margin-top: 0;
}
</style>
