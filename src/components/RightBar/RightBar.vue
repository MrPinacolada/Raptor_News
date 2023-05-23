<template>
  <div class="RightBarContainer">
    <WeatherModule />
    <MostLikedNews />
    <CurrencyPrice />
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
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
