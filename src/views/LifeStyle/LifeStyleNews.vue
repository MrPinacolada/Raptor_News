<template>
  <div class="gridContainerOpinion">
    <DailyNewsLifeStyle />
    <div class="rightSlideOpinion">
      <RightBarLifeStyle />
    </div>
    <RestNewsLifeStyle />
    <ADS />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import DailyNewsLifeStyle from "@/views/LifeStyle/DailyNewsLifeStyle.vue";
import RestNewsLifeStyle from "./RestNewsLifeStyle.vue";
import ADS from "@/components/centralBody/ADS.vue";
import RightBarLifeStyle from "./RightBarLifeStyle.vue";
export default defineComponent({
  components: { DailyNewsLifeStyle, RestNewsLifeStyle, RightBarLifeStyle,ADS },
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
