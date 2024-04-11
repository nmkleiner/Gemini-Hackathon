<template>
  <div class="container">
    <Button :text primary @click="() => (cameraActive = true)" />

    <template v-if="cameraActive">
      <camera ref="camera" autoplay></camera>
      <button @click="takePicture">Create snapshot</button>
    </template>
  </div>
</template>
<script setup lang="js">
import { ref } from "vue";
import Button from "./components/Button.vue";

const text = "Click to scan item".toUpperCase();
const cameraActive = ref(false);

const takePicture = () => {
  const picture = webcam.value.snap();
  console.log(picture);
};
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
