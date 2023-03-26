<template>
  <div class="RightBarContainer">
    <WeatherModule />
    <CurrencyPrice />
    <MostLikedNews />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import WeatherModule from './WeatherModule.vue'
import CurrencyPrice from './CurrencyPriceModule.vue'
import MostLikedNews from './MostLikedNews.vue'
export default defineComponent({
  components: { WeatherModule, CurrencyPrice, MostLikedNews },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.RightBarContainer {
  width: 300px;
  height: fit-content;
  position: sticky;
  top: 10px;
  display: grid;
  gap: 50px;
}
</style>
