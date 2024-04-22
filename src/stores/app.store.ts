import { defineStore } from "pinia";

interface State {
  activeState: "initial" | "camera" | "cropper" | "results";
  loading: boolean;
  picture: Blob;
  croppedPicture: string;
  apiResults: {
    companyName: string;
    productName: string;
    about: string;
    techSpecs: Record<string, string> | string;
    purchaseURL: string;
    similarItem: Array<{ name: string; price: string }>;
  };
  selectedTab: number;
}

export const useAppStore = defineStore("app", {
  state: (): State => ({
    activeState: "initial",
    loading: false,
    picture: null,
    croppedPicture: null,
    apiResults: null,
    selectedTab: 0,
  }),
  actions: {
    openCamera() {
      this.setActiveState("camera");
    },
    takePicture(blob: Blob) {
      this.setPicture(blob);
      this.setActiveState("cropper");
    },
    async getItemDetails(blob: Blob) {
      const formData = new FormData();
      formData.append("image", blob);
      return (
        await fetch("https://gemini-1cex.onrender.com/generate", {
          method: "POST",
          body: formData,
        })
      ).json();
    },
    async analyzeCroppedPicture(blob: Blob) {
      this.setLoading(true);
      this.setCroppedPicture(URL.createObjectURL(blob));

      try {
        this.apiResults = await this.getItemDetails(blob);
      } catch (error) {
        alert("Something went wrong, please try again");
        //  reset all state
        this.$reset();
        return;
      }

      this.setActiveState("results");
      this.setLoading(false);
    },
    setActiveState(state: "initial" | "camera" | "cropper" | "results") {
      this.activeState = state;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setPicture(picture: Blob) {
      this.picture = picture;
    },
    setCroppedPicture(croppedPicture: string) {
      this.croppedPicture = croppedPicture;
    },
    setSelectedTab(tab: number) {
      this.selectedTab = tab;
    },
  },
  getters: {
    resultsDescription(): any | string {
      switch (this.selectedTab) {
        case 0:
          return this.apiResults.about;
        case 1:
          return typeof this.apiResults.techSpecs === "string"
            ? this.apiResults.techSpecs
            : Object.entries(this.apiResults.techSpecs)
                .map(([key, value]) => `${key}: ${value}`)
                .join("</br> ");
        case 2:
          return this.apiResults.similarItem
            .map((i) => `${i.name} ${i.price}`)
            .join("</br> ");
      }
    },
  },
});
