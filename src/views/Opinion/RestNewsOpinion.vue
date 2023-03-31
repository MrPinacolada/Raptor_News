<template>
  <div class="subNewsConteinerOpinion">
    <article class="subTitleOpinion" v-for="art in CurrentArt">
      <picture>
        <RouterLink :to="{ name: 'OpinionArts', params: { id: art.id } }">
          <img :id="art.id" v-show="checkTheLoader" />
        </RouterLink>
        <div :id="art.loaderID" class="loaderwrap" v-show="!checkTheLoader">
          <span class="loader"></span>
        </div>
      </picture>
      <div class="topicOpinion">
        <h1>{{ art.title }}</h1>
        <h3>{{ art.subtitle }}</h3>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
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
    onMounted(() => {
      CurrentArt.value = Store().$state.OpinionARTS.filter((item: any) => {
        if (item.title !== Store().$state.DailyArtOpinionPage) {
          load_ONE_IMG(item.path, item.id, item.loaderID);
        }
        return item.title !== Store().$state.DailyArtOpinionPage;
      });
    });
    return { CurrentArt, checkTheLoader };
  },
});
</script>

<style scoped>
.subNewsConteinerOpinion {
  grid-column: span 2;
  display: grid;
  margin-top: 50px;
  padding: 0;
  row-gap: 5px;
  width: 100%;
  height: 100%;
}
.subTitleOpinion {
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

.topicOpinion {
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
