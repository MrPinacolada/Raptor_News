<template>
  <div class="styleline"></div>
  <div class="flexcontainer">
    <RouterLink :to="{ name: 'Home' }">
      <img
        id="LOGO"
        src="@/assets/HeadBar/Raptor_News_Network_Logo.webp"
        alt="Raptor news LOGO"
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
      <div class="userView" v-if="store.$state.UserUID">
        <img :src="userPhotoAcc" id="userIconIMG" :class="{userPhotoAccBorder50:store.$state.isUserPhotoExists}" @click="openModal" />
      </div>
      <button
        v-if="store.$state.UserUID == undefined"
        class="singin forall"
        id="singINbutt"
        @click="store.$state.SingIN = !store.$state.SingIN"
      >
        Sing In
      </button>
      
      <button
        v-if="store.$state.UserUID == undefined"
        class="createacc forall"
        @click="store.$state.CreateAccount = !store.$state.CreateAccount"
      >
        Create Account
      </button>
      <button
        v-if="store.$state.UserUID"
        class="singOut forall"
        @click="singOutUser"
      >
        Sing Out
      </button>
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
import { defineComponent } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted,watch } from "vue";
import FiatPriceModule from "./FiatPriceModule.vue";
import { Store } from "@/piniaStorage/dbPinia";
import getUserAvatar from "@/composables/getUserAccPhoto";
import singOutUser from "@/composables/singOutUser";



export default defineComponent({
  components: { FiatPriceModule },

  setup(props) {
    let store = Store();
    let router = useRouter();
    let userPhotoAcc = ref(store.$state.userPhotoAcc);
    let openModal = () => {
      store.$state.OpenCloseAccountModalWindow = true;
      router.push({ path: "/account" });
    };
    onMounted(() => {
      if(store.$state.UserUID){
      getUserAvatar(userPhotoAcc,store);

      }
      if (typeof Storage !== undefined) {
        let timeToSingIN = localStorage.getItem("SingIN-Butt-Class");
        let SingINButt = document.getElementById("singINbutt");
        SingINButt?.classList.add(timeToSingIN as string);
      }
    });
    return { store, openModal,userPhotoAcc,singOutUser };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");
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
  content: "";
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
  font-family: "PT Sans", sans-serif;
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
.singOut{
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: rgba(6, 63, 119, 0.807);
  font-size: 1em;
  margin-right: 10px;
}
/* .indexbar {
  width: 100%;
  height: 25px;
  background-color: rgb(192, 187, 183);
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 80px;
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: default;
} */
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
.SingIN-Butt-b4-SingIN {
  animation: heartbeat 1.5s ease-in-out infinite both;
}
@keyframes heartbeat {
  from {
    transform: scale(1);
    transform-origin: center center;
    animation-timing-function: ease-out;
  }
  10% {
    transform: scale(0.91);
    animation-timing-function: ease-in;
  }
  17% {
    transform: scale(0.98);
    animation-timing-function: ease-out;
  }
  33% {
    transform: scale(0.87);
    animation-timing-function: ease-in;
  }
  45% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
}
#userIconIMG {
  width: 35px;
  height: 35px;
  margin-right: 20px;
  margin-top: 3px;
  cursor: pointer;
}
#userIconIMG:hover {
  animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
@keyframes scale-up-center {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}
.userPhotoAccBorder50 {
  border-radius: 50%;
}
</style>
