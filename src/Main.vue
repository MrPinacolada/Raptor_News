<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent, onMounted, ref, onBeforeUnmount, reactive } from 'vue'
import HeadBar from '@/components/Header/HeadBar.vue'
import Swiper from '@/components/HotNewsHead/Swiper.vue'
import BodyContainer from '@/components/centralBody/BodyContainer.vue'
export const Store = reactive({
  foo:false
})

export default defineComponent({
  components: { HeadBar, Swiper, BodyContainer },
  setup() {
    const SCROLLtop = ref()
    let checkScroll = () => {
      SCROLLtop.value = window.scrollY
    }
    let scrolling = () => {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
    onMounted(() => {
      document.addEventListener('scroll', checkScroll)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('scroll', checkScroll)
    })
    return { SCROLLtop, scrolling }
  }
})
</script>

<template>
  <header>
    <HeadBar />
  </header>
  <Swiper />
  <main>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
  <div
    class="animate__animated UpButt"
    :class="{ animate__flipInY: SCROLLtop >= 400, animate__flipOutY: SCROLLtop < 410 }"
    @click="scrolling"
  ></div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&family=Roboto&display=swap');
body {
  margin: 0;
  padding: 0;
  border: none;
  /* overflow-x: hidden; */
  background-color: rgb(246, 248, 250);
  font-family: 'Roboto', sans-serif;
}
.UpButt {
  display: inline-block;
  background-color: rgb(17, 43, 69);
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  transition: background-color 0.3s, opacity 0.5s, visibility 0.5s;
  z-index: 1000;
}
.UpButt::after {
  content: '\f077';
  font-family: FontAwesome;
  font-weight: normal;
  font-style: normal;
  font-size: 2em;
  line-height: 50px;
  color: #fff;
}
.UpButt:hover {
  cursor: pointer;
  background-color: #333;
}
.UpButt:active {
  background-color: #555;
}
a:-webkit-any-link  {
  color: black;
  cursor: pointer;
  text-decoration: none;
}
</style>
