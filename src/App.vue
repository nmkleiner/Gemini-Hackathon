<template>
  <div class="container">
    <div class="footer" v-if="isInitialState">
      <Button class="mainButton" :text primary @click="onClick" />
    </div>

    <Camera v-if="cameraActive" @take-picture="handlePictureTaken" />
    <Cropper v-if="cropActive" :picture="picture" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Button from "./components/Button.vue";
import Camera from "./components/Camera.vue";
import Cropper from "./components/Cropper.vue";

const text = "click to scan item";

const isInitialState = ref(true);
const cameraActive = ref(false);
const picture = ref<Blob | null>(null);
const cropActive = ref(false);

const onClick = () => {
  cameraActive.value = true;
  isInitialState.value = false;
};

const handlePictureTaken = (blob: Blob) => {
  cameraActive.value = false;
  picture.value = blob;
  cropActive.value = true;
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
  background-color: black;

  .footer {
    .mainButton {
      width: 260px;
    }
  }
}
</style>
