<template>
  <div class="RightBarContainer">
    <WeatherModule />
    <MostLikedNews />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import WeatherModule from '@/components/RightBar/WeatherModule.vue'
import MostLikedNews from '@/components/RightBar/MostLikedNews.vue'
export default defineComponent({
  components: { WeatherModule,  MostLikedNews },
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
