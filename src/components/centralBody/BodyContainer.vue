<template>
  <div class="gridContainer">
    <UserPage v-if="store.$state.OpenCloseAccountModalWindow && store.$state.UserUID" />
    <DailyNews />
    <div class="rightSide">
      <RightBar />
    </div>
    <Last_previousNews />
    <TopNewsSwiper />
    <ADS />
    <restNEWsBody />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RightBar from "../RightBar/RightBar.vue";
import DailyNews from "./DailyNews.vue";
import Last_previousNews from "./Last_previousNews.vue";
import TopNewsSwiper from "./TopNewsSwiper.vue";
import ADS from "./ADS.vue";
import restNEWsBody from "./restNEWsBody.vue";
import UserPage from "@/components/UserPageAccount/UserPage.vue";
import { Store } from "@/piniaStorage/dbPinia";

export default defineComponent({
  components: {
    RightBar,
    DailyNews,
    Last_previousNews,
    TopNewsSwiper,
    ADS,
    restNEWsBody,
    UserPage,
  },
  setup() {
    let store = Store();
    return { store };
  },
});
</script>

<style scoped>
.gridContainer {
  display: grid;
  margin: 100px auto;
  padding: 0;
  width: 80%;
  height: 100%;
  grid-template-columns: 1fr 0.3fr;
  column-gap: 50px;
  row-gap: 15px;
  background-color: rgb(246, 248, 250);
}
.rightSide {
  grid-area: span 3;
  width: 100%;
  height: 1600px;
}
</style>
