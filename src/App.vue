<template>
  <div class="container">
    <div class="logo" v-if="activeState === 'initial'">ItemScanner</div>
    <Camera
      v-if="activeState === 'camera'"
      @take-picture="handlePictureTaken"
    />
    <Cropper v-if="activeState === 'cropper'" :picture="picture" />

    <div class="footer" v-if="activeState === 'initial'">
      <Button class="mainButton" :text primary @click="openCamera" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Button from "./components/Button.vue";
import Camera from "./components/Camera.vue";
import Cropper from "./components/Cropper.vue";

const text = "click to scan item";

const activeState = ref<"initial" | "camera" | "cropper" | "results">(
  "initial",
);

const picture = ref<Blob | null>(null);

const openCamera = () => {
  activeState.value = "camera";
};

const handlePictureTaken = (blob: Blob) => {
  picture.value = blob;
  activeState.value = "cropper";
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .logo {
    font-size: 40px;
    font-weight: bold;
    color: #00a9e4;
    font-family: "Roboto, sans-serif";
  }

  .footer {
    .mainButton {
      width: 260px;
    }
  }
}
</style>
