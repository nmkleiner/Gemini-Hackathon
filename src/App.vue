<template>
  <div class="container">
    <Button
      class="mainButton"
      :text
      primary
      @click="() => (cameraActive = true)"
    />

    <Camera v-if="cameraActive" @take-picture="handlePictureTaken" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Button from "./components/Button.vue";
import Camera from "./components/Camera.vue";

const text = "click to scan item";
const cameraActive = ref(false);

const handlePictureTaken = (blob: Blob) => {
  console.log("Picture taken", blob);
  cameraActive.value = false;
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: black;

  .mainButton {
    width: 260px;
    text-transform: uppercase;
    font-weight: bold;
  }
}
</style>
