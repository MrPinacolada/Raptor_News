<template>
  <div v-for="art in CurrentArt" class="OnePoliticsArt">
    <div class="PublishedDate">
      <p id="ArtTag">{{ art.tag }}</p>
      <p>some date</p>
    </div>
    <div class="hearTitle">
      <h1>{{ art.title }}</h1>
      <h3>{{ art.subtitle }}</h3>
    </div>
    <article>
      <div class="publishedBy">
        <p>Published By</p>
      </div>
      <picture>
        <img src="" alt="" :id="art.id" />
        <div :id="art.loaderID" class="loaderwrap">
          <span class="loader"></span>
        </div>
      </picture>
      <p>
        {{ art.body }}
      </p>
    </article>
    <div class="rightSidePoliticArt">
      <MostLikedNews />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  computed,
} from "vue";
import { RouterLink, useRoute } from "vue-router";
import { load_ONE_IMG } from "@/firebase/config";
import { Store } from "@/piniaStorage/dbPinia";
import MostLikedNews from "@/components/RightBar/MostLikedNews.vue";

export default defineComponent({
  components: { MostLikedNews },
  props: ["id"],
  setup(props) {
    let idWatcher = computed(() => props.id);
    let CurrentArt = ref();
    let renderPage = () => {
      CurrentArt.value = Store().$state.PoliticARTS.filter((art: any) => {
        load_ONE_IMG(art.path, art.id, art.loaderID);
        return art.title.replace(/\s/g, "-") == idWatcher.value;
      });
    };
    watch(idWatcher, () => {
      renderPage();
    });
    onMounted(() => {
      renderPage();
    });
    return { CurrentArt };
  },
});
</script>

<style scoped>
.OnePoliticsArt {
  margin-top: 50px;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 0.3fr;
  margin: 100px auto;
  padding: 0;
  width: 80%;
  height: 100%;
  background-color: rgb(246, 248, 250);
  column-gap: 50px;
}
.hearTitle {
  grid-column: span 2;
  text-align: center;
  margin-bottom: 50px;
}
.publishedBy {
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  padding: 0;
  border-bottom: 1px rgb(0, 51, 102) solid;
  border-top: 1px rgb(0, 51, 102) solid;
  display: block;
}

.PublishedDate {
  border-bottom: 1px rgb(0, 51, 102) solid;
  border-top: 1px rgb(0, 51, 102) solid;
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 10px;
  margin: 0;
  grid-column: span 2;
}
#ArtTag {
  color: rgb(0, 51, 102);
}
h1 {
  margin: 0;
  font-size: 3.5em;
}
h3 {
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 1.5em;
}
p {
  font-size: 19px;
  line-height: 28px;
  font-weight: 400;
}

img {
  width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 2px;
}
picture {
  width: 900px;
  height: 100%;
  margin: 0 auto;
  border-radius: 2px;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.35);
}

.rightSidePoliticArt {
  width: 100%;
  height: fit-content;
}
.breakLineSpan {
  border-top: 5px solid red;
  width: 100%;
  height: 1px;
}
</style>
