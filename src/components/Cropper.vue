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
        aspectRatio: 1 / 1,
      }"
    />

    <div class="footer">
      <Button primary :text="'crop item'" @click="crop"></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import VuePictureCropper, { cropper } from "vue-picture-cropper";
import { onMounted, reactive, ref } from "vue";
import Button from "@/components/Button.vue";

const props = defineProps<{ picture: Blob }>();
const cropPicture = ref<string>();

const loadPicture = () => {
  const reader = new FileReader();
  reader.readAsDataURL(props.picture);
  reader.onload = () => (cropPicture.value = String(reader.result));
};

onMounted(loadPicture);

const result = reactive({
  dataURL: "",
  blobURL: "",
});
const crop = async () => {
  if (!cropper) return;
  const base64 = cropper.getDataURL();
  const blob: Blob | null = await cropper.getBlob();
  if (!blob) return;

  const file = await cropper.getFile({
    fileName: "cropped-item.jpg",
  });
  console.log({ base64, blob, file });
  result.dataURL = base64;
  result.blobURL = URL.createObjectURL(blob);
  //   send blob to server
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
