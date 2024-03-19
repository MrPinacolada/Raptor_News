<template>
  <div class="WeatherContainer" id="WeatherContainer" v-if="!trowError">
    <div class="top">
      <p id="WeatherCountry">{{ WeatherCountry }}</p>
    </div>

    <div class="leftSide">
      <img :src="`${WeatherIcon}`" />
      <p id="condition">{{ WeatherCondition }}</p>
    </div>
    <div class="rifghSide">
      <p class="Cell" v-if="currentG">{{ "Current: " + WeatherCel + "°C" }}</p>
      <p class="Cell" v-if="currentG">{{ "High: " + WeatherCelHigh + "°C" }}</p>
      <p class="Cell" v-if="currentG">{{ "Low: " + WeatherCelLow + "°C" }}</p>
      <p class="Cell" v-if="!currentG">{{ "Current: " + WeatherF + "°F" }}</p>
      <p class="Cell" v-if="!currentG">{{ "High: " + WeatherFHigh + "°F" }}</p>
      <p class="Cell" v-if="!currentG">{{ "Low: " + WeatherFLow + "°F" }}</p>
    </div>
  </div>
  <div v-else class="crushLoader"><span class="loaderfull"></span></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
export default defineComponent({
  setup() {
    let ApiRequest = undefined as any;
    let WeatherIcon = ref(undefined);
    let WeatherCountry = ref(undefined);
    let WeatherCel = ref(undefined);
    let WeatherF = ref(undefined);
    let WeatherCelHigh = ref(undefined);
    let WeatherCelLow = ref(undefined);
    let WeatherFHigh = ref(undefined);
    let WeatherFLow = ref(undefined);
    let WeatherCondition = ref(undefined);
    let trowError = ref(true);
    let latitude = undefined;
    let longitude = undefined;
    let acceptGPS = false;
    let currentG = ref(true);
    let CellToF: any;
    function checkBackGrounds(code: string) {
      let currenCondition = code.includes("cloud")
        ? "cloudy"
        : code.includes("rain")
        ? "rain"
        : code.includes("Sun")
        ? "sunny"
        : "";
      document
        .getElementById("WeatherContainer")
        ?.setAttribute(
          "style",
          "background-image: url(src/assets/Weather_backgrounds/" +
            currenCondition +
            ".gif);"
        );
    }
    const successCallback = (position: any) => {
      acceptGPS = true;
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=37d63f8db6f547a8a92100230231402&q=" +
          latitude +
          "," +
          longitude,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: "",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            trowError.value = true;
          } else {
            ApiRequest = data;
            trowError.value = false;
          }
        })
        .then(() => {
          WeatherIcon.value = ApiRequest?.current.condition.icon;
          WeatherCountry.value = ApiRequest?.location.name;
          WeatherCel.value = ApiRequest?.current.temp_c;
          WeatherF.value = ApiRequest?.current.temp_f;
          WeatherCondition.value = ApiRequest?.current.condition.text;
          WeatherCelHigh.value =
            ApiRequest?.forecast.forecastday[0].day.maxtemp_c;
          WeatherCelLow.value =
            ApiRequest?.forecast.forecastday[0].day.mintemp_c;
          WeatherFHigh.value =
            ApiRequest?.forecast.forecastday[0].day.maxtemp_f;
          WeatherFLow.value = ApiRequest?.forecast.forecastday[0].day.mintemp_f;
          checkBackGrounds(ApiRequest?.current.condition.text);
        });
    };
    const errorCallback = () => {
      fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=37d63f8db6f547a8a92100230231402&q=London&days=1&aqi=no&alerts=no",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: "",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            trowError.value = true;
          } else {
            ApiRequest = data;
            trowError.value = false;
          }
        })
        .then(() => {
          WeatherIcon.value = ApiRequest?.current.condition.icon;
          WeatherCountry.value = ApiRequest?.location.name;
          WeatherCel.value = ApiRequest?.current.temp_c;
          WeatherF.value = ApiRequest?.current.temp_f;
          WeatherCondition.value = ApiRequest?.current.condition.text;
          WeatherCelHigh.value =
            ApiRequest?.forecast.forecastday[0].day.maxtemp_c;
          WeatherCelLow.value =
            ApiRequest?.forecast.forecastday[0].day.mintemp_c;
          WeatherFHigh.value =
            ApiRequest?.forecast.forecastday[0].day.maxtemp_f;
          WeatherFLow.value = ApiRequest?.forecast.forecastday[0].day.mintemp_f;
          checkBackGrounds(ApiRequest?.current.condition.text);
        });
    };
    onMounted(() => {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      CellToF = setInterval(() => {
        currentG.value = !currentG.value;
      }, 8000);
    });
    onUnmounted(() => {
      clearInterval(CellToF);
    });
    return {
      WeatherCountry,
      WeatherIcon,
      WeatherCel,
      WeatherF,
      WeatherCelHigh,
      WeatherCelLow,
      WeatherFHigh,
      WeatherFLow,
      WeatherCondition,
      currentG,
      trowError,
    };
  },
});
</script>

<style scoped>
.WeatherContainer {
  display: grid;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 150px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border-radius: 5px;
  border: 1px rgb(100, 146, 210, 0.3) solid;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.35);
  background-size: 100% 100%;
  animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  background-color: rgb(246, 248, 250);
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
p {
  margin: 0;
  padding: 0;
}
article {
  margin: 0 auto;
  padding: 0;
  width: auto;
  height: 20px;
}
img {
  margin: 0 auto;
}
.top {
  grid-column: span 2;
  text-align: center;
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
}
.leftSide {
  align-self: center;
  justify-self: center;
  display: grid;
  gap: 10px;
  margin-bottom: 10px;
}
.rifghSide {
  align-self: flex-end;
  justify-self: center;
  display: grid;
  gap: 10px;
  margin-bottom: 10px;
}
.crushLoader {
  display: grid;
  align-content: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border: 1px rgb(100, 146, 210, 0.3) solid;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.35);
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
