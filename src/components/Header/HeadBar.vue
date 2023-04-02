<template>
  <div class="styleline"></div>
  <div class="flexcontainer">
    <RouterLink :to="{ name: 'Home' }">
      <img id="LOGO" src="@/assets/HeadBar/Raptor_News_Network_Logo.webp" alt="Raptor news LOGO"
    /></RouterLink>
    <RouterLink :to="{ name: 'Politics' }">
      <div class="refs forall"><p>Politics</p></div>
    </RouterLink>
    <RouterLink :to="{ name: 'Sport' }">
      <div class="refs forall"><p>Sports</p></div>
    </RouterLink>

    <RouterLink :to="{ name: 'Weather' }">
      <div class="refs forall"><p>Weather</p></div>
    </RouterLink>

    <RouterLink :to="{ name: 'Opinion' }">
      <div class="refs forall"><p>Opinion</p></div>
    </RouterLink>

    <RouterLink :to="{ name: 'Games' }">
      <div class="refs forall"><p>Games</p></div>
    </RouterLink>

    <RouterLink :to="{ name: 'Business' }">
      <div class="refs forall"><p>Business</p></div>
    </RouterLink>

    <RouterLink :to="{ name: 'LifeStyle' }">
      <div class="refs forall"><p>Lifestyle</p></div>
    </RouterLink>

    <div class="buttons">
      <ion-icon name="search-outline"></ion-icon>
      <button class="singin forall">Sing In</button>
      <button class="createacc forall" @click="store.$state.CreateAccount = !store.$state.CreateAccount">Create Account</button>
      
    </div>
  </div>
  <div class="hwrap">
    <div class="hmove">
      <div class="hitem">All text on this resourse is dummy &#128517</div>
      <div class="hitem">All text on this resourse is dummy &#128517</div>
      <div class="hitem">All text on this resourse is dummy &#128517</div>
    </div>
  </div>
  <FiatPriceModule />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import FiatPriceModule from './FiatPriceModule.vue'
import { Store } from "@/piniaStorage/dbPinia";

export default defineComponent({
  components: { FiatPriceModule },
  setup() {
    let store = Store()
    return {store}
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');
.styleline {
  position: sticky;
  width: 100%;
  height: 5px;
  background-color: rgb(194, 96, 5);
}
.flexcontainer {
  display: flex;
  justify-content: space-between;
  align-content: center;
  position: sticky;
  width: 100%;
  height: 50px;
  background-color: rgb(59, 103, 147);
}
#LOGO {
  margin-left: 40px;
  position: relative;
  width: 175px;
  height: 70px;
  cursor: pointer;
}
.refs {
  align-self: center;
  display: inline-block;
  position: relative;
}
.refs::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 0.5px;
  bottom: 0;
  left: 0;
  background-color: #ccc;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.refs:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
ion-icon {
  align-self: center;
  cursor: pointer;
  margin-right: 10px;
  font-size: 25px;
}
ion-icon:hover {
  color: #ccc;
}
.forall {
  font-family: 'PT Sans', sans-serif;
  cursor: pointer;
  color: #ccc;
}
p {
  margin: 0;
}
.buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}
.createacc {
  margin-right: 20px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: rgb(111, 33, 21);
  font-size: 1em;
}
.singin {
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: rgb(17, 43, 69);
  font-size: 1em;
}
.indexbar {
  width: 100%;
  height: 25px;
  background-color: rgb(192, 187, 183);
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 80px;
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: default;
}
.hwrap {
  overflow: hidden;
  background: rgb(111, 33, 21, 0.9);
}
.hmove {
  display: flex;
}
.hitem {
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  text-align: center;
  color: #fff;
  font-weight: 500;
  letter-spacing: 2px;
}

@keyframes tickerh {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(-400%, 0, 0);
  }
}
.hmove {
  animation: tickerh linear 35s infinite;
}
.hmove:hover {
  animation-play-state: paused;
}

a:-webkit-any-link {
  display: flex;
  text-decoration: none;
}
</style>
