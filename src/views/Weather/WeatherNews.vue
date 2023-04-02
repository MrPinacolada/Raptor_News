<template>
  <div class="gridContainerOpinion">
    <div class="rightSlideOpinion">
      <RightBarWeather />
    </div>
    <DailyNewsWeather />
    <ADS />
    <RestNewsWeather />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import ADS from "@/components/centralBody/ADS.vue";
import RightBarWeather from "./RightBarWeather.vue";
import DailyNewsWeather from "./DailyNewsWeather.vue";
import RestNewsWeather from "./RestNewsWeather.vue";
export default defineComponent({
  components: { ADS, RightBarWeather, DailyNewsWeather, RestNewsWeather },
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
