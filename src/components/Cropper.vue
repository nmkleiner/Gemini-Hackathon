<template>
  <div class="cropperContainer">
    <Cropper
      ref="cropperRef"
      class="cropper"
      v-if="cropPicture"
      :src="cropPicture"
      :imageRestriction="'fill-area'"
    />

    <div class="footer">
      <LoaderButton
        primary
        :text="loading ? 'analyzing' : 'crop item'"
        @click="crop"
        :loading="loading"
      ></LoaderButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { computed, onMounted, ref } from "vue";
import LoaderButton from "./LoaderButton.vue";
import { useAppStore } from "../stores/app.store";

const appStore = useAppStore();
const loading = computed(() => appStore.loading);
const picture = computed(() => appStore.picture);

const cropPicture = ref<string>();

const loadPicture = () => {
  const reader = new FileReader();
  reader.readAsDataURL(picture.value);
  reader.onload = () => (cropPicture.value = String(reader.result));
};
onMounted(loadPicture);

const cropperRef = ref<InstanceType<typeof Cropper>>();
const crop = async () => {
  const { canvas } = cropperRef.value.getResult();
  if (canvas) {
    canvas.toBlob((blob) => {
      appStore.analyzeCroppedPicture(blob);
    }, "image/jpeg");
  }
};
</script>
<style scoped lang="scss">
.cropperContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
