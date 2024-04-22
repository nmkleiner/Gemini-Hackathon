import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: (): { activeState: "initial" | "camera" | "cropper" | "results" } => ({
    activeState: "initial",
  }),
  actions: {
    setActiveState(state: "initial" | "camera" | "cropper" | "results") {
      this.activeState = state;
    },
  },
});
