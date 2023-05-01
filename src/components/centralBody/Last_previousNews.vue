<template>
  <div class="last_previous_container">
    <article class="last" v-for="art in Current_LAST_Art">
      <div id="loaderimg1" v-show="!checkTheLoader">
        <span class="loader"></span>
      </div>
      <picture>
        <p class="timeline">{{ art.tag }}</p>
        <RouterLink :to="{ name: art.tag + 'Arts', params: { id: art.id } }">
          <img v-show="checkTheLoader" :id="art.id" src="" alt="" />
        </RouterLink>
      </picture>
      <div class="dailyRead">
        <RouterLink :to="{ name: art.tag + 'Arts', params: { id: art.id } }">
          <h3>
            {{ art.title }}
          </h3>
          <p>{{ art.subtitle }}</p>
        </RouterLink>
      </div>
      <div class="likesContainer">
        <likesModal :artNumb="Current_LAST_Art" />
      </div>
    </article>
    <article class="previous" v-for="art in Current_PREVIOUS_Art">
      <div id="loaderimg2" v-show="!checkTheLoader">
        <span class="loader"></span>
      </div>
      <picture>
        <p class="timeline">{{ art.tag }}</p>
        <RouterLink :to="{ name: art.tag + 'Arts', params: { id: art.id } }">
          <img :id="art.id" v-show="checkTheLoader" src="" alt="" />
        </RouterLink>
      </picture>
      <div class="dailyRead">
        <RouterLink :to="{ name: art.tag + 'Arts', params: { id: art.id } }">
          <h3>
            {{ art.title }}
          </h3>
          <p>{{ art.subtitle }}</p>
        </RouterLink>
      </div>
      <div class="likesContainer">
        <likesModal :artNumb="Current_PREVIOUS_Art" />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { defineComponent, ref, computed, onMounted } from "vue";
import { load_ONE_IMG } from "@/firebase/config";
import { Store } from "@/piniaStorage/dbPinia";
import likesModal from "../UserPageAccount/likesModal.vue";

export default defineComponent({
  components: { likesModal },
  setup() {
    let checkTheLoader = computed(
      () => Store().$state.TurnOffTheErrorLoaderIMG
    );
    let Current_PREVIOUS_Art = ref();
    let Current_LAST_Art = ref();
    let current_TITLE_MajorPageLastNews =
      "Drawings offended yet answered jennings perceive laughing six did far";
    let current_TITLE_MajorPagePreviousNews =
      "Too objection for elsewhere her preferred allowance her";
    let Topics = {
      Politic: Store().$state.PoliticARTS,
      Sport: Store().$state.SportARTS,
      Weather: Store().$state.WeatherARTS,
      Opinion: Store().$state.OpinionARTS,
      Busines: Store().$state.BusinessARTS,
      LifeStyle: Store().$state.LifeStyleARTS,
      Games: Store().$state.GamesARTS,
    };
    let current_TOPIC_MajorPageLastNews = Topics.Opinion;
    let current_TOPIC_MajorPagePreviousNews = Topics.Politic;
    Current_LAST_Art.value = current_TOPIC_MajorPageLastNews.filter(
      (item: any) => {
        return item.title == current_TITLE_MajorPageLastNews;
      }
    );
    Current_PREVIOUS_Art.value = current_TOPIC_MajorPagePreviousNews.filter(
      (item: any) => {
        return item.title == current_TITLE_MajorPagePreviousNews;
      }
    );
    onMounted(() => {
      Current_PREVIOUS_Art.value.map((item: any) => {
        load_ONE_IMG(item.path, item.id, item.loaderID);
      });
      Current_LAST_Art.value.map((item: any) => {
        load_ONE_IMG(item.path, item.id, item.loaderID);
      });
    });
    return { Current_PREVIOUS_Art, Current_LAST_Art, checkTheLoader };
  },
});
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
  height: 100%;
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
h3 {
  margin-top: 15px;
}
p {
  margin-bottom: 5px;
  margin-top: 0;
}
.likesContainer {
  position: absolute;
  display: block;
  top: 71%;
  left: 3%;
  z-index: 999999;
}
</style>
