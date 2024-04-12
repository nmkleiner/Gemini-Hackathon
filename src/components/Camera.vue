<template>
  <div class="cameraContainer">
    <camera ref="cameraRef" autoplay></camera>
    <div class="buttonContainer">
      <Button primary :text="'scan item'" @click="takePicture"></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Camera from "simple-vue-camera";
import Button from "@/components/Button.vue";
import { ref } from "vue";

const cameraRef = ref<InstanceType<typeof Camera>>();
const takePicture = async () => {
  if (!cameraRef.value) throw new Error("Camera not found");

  const blob = await cameraRef.value.snapshot();

  if (!blob) throw new Error("No image found");

  const url = URL.createObjectURL(blob);
  //   download the blob
  const a = document.createElement("a");
  a.href = url;
  a.download = "image.jpg";
  a.click();
};
</script>

<style scoped lang="scss">
.cameraContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .buttonContainer {
    position: absolute;
    bottom: 40px;
  }
}
</style>
