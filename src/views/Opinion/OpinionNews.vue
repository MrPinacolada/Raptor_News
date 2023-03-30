<template>
    <div class="gridContainerOpinion">
    <DailyNewsOpinion  />
    <div class="rightSlideOpinion">
      <RightBarOpinion />
    </div>
    <RestNewsOpinion  />
    <ADS />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import ADS from "@/components/centralBody/ADS.vue";
import DailyNewsOpinion from "./DailyNewsOpinion.vue";
import RestNewsOpinion from "./RestNewsOpinion.vue";
import RightBarOpinion from "./RightBarOpinion.vue";

export default defineComponent({
  components: { DailyNewsOpinion, RestNewsOpinion, RightBarOpinion, ADS },
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
  grid-template-columns: 1fr 0.3fr;
  column-gap: 50px;
  row-gap: 15px;
  background-color: rgb(246, 248, 250);
}
.rightSlideOpinion {
  width: 100%;
  height: 700px;
}
</style>
