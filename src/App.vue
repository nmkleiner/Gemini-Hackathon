<template>
  <div class="container">
    <Button
      class="mainButton"
      :text
      primary
      @click="() => (cameraActive = true)"
    />

    <div class="cameraContainer" v-if="cameraActive">
      <camera ref="camera" autoplay></camera>
      <div class="buttonContainer">
        <Button primary :text="'scan item'" @click="takePicture"></Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="js">
import { ref } from "vue";
import Button from "./components/Button.vue";

const text = "click to scan item";
const cameraActive = ref(false);

const takePicture = () => {
  const picture = webcam.value.snap();
  console.log(picture);
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: black;

  .mainButton {
    width: 260px;
    text-transform: uppercase;
    font-weight: bold;
  }

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
      padding-bottom: 40px;
    }
  }
}
</style>
