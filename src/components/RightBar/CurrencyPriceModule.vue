<template>
  <div class="CurrencyPriceContainer">
    <div v-if="responseAPI != undefined">
      <article class="cryptoIndex" v-for="coin in CoinContainer">
        <img :src="coin.img" alt="" />
        <p class="CryptoName">{{ coin?.name }}</p>
        <p class="CryptoNameFade">{{ coin?.symbol }}</p>
        <p
          :class="{
            CryptoPercentDown: coin?.quote.USD.percent_change_1h
              .toString()
              .includes('-'),
            CryptoPercentUp: !coin?.quote.USD.percent_change_1h
              .toString()
              .includes('-'),
          }"
          v-if="responseAPI != undefined"
        >
          {{ coin?.quote.USD.percent_change_1h.toFixed(1) + "%" }}
        </p>
        <p class="CryptoPrice" v-if="responseAPI != undefined">
          {{ Number(coin?.quote.USD.price.toFixed(2)) + " USD" }}
        </p>
        <div v-else><span class="loader"></span></div>
      </article>
    </div>
    <div v-else class="crushLoader"><span class="loaderfull"></span></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import btc from "@/assets/CryptoModule/bitcoin-btc-logo.svg";
import eth from "@/assets/CryptoModule/ethereum-eth-logo.svg";
import bnb from "@/assets/CryptoModule/bnb-bnb-logo.svg";
import xrp from "@/assets/CryptoModule/xrp-xrp-logo.svg";
import sol from "@/assets/CryptoModule/solana-sol-logo.svg";
import trx from "@/assets/CryptoModule/tron-trx-logo.svg";

export default defineComponent({
  components: {},
  setup() {
    let responseAPI: any = ref(undefined);
    let CoinContainer: any = ref([]);
    let upORdownPercent = ref(true);
    let GetCurrentCryptoIndex = async () => {
      try {
        await fetch(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=USD&limit=20",
          {
            headers: {
              "X-CMC_PRO_API_KEY": "da29a1ba-4d7a-4cd0-93d4-926654c69524",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
          .then(async (res: any) => {
            responseAPI.value = await res.data.data;
          })
          .then(() => {
            function findSymbol(symbol: string) {
              let found = responseAPI.value.find((item: any) => {
                return item.symbol == symbol;
              });
              return found;
            }
            let BTC = {
              img: btc,
              ...findSymbol("BTC"),
            };
            let ETH = {
              img: eth,
              ...findSymbol("ETH"),
            };
            let BNB = {
              img: bnb,
              ...findSymbol("BNB"),
            };
            let XRP = {
              img: xrp,
              ...findSymbol("XRP"),
            };
            let SOL = {
              img: sol,
              ...findSymbol("SOL"),
            };
            let TRX = {
              img: trx,
              ...findSymbol("TRX"),
            };
            CoinContainer.value.push(BTC, ETH, BNB, XRP, SOL);
          })
          .catch((error) => {
            responseAPI.value = undefined;
          });
      } catch {
        responseAPI.value = undefined;
      }
    };
    onMounted(() => {
      GetCurrentCryptoIndex();
    });

    return { responseAPI, CoinContainer, upORdownPercent };
  },
});
</script>

<style scoped>
.CurrencyPriceContainer {
  display: grid;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  gap: 5px;
  border: 1px rgb(100, 146, 210, 0.3) solid;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.35);
  background-color: rgb(246, 248, 250);
}
p {
  font-size: 15px;
}
.cryptoIndex {
  display: flex;
  align-items: center;
}

img {
  width: 30px;
  height: 30px;
  margin-right: 3px;
  margin-left: 10px;
}
.CryptoName {
  margin: 0;
  justify-self: flex-start;
  font-weight: 700;
}
.CryptoNameFade {
  opacity: 20%;
  margin-left: 5px;
  margin-right: 5px;
}
.CryptoPrice {
  margin-left: auto;
  margin-right: 10px;
}
.CryptoPercentUp {
  color: green;
  position: relative;
}
.CryptoPercentUp::after {
  content: "";
  border-bottom: 4px solid green;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  position: absolute;
  top: 25%;
}
.CryptoPercentDown {
  color: red;
  position: relative;
}
.CryptoPercentDown::after {
  content: "";
  border-top: 4px solid #cc0000;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  position: absolute;
  top: 25%;
}
.loader {
  border: 2px solid;
  border-color: transparent #784c4c;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
  margin-left: 20px;
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  border: 12px solid;
  border-color: transparent rgba(35, 13, 13, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.crushLoader {
  display: grid;
  align-content: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.loaderfull {
  border: 2px solid;
  border-color: transparent #784c4c;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}
.loaderfull::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  border: 25px solid;
  border-color: transparent rgba(35, 13, 13, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%);
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
