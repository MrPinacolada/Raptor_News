<template>
  <div
    v-if="store.$state.SingIN"
    class="animate__animated SingINContainer animate__fadeIn"
    :class="{ animate__fadeOut: closeForm }"
  >
    <form
      @submit.prevent
      class="animate__animated animate__backInLeft"
      :class="{ animate__backOutRight: closeForm }"
    >
      <div class="userForm">
        <img
          class="CloseButt"
          src="@/assets/AuthAssets/icons8-close.svg"
          @click="HandleCloseForm"
        />
        <label>Email:</label>
        <input type="email" required v-model="email" />
        <p v-if="errorPassword">{{ errorPassword }}</p>
        <label>Password:</label>
        <input type="password" required v-model="password" />
        <p v-if="errorPassword">{{ errorPassword }}</p>
        <button
          type="submit"
          :class="{ animate__shakeX: AuthError }"
          class="animate__animated login-button"
          @click="handleSingINButt"
        >
          Sing In
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default defineComponent({
  setup() {
    let store = Store();
    let auth = getAuth();
    let closeForm = ref(false);
    let AuthError = ref(false);
    let email = ref();
    let password = ref();
    let errorPassword = ref();
    let HandleCloseForm = () => {
      closeForm.value = true;
      setTimeout(() => {
        closeForm.value = false;
        store.$state.SingIN = false;
      }, 500);
    };
    let handleSingINButt = () => {
      AuthError.value = false;
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          localStorage.setItem("auth-token", userCredential.user.uid as string);
          location.reload();
        })
        .catch((error) => {
          errorPassword.value = "We could not find your account.";
          AuthError.value = true;
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        });
    };

    return {
      AuthError,
      store,
      closeForm,
      HandleCloseForm,
      email,
      password,
      errorPassword,
      handleSingINButt,
    };
  },
});
</script>

<style scoped>
.SingINContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  display: block;
  background-color: rgb(187, 190, 193, 0.6);
  display: grid;
  justify-items: center;
  align-items: center;
}

form {
  display: block;
  position: absolute;
  display: grid;
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
input,
select {
  display: block;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background-color: whitesmoke;
  border-bottom: 1px solid #e2bebe;
  padding: 5px 6px;
}
input:focus {
  outline: none;
}
select:focus {
  outline: none;
}
.CloseButt {
  position: absolute;
  top: 2%;
  left: 92%;
  opacity: 60%;
  cursor: pointer;
}
.checkbox {
  display: inline-block;
  margin: 0px 10px 0px;
  width: 16px;
  position: relative;
  top: 2px;
}
.login-button {
  position: relative;
  top: 30px;
  left: 170px;
  width: 100px;
  height: 30px;
  background-color: #007bff;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.login-button:hover {
  background-color: #0062cc;
}
p {
  position: absolute;
  color: rgba(231, 9, 9, 0.49);
  font-size: 10px;
  margin: 0;
  padding: 0;
}
.userForm {
  margin-top: -20px;
}
</style>
