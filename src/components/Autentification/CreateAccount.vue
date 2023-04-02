<template>
  <div v-if="store.$state.CreateAccount" class="CreateAccountContainer"></div>
  <form>
    <label for="">Fuck you</label>
    <input type="text" />
    <label for="">Fuck you</label>
    <input type="text" />
    <label for="">Fuck you</label>
    <input type="text" />
    <label for="">Fuck you</label>
    <input type="text" />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
export default defineComponent({
  setup() {
    let store = Store();

    return { store };
  },
});
</script>

<style scoped>
.CreateAccountContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  display: block;
  background-color: rgb(187, 190, 193, 0.2);
  
}
form {
  display: block;
  position: absolute;
  display: grid;
  top: 200px;
  left: 50%;
  width: 100%;
  height: fit-content;
  max-width: 420px;
  border: none;
  border-radius: 10px;
  background: whitesmoke;
  text-align: left;
  margin: 30px auto;
  padding: 60px;
  z-index: 21;
}
label {
  color: #aaa;
  text-transform: uppercase;
  margin: 25px 0px 15px;
  display: inline-block;
  font-size: 0.9em;
}
</style>
