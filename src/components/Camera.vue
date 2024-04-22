<template>
  <div class="cameraContainer">
    <camera
      ref="cameraRef"
      autoplay
      @started="onStart"
      :resolution="{ width: 1080, height: 1320 }"
    ></camera>
    <div class="footer" v-if="displayButton">
      <Button primary :text="'scan item'" @click="takePicture"></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";
import Camera from "simple-vue-camera";
import { useAppStore } from "../stores/app.store";

const cameraRef = ref<InstanceType<typeof Camera>>();

const displayButton = ref(false);
const onStart = () => (displayButton.value = true);

const takePicture = async () => {
  if (!cameraRef.value) throw new Error("Camera not found");

  const blob = await cameraRef.value.snapshot();

  if (!blob) throw new Error("No image found");
  useAppStore().takePicture(blob);
};
</script>

<style scoped lang="scss">
.cameraContainer {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
