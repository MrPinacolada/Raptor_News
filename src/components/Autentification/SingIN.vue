<template></template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import { load_ONE_IMG } from "@/firebase/config";
export default defineComponent({
  setup() {
    let SingIN = ref(false);

    return { SingIN };
  },
});
</script>

<style scoped></style>
