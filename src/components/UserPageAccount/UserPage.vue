<template>
  <div
    class="accountContainer animate__backInDown animate__animated"
    :class="{ animate__backOutUp: closeModalClass }"
    v-if="store.$state.OpenCloseAccountModalWindow"
  >
    <img
      id="closeUserPage"
      src="@/assets/AuthAssets/icons8-close.svg"
      alt="Close"
      @click="closeModal"
    />
    <div v-show="!ChangeUserPhoto">
      <h3>Hello {{ store.$state.UserName }}!</h3>
      <div class="userSettings">
        <div class="img-wrapper">
          <img
            src="@/assets/UserAcc/ModalWindowAcc/icons8-test-account-48.png"
            alt="Account settings"
          />
          <span class="text">Settings</span>
        </div>

        <div class="img-wrapper">
          <img
            src="@/assets/UserAcc/ModalWindowAcc/icons8-facebook-like-100.png"
            alt="Your liked news"
          />
          <span class="text">Liked news</span>
        </div>

        <div class="img-wrapper">
          <img
            src="@/assets/UserAcc/ModalWindowAcc/icons8-push-notifications-96.png"
            alt="Notifications"
          />
          <span class="text">Notifications</span>
        </div>

        <div class="img-wrapper">
          <img :src="UserGenderPhoto" alt="UserPhoto" @click="ChangeUserPhoto = !ChangeUserPhoto" />
          <span class="text">Change photo</span>
        </div>
      </div>
    </div>
    <div class="changePhoto" v-show="ChangeUserPhoto"><p>Lorem ipsum dolor sit amet.</p></div>
  </div>
</template>

<script lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted, defineComponent, onBeforeUnmount } from "vue";
import { Store } from "@/piniaStorage/dbPinia";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { channel } from "diagnostics_channel";

export default defineComponent({
  setup() {
    let auth;
    let UserUid;
    let UserGenderPhoto = ref();
    let store = Store();
    let router = useRouter();
    let closeModalClass = ref(false);
    let ChangeUserPhoto = ref(false);
    let checkScroll = () => {
      if (window.scrollY >= 600) {
        closeModal();
      }
    };
    let closeModal = () => {
      closeModalClass.value = true;
      setTimeout(() => {
        closeModalClass.value = false;
        store.$state.OpenCloseAccountModalWindow = false;
      }, 500);
      router.push({ path: "/" });
    };
    let isModalOpen = ref(true);
    onMounted(() => {
      store.$state.UserUID = localStorage.getItem("auth-token") as string;
      store.$state.UserName = localStorage.getItem("user-name") as string;
      store.$state.UserGender = localStorage.getItem("gender") as string;
      UserGenderPhoto.value =
        "/src/assets/UserAcc/ModalWindowAcc/" +
        store.$state.UserGender +
        "AccIMG.png";
    });

    onMounted(() => {
      document.addEventListener("scroll", checkScroll);

      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          UserUid = user.uid;
        } else {
        }
      });
      onBeforeUnmount(() => {
        document.removeEventListener("scroll", checkScroll);
      });
    });
    return {
      isModalOpen,
      closeModal,
      store,
      closeModalClass,
      UserGenderPhoto,
      ChangeUserPhoto,
    };
  },
});
</script>

<style scoped>
.accountContainer {
  position: absolute;
  top: 20%;
  left: 30%;
  display: grid;
  align-items: center;
  justify-items: center;
  height: fit-content;
  max-width: 420px;
  border: none;
  border-radius: 10px;
  background: rgb(230, 228, 228);
  margin: 30px auto;
  padding: 50px;
  z-index: 21;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
}
h3 {
  margin-top: -20px;
  text-align: center;
}
.userSettings {
  display: grid;
  align-items: center;
  justify-items: center;
  gap: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.img-wrapper {
  position: relative;
}

img {
  width: 55px;
  height: 55px;
  cursor: pointer;
  transform: scale(1);
  transition: 0.5s;
}

.img-wrapper:hover img {
  transform: scale(1.4);
}

.text {
  font-size: 12px;
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: 0.3s;
  font-weight: bold;
  text-align: center;
}

.img-wrapper:hover .text {
  opacity: 1;
}

#closeUserPage {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 5%;
  left: 90%;
}
.changePhoto{
  
}
</style>
