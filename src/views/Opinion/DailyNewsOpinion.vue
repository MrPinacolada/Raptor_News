<template>
  <article class="dailyNewsOpinion" v-for="art in ArtToRender">
    <picture class="dailyPhotoOpinion">
      <div :id="art.loaderID" class="loaderwrap" v-show="!checkTheLoader">
        <span class="loader"></span>
      </div>
      <RouterLink :to="{ name: 'OpinionArts', params: { id: art.id } }">
        <img src="" alt="" :id="art.id" v-show="checkTheLoader" />
      </RouterLink>
    </picture>
    <div class="dailyReadPolitics">
      <RouterLink :to="{ name: 'OpinionArts', params: { id: art.id } }">
        <h1>{{ art.title }}</h1>
      </RouterLink>
      <p>
        {{ art.subtitle }}
      </p>
    </div>
    <div class="likesContainer">
      <likesModal :artNumb="ArtToRender" />
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed, ref, defineEmits, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
import likesModal from "@/components/UserPageAccount/likesModal.vue";
import "animate.css";
export default defineComponent({
  components: { likesModal },
  setup() {
    let checkTheLoader = computed(
      () => Store().$state.TurnOffTheErrorLoaderIMG
    );
    let ArtToRender = ref(
      Store().$state.OpinionARTS.filter((art: any) => {
        if (art.title == Store().$state.DailyArtOpinionPage) {
          load_ONE_IMG(art.path, art.id, art.loaderID);
        }
        return art.title == Store().$state.DailyArtOpinionPage;
      })
    );
    return { ArtToRender, checkTheLoader };
  },
});
</script>

<style scoped>
.dailyNewsOpinion {
  display: grid;
  margin: 0;
  padding: 0;
  height: fit-content;
  width: 900px;
  background-color: #fff;
  position: relative;
}
.dailyNewsOpinion::after {
  content: "Opinion";
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  background-color: rgb(65, 65, 65, 0.8);
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  border-radius: 3px;
}
.dailyPhotoOpinion {
  width: 900px;
  height: 600px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  justify-self: center;
  position: relative;
}
img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 2px;
}
.loaderwrap {
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
.dailyReadPolitics {
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
.likesContainer {
  position: absolute;
  display: block;
  top: 96%;
  left: 90%;
}
</style>
