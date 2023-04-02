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
    <button class="button-80" @click="LoadMoreTitels">Load more...</button>
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


.button-80 {
  background: #fff;
  backface-visibility: hidden;
  border-radius: .375rem;
  border-style: solid;
  border-width: .125rem;
  box-sizing: border-box;
  color: #212121;
  cursor: pointer;
  display: inline-block;
  font-family: Circular,Helvetica,sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -.01em;
  line-height: 1.3;
  padding: .875rem 1.125rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  grid-column: span 3;
  justify-self: center;
}

.button-80:not(:disabled):hover {
  transform: scale(1.05);
}

.button-80:not(:disabled):hover:active {
  transform: scale(1.05) translateY(.125rem);
}

.button-80:focus {
  outline: 0 solid transparent;
}

.button-80:focus:before {
  content: "";
  left: calc(-1*.375rem);
  pointer-events: none;
  position: absolute;
  top: calc(-1*.375rem);
  transition: border-radius;
  user-select: none;
}

.button-80:focus:not(:focus-visible) {
  outline: 0 solid transparent;
}

.button-80:focus:not(:focus-visible):before {
  border-width: 0;
}

.button-80:not(:disabled):active {
  transform: translateY(.125rem);
}
</style>
