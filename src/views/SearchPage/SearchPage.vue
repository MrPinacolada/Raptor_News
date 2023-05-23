<template>
  <div class="searchPageContainer">
    <form>
      <label>Search for:</label>
      <input type="text" required v-model="SearchInput" />
      <div class="searchResponse" v-for="art in (SearchResponse as any)">
        <picture>
          <RouterLink :to="{ name: art.tag + 'Arts', params: { id: art.id } }">
            <img :id="art.id" ref="images" v-show="checkTheLoader" />
          </RouterLink>
          <div :id="art.loaderID" class="loaderwrap" v-show="!checkTheLoader">
            <span class="loader"></span>
          </div>
        </picture>
        <div class="topicPolitics">
          <h1>{{ art.title }}</h1>
          <h3>{{ art.subtitle }}</h3>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
  watch,
  computed,
} from "vue";
import { Store } from "@/piniaStorage/dbPinia";
import { load_ONE_IMG } from "@/firebase/config";

export default defineComponent({
  setup() {
    let store = Store();
    let SearchInput = ref("");
    let SearchResponse = ref([]);
    let checkTheLoader = computed(() => store.$state.TurnOffTheErrorLoaderIMG);
    onMounted(() => {
      let TopicsArr = store.$state.ArraysConcat;
      watch(SearchInput, () => {
        SearchResponse.value =
          SearchInput.value != ""
            ? TopicsArr.filter((art: any) => {
                let searchTerm = SearchInput.value.toLowerCase();
                return (
                  art.title.toLowerCase().includes(searchTerm) ||
                  art.subtitle.toLowerCase().includes(searchTerm)
                );
              })
            : [];
        SearchResponse.value.map((item: any) => {
          load_ONE_IMG(item.path, item.id, item.loaderID);
        });
      });
    });

    return { SearchInput, SearchResponse, checkTheLoader };
  },
});
</script>

<style scoped>
.searchPageContainer {
  height: auto;
  border: none;
  padding: 100px;
  display: grid;
}
form {
  display: block;
  position: absolute;
  display: grid;
  width: 900px;
  height: fit-content;
  border: none;
  border-radius: 10px;
  text-align: left;
  z-index: 21;
  justify-self: center;
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
  background-color: transparent;
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
.searchResponse {
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  width: 100%;
  height: 140px;
  border: 1px rgb(100, 146, 210, 0.3) solid;
  background-color: #fff;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
}
.topicPolitics {
  display: grid;
  margin-left: 20px;
  padding: 10px;
}
h1 {
  font-size: 20px;
}
h3 {
  font-size: 15px;
}
picture {
  position: relative;
  align-self: center;
  margin: 5px;
  border: 3px rgb(246, 248, 250) solid;
}
img {
  object-fit: cover;
  width: 100%;
  height: 120px;
  cursor: pointer;
}
.loaderwrap {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid rgb(211, 212, 213);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
