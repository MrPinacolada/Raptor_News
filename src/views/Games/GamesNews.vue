<template>
  <div class="gridContainerOpinion">
    <div class="rightSlideOpinion">
      <RightBarGames />
    </div>
    <DailyNewsGames />
    <ADS />
    <RestNewsGames />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import ADS from "@/components/centralBody/ADS.vue";
import RightBarGames from "./RightBarGames.vue";
import DailyNewsGames from "./DailyNewsGames.vue";
import RestNewsGames from "./RestNewsGames.vue";
export default defineComponent({
  components: { ADS, RightBarGames, DailyNewsGames, RestNewsGames },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.gridContainerOpinion {
  display: grid;
  margin: 100px auto;
  padding: 0;
  width: 80%;
  height: 100%;
  grid-template-columns: 2fr 0.2fr;
  column-gap: 50px;
  row-gap: 15px;
  background-color: rgb(246, 248, 250);
}
.rightSlideOpinion {
  width: 100%;
  height: 500px;
}
</style>
