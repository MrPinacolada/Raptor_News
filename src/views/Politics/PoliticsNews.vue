<template>
  <div class="gridContainerPolitics">
    <DailyNewsPolitics  />
    <div class="rightSlidePolitics">
      <RightBarPolitics />
    </div>
    <RestNewsPolitics  />
    <ADS />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'
import RightBarPolitics from '@/views/Politics/RightBarPolitics.vue'
import DailyNewsPolitics from '@/views/Politics/DailyNewsPolitics.vue'
import TopNewsSwiper from '@/components/centralBody/TopNewsSwiper.vue'
import RestNewsPolitics from './RestNewsPolitics.vue'
import ADS from '@/components/centralBody/ADS.vue'
import PoliticsArts from './Articles/PoliticsArts.vue'
import { load_ONE_IMG } from '@/firebase/config'
import { Store } from '@/piniaStorage/dbPinia'

export default defineComponent({
  components: {
    RightBarPolitics,
    DailyNewsPolitics,
    TopNewsSwiper,
    ADS,
    RestNewsPolitics
  },
  setup() {
    return { }
  }
})
</script>

<style scoped>
.gridContainerPolitics {
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
.rightSlidePolitics {
  width: 100%;
  height: 700px;
}
</style>
