<template>
  <div class="otherNewsBlock">
    <div class="newsitem" v-for="art in titlesToRender">
      <picture>
        <p class="timeline">{{ art.tag }}</p>
        <img :id="art.id + 'restNews'" src="" alt=""
      /></picture>
      <article>
        <p>{{ art.title }}</p>
        <p>{{ art.subtitle }}</p>
      </article>
    </div>
    <button class="loadMoreButt" @click="LoadMoreTitels">Load more...</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";

export default defineComponent({
  setup() {
    const store = Store();
    let AllTitles = [
      ...store.$state.PoliticARTS,
      ...store.$state.SportARTS,
      ...store.$state.WeatherARTS,
      ...store.$state.OpinionARTS,
      ...store.$state.GamesARTS,
      ...store.$state.BusinessARTS,
      ...store.$state.LifeStyleARTS,
    ].sort(() => Math.random() - 0.5);
    let lenghtToRender = ref(9);
    let titlesToRender = ref(AllTitles.slice(0, lenghtToRender.value));
    titlesToRender.value.forEach((item: any) => {
      load_ONE_IMG(item.path, item.id + "restNews", item.loaderID);
    });
    let LoadMoreTitels = () => {
      lenghtToRender.value = lenghtToRender.value + 6;
      titlesToRender.value = AllTitles.slice(0, lenghtToRender.value);
      titlesToRender.value.forEach((item: any) => {
        load_ONE_IMG(item.path, item.id + "restNews", item.loaderID);
      });
    };

    return { titlesToRender, LoadMoreTitels };
  },
});
</script>

<style scoped>
.otherNewsBlock {
  display: grid;
  height: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column: span 2;
  align-items: center;
  justify-items: center;
  row-gap: 20px;
  margin-top: 40px;
  /* column-gap: 10px; */
  /* margin-left: 50px; */
  /* margin-right: 50px; */
}
.newsitem {
  background-color: #fff;
  width: 350px;
  /* height: 260px; */
  display: grid;
  grid-template-rows: 1fr 0.5fr;
  box-shadow: 0 0 14px 0px rgba(0, 0, 0, 0.05);
  position: relative;
  border-radius: 7px;
}

img {
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
}
article {
  /* border-top: 1px rgb(100, 146, 210, 0.3) solid; */
  text-align: left;
}
p {
  margin: 10px auto;
  padding: 8px;
}
.timeline {
  position: absolute;
  margin: 0;
  padding: 5px;
  z-index: 10;
  color: #fff;
  border-top-left-radius: 7px;
  background-color: rgb(65, 65, 65, 0.8);
}
picture {
  position: relative;
  width: 350px;
}
</style>
