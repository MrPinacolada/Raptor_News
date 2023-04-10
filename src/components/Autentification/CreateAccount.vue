<template>
  <div v-if="store.$state.CreateAccount" class="CreateAccountContainer">
    <form @submit.prevent>
      <div
        class="ChooseURplace"
        v-if="(asUser || asEditor) != true && !AuthSucces"
      >
        <span class="animatedText" @click="asUser = true">I'm a new User</span>
        <br />
        <span class="animatedText" @click="asEditor = true">I'm an Editor</span>
      </div>
      <div class="HandleSucces" v-if="AuthSucces"></div>

      <div class="userForm" v-if="asUser && !AuthSucces">
        <label>User name:</label>
        <input required type="text" v-model="userName" />
        <label>Email:</label>
        <input
          placeholder="example@example.com"
          type="email"
          required
          v-model="email"
        />
        <label>Password:</label>
        <input type="password" required v-model="password" />
        <p v-if="errorPassword">{{ errorPassword }}</p>
        <label>Repeat password:</label>
        <input type="password" required v-model="repeatPassword" />
        <p v-if="errorRepeatPassword">{{ errorRepeatPassword }}</p>
        <div class="terms">
          <input type="checkbox" class="checkbox" required />
          <label>Accept terms and conditions</label>
        </div>
        <button type="submit" class="submButt" @click="handleSubmitUser">
          <span class="submSpan">Create Account</span>
        </button>
      </div>
      <div class="editorForm" v-if="asEditor && !AuthSucces">
        <label>User name:</label>
        <input required type="text" v-model="userName" />
        <label>Email:</label>
        <input
          placeholder="example@example.com"
          v-model="email"
          type="email"
          required
        />
        <label>Password:</label>
        <input type="password" required v-model="password" />
        <p v-if="errorPassword">{{ errorPassword }}</p>

        <label>Repeat password:</label>
        <input type="password" required v-model="repeatPassword" />
        <p v-if="errorRepeatPassword">{{ errorRepeatPassword }}</p>

        <label>Personal code:</label>
        <input type="text" required v-model="editorCode" />
        <button type="submit" class="submButt" @click="handleSubmitEditor">
          <span class="submSpan">Create Account</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default defineComponent({
  setup() {
    const auth = getAuth();
    let store = Store();
    let asUser = ref(false);
    let asEditor = ref(false);
    let password = ref();
    let repeatPassword = ref();
    let email = ref();
    let userName = ref();
    let editorCode = ref();
    let errorPassword = ref();
    let errorRepeatPassword = ref();
    let AuthSucces = ref(false);
    let AuthError = ref(false);
    let HandleSucces = () => {
      AuthSucces.value = true;
      setTimeout(() => {
        AuthSucces.value = false;
        store.$state.CreateAccount = false;
        location.reload();
      }, 2000);
    };
    let checkRepeatedChars = (str: any) => {
      for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) !== i) {
          return true;
        }
      }
      return false;
    };

    watch(password, () => {
      errorPassword.value =
        password.value.length < 8
          ? "Your password must have at least 8 symbols"
          : checkRepeatedChars(password.value)
          ? "We found repeated symbols in your password. Please, change that."
          : "";
    });
    watch(repeatPassword, () => {
      errorRepeatPassword.value =
        password.value != repeatPassword.value
          ? "Your passwords are not equal"
          : "";
    });
    let handleSubmitUser = () => {
      if (asUser.value) {
        if (!errorPassword.value && !errorRepeatPassword.value) {
          createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
              const user = userCredential.user;
              HandleSucces();
            })
            .catch((error) => {
              AuthSucces.value = false;
              AuthError.value = true;
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        }
      }
    };

    let handleSubmitEditor = () => {};
    return {
      store,
      asUser,
      asEditor,
      password,
      repeatPassword,
      email,
      userName,
      editorCode,
      errorPassword,
      errorRepeatPassword,
      handleSubmitEditor,
      handleSubmitUser,
      AuthSucces,
      AuthError,
    };
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
.animatedText {
  color: #aaa;
  text-transform: uppercase;
  margin: 25px 0px 15px;
  font-size: 40px;
  display: inline-block;
  cursor: pointer;
  height: 100%;
  display: block;
  z-index: 20;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-weight: normal;
  width: 100%;
  text-align: center;
  background: linear-gradient(
    -45deg,
    #4bc0c8 25%,
    #feac5e 25%,
    #feac5e 50%,
    #4bc0c8 50%,
    #4bc0c8 75%,
    #feac5e 75%,
    #feac5e
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 20px 20px;
  background-position: 0 0;
  animation: stripes 1s linear infinite;
}
@keyframes stripes {
  100% {
    background-position: 20px 0, 20px 0, 20px 0;
  }
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
.checkbox {
  display: inline-block;
  margin: 0px 10px 0px;
  width: 16px;
  position: relative;
  top: 2px;
}
.ChooseURplace {
  display: grid;
  align-items: center;
  justify-items: center;
  margin: -40px;
}
p {
  color: rgba(231, 9, 9, 0.49);
  font-size: 10px;
  margin: 0;
  padding: 0;
}

.submButt {
  position: relative;
  top: 20px;
  outline: none;
  text-decoration: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0px auto;
  text-transform: uppercase;
  height: 50px;
  width: 190px;
  opacity: 1;
  background-color: #ffffff;
  border: 1px solid rgba(22, 76, 167, 0.6);
}
.submButt .submSpan {
  color: #164ca7;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.7px;
}
.submButt:hover {
  animation: rotate 0.7s ease-in-out both;
}
.submButt:hover .submSpan {
  animation: storm 0.7s ease-in-out both;
  animation-delay: 0.06s;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
  25% {
    transform: rotate(3deg) translate3d(0, 0, 0);
  }
  50% {
    transform: rotate(-3deg) translate3d(0, 0, 0);
  }
  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }
  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}

@keyframes storm {
  0% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }
  25% {
    transform: translate3d(4px, 0, 0) translateZ(0);
  }
  50% {
    transform: translate3d(-3px, 0, 0) translateZ(0);
  }
  75% {
    transform: translate3d(2px, 0, 0) translateZ(0);
  }
  100% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }
}
.HandleSucces {
  width: 400px;
  height: 200px;
  background-color: red;
}
</style>
