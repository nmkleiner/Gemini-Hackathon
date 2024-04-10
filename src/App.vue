<template>
  <div class="container">
    <Button :text primary @click="() => (cameraActive = true)" />
    <Button :text="'TAKE PICTURE'" primary @click="takePicture" />
    <video id="webcam" autoplay playsinline width="640" height="480"></video>
    <canvas id="canvas" class="d-none"></canvas>
  </div>
</template>
<script setup lang="js">
import { onMounted, ref } from "vue";
import Button from "./components/Button.vue";
import Webcam from "webcam-easy";

const text = "Click to scan item".toUpperCase();

const cameraActive = ref(false);

const webcam = ref();
onMounted(() => {
  const webcamElement = document.getElementById("webcam");
  const canvasElement = document.getElementById("canvas");
  webcam.value = new Webcam(webcamElement, "user", canvasElement);
  webcam.value.start();
});

const takePicture = () => {
  const picture = webcam.value.snap();
  console.log(picture);
};

// const resolution =
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f0f0f0;
}
</style>
