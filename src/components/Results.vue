<template>
  <div class="resultsContainer">
    <div class="header">
      <span class="link" @click="goBack">Try again</span>
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
        v-for="(tab, index) in tabs"
        @click="() => setSelectedTab(index)"
        :class="['tab', { selected: selectedTab === index }]"
      >
        {{ tab }}
      </div>
    </div>
    <div class="productDescriptionContainer">
      <div class="productDescription" v-html="description"></div>
    </div>
  </div>

  <div class="footer">
    <Button
      v-if="displayPurchaseUrl"
      text="view buying options"
      @click="openPurchaseUrl"
      primary
    />
    <Button v-else text="not available" @click="goBack" primary />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
// import Button from "./Button.vue";
import { useAppStore } from "../stores/app.store";

const appStore = useAppStore();
const { setSelectedTab } = appStore;
const picture = computed(() => appStore.croppedPicture);
const results = computed(() => appStore.apiResults);
const selectedTab = computed(() => appStore.selectedTab);
const description = computed(() => appStore.resultsDescription);

const tabs = ["About", "Tech specs", "Similar items"];

const goBack = () => appStore.$reset();
const displayPurchaseUrl = computed(
  () => results.value.purchaseURL && results.value.purchaseURL.includes("http"),
);
const openPurchaseUrl = () => window.open(results.value.purchaseURL, "_blank");
</script>
<style scoped lang="scss">
.resultsContainer {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: calc(100vw - 24px);
  height: calc(100vh - 20px - 40px);
  overflow-y: scroll;
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
      max-height: 300px;
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
      font-size: 18px;

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
      font-size: 16px;
      line-height: 1.5;
      padding: 0 10px;
    }
  }
}
</style>
