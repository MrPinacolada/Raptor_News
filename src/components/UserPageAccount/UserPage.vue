<template>
  <div class="accountContainer">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime amet
      laudantium, expedita harum architecto voluptatum. Deserunt esse porro eius
      eveniet.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { Store } from "@/piniaStorage/dbPinia";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default defineComponent({
  setup() {
    let auth;
    let UserUid;
    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          UserUid = user.uid;
        } else {
        }
      });
    });
    return {};
  },
});
</script>

<style scoped></style>
