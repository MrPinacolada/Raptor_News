<template>
  <div class="MostLikedNewsContainer">MostLikedNewsContainer</div>
</template>

<script lang="ts">
import { list } from '@firebase/storage'
import { defineComponent, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>
.MostLikedNewsContainer {
  display: grid;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  gap: 5px;
  border: 1px rgb(100, 146, 210, 0.3) solid;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.35);
  background-color: rgb(246, 248, 250);

}
</style>
