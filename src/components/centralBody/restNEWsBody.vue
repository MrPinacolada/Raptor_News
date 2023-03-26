<template>
  <div class="otherNewsBlock">
    <div class="newsitem">
      <picture><img src="@/assets/HeadBar/Raptor_News_Network_Logo.webp" alt="" /></picture>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, itaque?</p>
      </article>
    </div>
    <div class="newsitem">
      <picture><img src="@/assets/HeadBar/Raptor_News_Network_Logo.webp" alt="" /></picture>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, itaque?</p>
      </article>
    </div>
    <div class="newsitem">
      <picture><img src="@/assets/HeadBar/Raptor_News_Network_Logo.webp" alt="" /></picture>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, itaque?</p>
      </article>
    </div>
    <div class="newsitem">
      <picture><img src="@/assets/HeadBar/Raptor_News_Network_Logo.webp" alt="" /></picture>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, itaque?</p>
      </article>
    </div>
    <div class="newsitem">
      <picture><img src="@/assets/HeadBar/Raptor_News_Network_Logo.webp" alt="" /></picture>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, itaque?</p>
      </article>
    </div>
    <div class="newsitem">
      <picture><img src="@/assets/HeadBar/Raptor_News_Network_Logo.webp" alt="" /></picture>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, itaque?</p>
      </article>
    </div>
    <div class="newsitem">
      <picture><img src="@/assets/HeadBar/Raptor_News_Network_Logo.webp" alt="" /></picture>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, itaque?</p>
      </article>
    </div>
  </div>
</template>

<scrip lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  setup() {
    return {}
  }
})
</scrip>

<style scoped>
.otherNewsBlock {
  display: grid;
  height: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column: span 2;
  align-items: center;
  justify-items: center;
  row-gap: 20px;
  margin-top: 40px;
  /* column-gap: 10px; */
  /* margin-left: 50px; */
  /* margin-right: 50px; */
}
.newsitem {
  background-color: #fff;
  width: 350px;
  height: 260px;
  display: grid;
  grid-template-rows: 1fr 0.5fr;

  box-shadow: 0 0 14px 0px rgba(0, 0, 0, 0.05);
  position: relative;
}
.newsitem::after {
  content: 'hbibih';
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  background-color: red;
  background-color: rgb(65, 65, 65, 0.8);
  cursor: pointer;
}
img {
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
}
article {
  border-top: 1px rgb(100, 146, 210, 0.3) solid;
  text-align: left;
}
p {
  margin: 10px auto;
  padding: 8px;
}
</style>
