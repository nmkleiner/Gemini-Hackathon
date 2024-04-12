<template>
  <div class="cropperContainer">
    <VuePictureCropper
      v-if="cropPicture"
      :boxStyle="{
        width: '100%',
        height: '100%',
        backgroundColor: '#f8f8f8',
        margin: 'auto',
      }"
      :img="cropPicture"
      :options="{
        viewMode: 1,
        dragMode: 'crop',
        aspectRatio: 16 / 9,
      }"
    />
  </div>
</template>
<script setup lang="ts">
import VuePictureCropper, { cropper } from "vue-picture-cropper";
import { onMounted, ref } from "vue";

const props = defineProps<{ picture: Blob }>();
const cropPicture = ref<string>();

onMounted(() => {
  const reader = new FileReader();
  reader.readAsDataURL(props.picture);
  reader.onload = () => {
    cropPicture.value = String(reader.result);
  };
});
</script>
<style scoped lang="scss">
.cropperContainer {
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
