<template>
  <div class="subNewsConteiner">
    <article class="subTitle" v-for="art in CurrentArt">
      <picture>
        <RouterLink :to="{ name: 'SportsArts', params: { id: art.id } }">
          <img :id="art.id" ref="images" v-show="checkTheLoader" />
        </RouterLink>
        <div :id="art.loaderID" class="loaderwrap" v-show="!checkTheLoader">
          <span class="loader"></span>
        </div>
      </picture>
      <div class="topic">
        <h1>{{ art.title }}</h1>
        <h3>{{ art.subtitle }}</h3>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";

export default defineComponent({
  components: {},
  setup() {
    let CurrentArt = ref();
    let checkTheLoader = computed(
      () => Store().$state.TurnOffTheErrorLoaderIMG
    );
    CurrentArt.value = Store().$state.SportARTS.filter((item: any) => {
      return item.title !== Store().$state.DailyArtSportsPage;
    });
    CurrentArt.value.forEach((item: any) => {
      load_ONE_IMG(item.path, item.id, item.loaderID);
    });
    return { CurrentArt, checkTheLoader };
  },
});
</script>

<style scoped>
.subNewsConteiner {
  grid-column: span 2;
  display: grid;
  margin-top: 50px;
  padding: 0;
  row-gap: 5px;
  width: 100%;
  height: 100%;
}
.subTitle {
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  width: 100%;
  height: 140px;
  border: 1px rgb(100, 146, 210, 0.3) solid;
  background-color: #fff;
  overflow: hidden;
}
picture {
  position: relative;
  align-self: center;
  margin: 5px;
  border: 3px rgb(246, 248, 250) solid;
}
img {
  object-fit: cover;
  width: 100%;
  height: 120px;
  cursor: pointer;
}

.topic {
  display: grid;
  margin-left: 20px;
}
.loaderwrap {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
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
