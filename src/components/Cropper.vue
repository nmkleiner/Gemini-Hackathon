<template>
  <div class="cropperContainer">
    <VuePictureCropper
      v-if="cropPicture"
      :boxStyle="{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        margin: 'auto',
      }"
      :img="cropPicture"
      :options="{
        viewMode: 1,
        dragMode: 'crop',
        aspectRatio: 1,
      }"
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
import VuePictureCropper, { cropper } from "vue-picture-cropper";
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

const crop = async () => {
  if (!cropper) return;

  const blob: Blob | null = await cropper.getBlob();
  if (!blob) return;

  emit("cropPicture", blob);
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
