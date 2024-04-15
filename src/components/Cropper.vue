<template>
  <div class="cropperContainer">
    <Cropper
      ref="cropperRef"
      class="cropper"
      v-if="cropPicture"
      :src="cropPicture"
    />

    <div class="footer">
      <LoaderButton
        primary
        :text="isLoading ? 'analyzing' : 'crop item'"
        @click="crop"
        :loading="isLoading"
      ></LoaderButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { onMounted, ref } from "vue";
import LoaderButton from "@/components/LoaderButton.vue";

const props = defineProps<{ picture: Blob; isLoading: boolean }>();
const emit = defineEmits({ cropPicture: (blob: Blob) => blob.size });

const cropPicture = ref<string>();

const loadPicture = () => {
  const reader = new FileReader();
  reader.readAsDataURL(props.picture);
  reader.onload = () => (cropPicture.value = String(reader.result));
};
onMounted(loadPicture);

const cropperRef = ref<InstanceType<typeof Cropper>>();
const crop = async () => {
  const { canvas } = cropperRef.value.getResult();
  if (canvas) {
    canvas.toBlob((blob) => {
      emit("cropPicture", blob);
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
