<template>
  <div class="container">
    <div class="logo" v-if="activeState === 'initial'">ItemScanner</div>
    <Camera
      v-if="activeState === 'camera'"
      @take-picture="handlePictureTaken"
    />
    <Cropper
      v-if="activeState === 'cropper'"
      :picture="picture"
      :is-loading="isLoading"
      @cropPicture="analyzeCroppedPicture"
    />
    <Results
      v-if="activeState === 'results'"
      :picture="croppedPicture"
      :results="apiResults"
      @goBack="activeState = 'initial'"
    />

    <div class="footer" v-if="activeState === 'initial'">
      <Button
        class="mainButton"
        :text="'scan your item'"
        primary
        @click="openCamera"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "./components/Button.vue";
import Camera from "./components/Camera.vue";
import Cropper from "./components/Cropper.vue";
import Results from "./components/Results.vue";
import { useAppStore } from "./stores/app.store";

const appStore = useAppStore();
const activeState = computed(() => appStore.activeState);

const openCamera = () => appStore.setActiveState("camera");

const picture = ref<Blob | null>(null);

const handlePictureTaken = (blob: Blob) => {
  picture.value = blob;
  appStore.setActiveState("cropper");
};

const isLoading = ref(false);
const croppedPicture = ref<string>("");
const apiResults = ref<any>(null);

const analyzeCroppedPicture = async (blob: Blob) => {
  const getItemDetails = async () => {
    const formData = new FormData();
    formData.append("image", blob);
    return (
      await fetch("https://gemini-1cex.onrender.com/generate", {
        method: "POST",
        body: formData,
      })
    ).json();
  };
  isLoading.value = true;
  croppedPicture.value = URL.createObjectURL(blob);

  try {
    apiResults.value = await getItemDetails();
  } catch (error) {
    alert("Something went wrong, please try again");
    appStore.setActiveState("initial");
    return;
  }

  appStore.setActiveState("results");
  isLoading.value = false;
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .logo {
    font-size: 40px;
    padding: 80% 0 0;
    font-weight: bold;
    color: #00a9e4;
    font-family: Roboto, sans-serif;
  }

  .footer {
    .mainButton {
      width: 260px;
    }
  }
}
</style>
