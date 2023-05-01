<template>
  <div
    v-if="store.$state.CreateAccount"
    class="animate__animated CreateAccountContainer animate__fadeIn"
    :class="{ animate__fadeOut: closeForm }"
  >
    <form
      @submit.prevent
      class="animate__animated animate__backInLeft"
      :class="{ animate__backOutRight: asUser || asEditor || closeForm }"
    >
      <div class="ChooseURplace">
        <img
          class="CloseButt"
          src="@/assets/AuthAssets/icons8-close.svg"
          @click="HandleCloseForm"
        />
        <span class="animatedText" @click="asUser = true">I'm a new User</span>
        <br />
        <span class="animatedText" @click="asEditor = true">I'm an Editor</span>
      </div>
      <div class="ChooseURplace" v-if="AuthError">
        <span class="animatedText"
          >Something went wrong. Please, refresh the page and try again.</span
        >
      </div>
      <div class="HandleSucces" v-if="AuthSucces">
        <p>Created successfully!</p>
      </div>
    </form>
    <form
      @submit.prevent
      v-if="asUser && !AuthSucces"
      class="animate__animated animate__backInLeft"
      :class="{ animate__shakeX: AuthError, animate__backOutRight: closeForm }"
    >
      <div class="userForm">
        <img
          class="CloseButt"
          src="@/assets/AuthAssets/icons8-close.svg"
          @click="HandleCloseForm"
        />
        <label>User name:</label>
        <input
          required
          type="text"
          v-model="userName"
          placeholder="Bob Bobson"
        />
        <label>I am:</label>
        <select v-model="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="noone">Don't want to say</option>
        </select>
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
    </form>

    <form
      @submit.prevent
      v-if="asEditor && !AuthSucces"
      class="animate__animated animate__backInLeft"
      :class="{ animate__backOutRight: closeForm }"
    >
      <div class="editorForm">
        <img
          class="CloseButt"
          src="@/assets/AuthAssets/icons8-close.svg"
          @click="HandleCloseForm"
        />
        <label>User name:</label>
        <input
          required
          type="text"
          v-model="userName"
          placeholder="Bob Bobson"
        />
        <label>I am:</label>
        <select v-model="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="noone">Another</option>
        </select>
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
        <p v-if="editorCodeError">Your personal code isn't correct</p>
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
import { load_ONE_IMG, RaptorNewsStore } from "@/firebase/config";

import {
  addDoc,
  getDocFromCache,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
} from "firebase/firestore";

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
    let gender = ref();
    let editorCode = ref();
    let editorCodeError = ref(false);
    let errorPassword = ref();
    let errorRepeatPassword = ref();
    let AuthSucces = ref(false);
    let AuthError = ref(false);
    let closeForm = ref(false);
    let HandleCloseForm = () => {
      closeForm.value = true;
      setTimeout(() => {
        closeForm.value = false;
        store.$state.CreateAccount = false;
        asUser.value = false;
        asEditor.value = false;
        AuthSucces.value = false;
        AuthError.value = false;
      }, 500);
    };
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

    watch([password, repeatPassword], () => {
      errorPassword.value =
        password.value.length == 0
          ? " "
          : password.value.length < 8
          ? "Your password must have at least 8 symbols"
          : checkRepeatedChars(password.value)
          ? "We found repeated symbols in your password. Please, change that."
          : "";
      errorRepeatPassword.value =
        password.value.length == 0
          ? " "
          : password.value != repeatPassword.value
          ? "Your passwords are not equally"
          : "";
    });
    let handleSubmitUser = () => {
      if (asUser.value) {
        if (!errorPassword.value && !errorRepeatPassword.value) {
          createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
              if (typeof Storage !== undefined) {
                let userNamesCollection = collection(
                  RaptorNewsStore,
                  "userNames"
                );
                let myDocRef = doc(
                  userNamesCollection,
                  userCredential.user.uid as string
                );
                setDoc(myDocRef, {
                  userName: userName.value as string,
                  gender: gender.value as string,
                });
                localStorage.setItem(
                  "auth-token",
                  userCredential.user.uid as string
                );
                localStorage.setItem(
                  "SingIN-Butt-Class",
                  "SingIN-Butt-b4-SingIN"
                );
              }
            })
            .then(() => {
              HandleSucces();
            })
            .catch((error) => {
              AuthSucces.value = false;
              AuthError.value = true;
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage, errorCode);
            });
        }
      }
    };

    let handleSubmitEditor = async () => {
      if (
        asEditor.value &&
        !errorPassword.value &&
        !errorRepeatPassword.value
      ) {
        let Req = query(collection(RaptorNewsStore, "Editor_mode"));
        let querySnapshot = await getDocs(Req);
        let response = querySnapshot.docs.find((doc) => {
          return doc.data().code == (editorCode.value as string);
        });
        if (response?.data().code != undefined) {
          createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
              if (typeof Storage !== undefined) {
                localStorage.setItem("user-name", userName.value as string);
                localStorage.setItem("isEditor", "true");
                localStorage.setItem("auth-token", userCredential.user.uid);
                localStorage.setItem(
                  "SingIN-Butt-Class",
                  "SingIN-Butt-b4-SingIN"
                );
              }
            })
            .then(() => {
              HandleSucces();
            })
            .catch((error) => {
              AuthSucces.value = false;
              AuthError.value = true;
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        } else editorCodeError.value = true;
      }
    };

    return {
      store,
      asUser,
      asEditor,
      password,
      repeatPassword,
      email,
      userName,
      editorCode,
      editorCodeError,
      errorPassword,
      errorRepeatPassword,
      handleSubmitEditor,
      handleSubmitUser,
      AuthSucces,
      AuthError,
      HandleCloseForm,
      closeForm,
      gender,
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
  border-radius: 10px;

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
  width: 100%;
  height: 100%;
}
.CloseButt {
  position: absolute;
  top: 2%;
  left: 92%;
  opacity: 60%;
  cursor: pointer;
}


</style>
