<template>
  <button :class="buttonClasses">
    <slot name="beforeText"></slot>
    {{ text }}
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
import { ButtonProps } from "./button-props.ts";
import { computed } from "vue";

const props = withDefaults(defineProps<ButtonProps>(), {
  text: "",
  primary: false,
  secondary: false,
  textOnly: false,
  small: false,
});

const buttonClasses = computed(() => [
  "button",
  {
    primary: props.primary,
    secondary: props.secondary,
    textOnly: props.textOnly,
    small: props.small,
  },
]);
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 14px;
  cursor: pointer;

  &.primary,
  &.secondary {
    height: 44px;
    padding: 16px 40px;
    border-radius: 22px;
  }

  &.primary {
    background-color: #00a9e4;
    color: white;
  }

  &.secondary {
    background-color: transparent;
    border: solid 1px #00a9e4;
    color: #00a9e4;
  }

  &.textOnly {
    height: 44px;
    padding: 16px 0;
    background-color: transparent;
    color: #00a9e4;
  }

  &.small {
    height: 26px;
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
