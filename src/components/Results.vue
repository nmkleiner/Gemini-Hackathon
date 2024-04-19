<template>
  <div class="resultsContainer">
    <div class="header">
      <span class="link" @click="emit('goBack')">Try again</span>
    </div>

    <div class="imageContainer">
      <img :src="picture" alt="cropped-image" />
    </div>

    <div class="productHeader">
      <div class="maker" v-text="'Made by ' + results.companyName"></div>
      <div class="productName" v-text="results.productName"></div>
    </div>

    <div class="tabs">
      <div
        @click="selectedTab = 1"
        :class="['tab', { selected: selectedTab === 1 }]"
      >
        About
      </div>
      <div
        @click="selectedTab = 2"
        :class="['tab', { selected: selectedTab === 2 }]"
      >
        Tech specs
      </div>
      <div
        @click="selectedTab = 3"
        :class="['tab', { selected: selectedTab === 3 }]"
      >
        Similar items
      </div>
    </div>
    <div class="productDescriptionContainer">
      <div class="productDescription" v-html="description"></div>
    </div>
    <div class="footer">
      <Button text="view buying options" @click="emit('goBack')" primary />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "./Button.vue";

const { results } = defineProps<{
  picture: string;
  results: {
    companyName: string;
    productName: string;
    about: string;
    techSpecs: { Material: string; Features: string; Compatibility: string };
    url: string;
    similarItems: Array<{ name: string; price: string }>;
  };
}>();
const emit = defineEmits(["goBack"]);

const selectedTab = ref(1);

const description = computed(() => {
  switch (selectedTab.value) {
    case 1:
      return results.about;
    case 2:
      return `${results.techSpecs.Material} ${results.techSpecs.Features} ${results.techSpecs.Compatibility}`;
    case 3:
      return results.similarItems
        .map((i) => `${i.name} ${i.price}`)
        .join("</br> ");
  }
});
</script>
<style scoped lang="scss">
.resultsContainer {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  color: white;

  .header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 60px 0 20px;

    .link {
      display: block;
      color: #00a9e4;
      font-size: 14px;
    }
  }

  .imageContainer {
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .productHeader {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 20px 0;
    margin-bottom: 20px;
    user-select: none;

    .maker {
      font-size: 12px;
      color: #00a9e4;
    }

    .productName {
      font-size: 20px;
    }
  }

  .tabs {
    display: flex;
    width: 100%;
    justify-content: center;

    .tab {
      display: flex;
      justify-content: center;
      width: 120px;
      padding: 10px 0;
      border-bottom: white 1px solid;
      user-select: none;

      &.selected {
        color: #00a9e4;
        border-bottom: #00a9e4 1px solid;
      }
    }
  }

  .productDescriptionContainer {
    width: 100%;
    padding: 20px 0;

    .productDescription {
      font-size: 14px;
      line-height: 1.5;
      padding: 0 10px;
    }
  }
}
</style>
