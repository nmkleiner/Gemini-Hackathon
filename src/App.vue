<template>
  <div class="container">
    <div class="logo" v-if="activeState === 'initial'">ItemScanner</div>
    <Camera v-if="activeState === 'camera'" />
    <Cropper v-if="activeState === 'cropper'" />
    <Results v-if="activeState === 'results'" />

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
import { computed } from "vue";
import Button from "./components/Button.vue";
import Camera from "./components/Camera.vue";
import Cropper from "./components/Cropper.vue";
import Results from "./components/Results.vue";
import { useAppStore } from "./stores/app.store";

const appStore = useAppStore();
const activeState = computed(() => appStore.activeState);

const { openCamera } = appStore;
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
