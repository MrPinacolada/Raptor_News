<template>
  <article class="fiatPriceContainer">
    <div class="ifERROR" v-if="!error">
      <div class="indexes" v-for="index in indexes">
        <p id="indexSymbol">{{ index?.symbol }}</p>
        <p id="IndexPrice">{{ index?.price.toFixed(2) }}</p>
        <p
          :class="{
            DownRed: index?.changesPercentage.toString().includes('-'),
            UpGreen: !index?.changesPercentage.toString().includes('-'),
          }"
        >
          {{ index?.changesPercentage.toFixed(2) }}
        </p>
      </div>
    </div>
    <span v-else class="loaderfull"></span>
  </article>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ref, onMounted } from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    const error = ref(true);
    const indexes = ref();
    let IndexRequests = "AAPL,META,MSFT,AMZN,TSLA,PEP,BAC,KO";
    let GetCurrentCryptoIndex = async () => {
      try {
        await axios(
          "https://financialmodelingprep.com/api/v3/quote/" + IndexRequests,
          {
            headers: {
              Accept: "application/json",
            },
            params: {
              apikey: import.meta.env.VITE_FIAT_API_INDEX,
            },
          }
        )
          .then(async (res: any) => {
            indexes.value = await res.data;
            error.value =
              indexes.value != undefined || false || null ? false : true;
          })
          .catch(() => {
            error.value = true;
          });
      } catch {
        error.value = true;
      }
    };
    onMounted(() => {
      GetCurrentCryptoIndex();
    });
    return { indexes, error };
  },
});
</script>

<style scoped>
.fiatPriceContainer {
  width: 100%;
  height: 30px;
  background-color: #f6f8fa;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  margin-bottom: 20px;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
}
.ifERROR {
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  gap: 50px;
  justify-content: center;
  height: 100%;
  align-items: center;
}
.indexes {
  display: flex;
}
p {
  font-size: 13px;
  margin-right: 2px;
  margin-top: 0;
  margin-bottom: 0;
}
#indexSymbol {
  font-weight: 800;
}
#IndexPrice::after {
  content: "USD";
  position: relative;
  top: -0.5em;
  font-size: 80%;
  margin-right: 5px;
  opacity: 70%;
}
.DownRed {
  color: red;
  position: relative;
}
.UpGreen {
  color: green;
  position: relative;
}
.DownRed::after {
  content: "";
  border-top: 4px solid #cc0000;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  position: absolute;
  top: 25%;
}
.UpGreen::after {
  content: "";
  border-bottom: 4px solid green;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  position: absolute;
  top: 25%;
}

.loaderfull {
  width: 100%;
  height: 4.8px;
  display: inline-block;
  position: relative;
  background: rgb(162 159 159 / 15%);

  overflow: hidden;
}
.loaderfull::after {
  content: "";
  width: 96px;
  height: 4.8px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  animation: hitZak 1s linear infinite alternate;
}

@keyframes hitZak {
  0% {
    left: 0;
    transform: translateX(-1%);
  }
  100% {
    left: 100%;
    transform: translateX(-99%);
  }
}
</style>
