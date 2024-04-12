<template>
  <div class="cameraContainer">
    <camera ref="cameraRef" autoplay></camera>
    <div class="footer">
      <Button primary :text="'scan item'" @click="takePicture"></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Camera from "simple-vue-camera";
import Button from "@/components/Button.vue";
import { ref } from "vue";

const cameraRef = ref<InstanceType<typeof Camera>>();

const emit = defineEmits({ takePicture: (blob: Blob) => blob.size });
const takePicture = async () => {
  if (!cameraRef.value) throw new Error("Camera not found");

  const blob = await cameraRef.value.snapshot();

  if (!blob) throw new Error("No image found");
  emit("takePicture", blob);
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
}
</style>
