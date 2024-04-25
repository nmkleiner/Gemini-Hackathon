import { defineStore } from "pinia";

interface State {
  activeState: "initial" | "camera" | "cropper" | "results";
  loading: boolean;
  picture: Blob;
  croppedPicture: string;
  apiResults: ApiResults;
  selectedTab: number;
}

interface ApiResults {
  companyName: string;
  productName: string;
  about: string;
  techSpecs: Record<string, string> | string;
  purchaseURL: string;
  similarItem: Array<{ name: string; price: string }> | string;
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
    async getItemDetails(
      blob: Blob,
    ): Promise<
      { success: true; data: ApiResults } | { success: false; data: string }
    > {
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
        const response = await this.getItemDetails(blob);

        if (response.success === false) {
          this.processError(response.data);
          this.$reset();
        } else {
          this.apiResults = response.data;
        }
      } catch (error) {
        alert("Something went wrong, please try again");
        //  reset all state
        this.$reset();
        return;
      }

      this.setActiveState("results");
      this.setLoading(false);
    },
    processError(error: string) {
      const errorArray = error.split(", ");
      const categories = errorArray.map((e) => {
        const [part1, part2] = e.split("\n");
        const category = part1.split(": ")[1];
        const probability = part2.split(": ")[1];
        return { category, probability };
      });
      const highProbabilityErrors = categories.filter(
        (value) => value.probability === "HIGH",
      );
      const mediumProbabilityErrors = categories.filter(
        (value) => value.probability === "MEDIUM",
      );
      const lowProbabilityErrors = categories.filter(
        (value) => value.probability === "LOW",
      );
      const negligibleProbabilityErrors = categories.filter(
        (value) => value.probability === "NEGLIGIBLE",
      );
      const start = "Your item has a ";
      const end =
        " therefore it is not possible to provide accurate information. Please try with a different image.";
      if (highProbabilityErrors.length > 0) {
        alert(
          start +
            `high probability of ${highProbabilityErrors[0].category}` +
            end,
        );
        return;
      } else if (mediumProbabilityErrors.length > 0) {
        alert(
          start +
            `medium probability of ${mediumProbabilityErrors[0].category}` +
            end,
        );
        return;
      } else if (lowProbabilityErrors.length > 0) {
        alert(
          start +
            `low probability of ${lowProbabilityErrors[0].category}` +
            end,
        );
        return;
      } else if (negligibleProbabilityErrors.length > 0) {
        alert(
          start +
            `negligible probability of ${negligibleProbabilityErrors[0].category}` +
            end,
        );
      }
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
          return typeof this.apiResults.similarItem === "string"
            ? this.apiResults.similarItem
            : this.apiResults.similarItem
                .map((i) => `${i.name} ${i.price}`)
                .join("</br> ");
      }
    },
  },
});
