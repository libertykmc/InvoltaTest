<script setup lang="ts">
type Icon =
  | "search"
  | "grid"
  | "list"
  | "grid-active"
  | "list-active"
  | "reset";
defineProps<{
  icon: Icon;
}>();

const iconPaths: Record<Icon, string> = {
  search: "/icons/icon-search.svg",
  grid: "/icons/grid.svg",
  list: "/icons/list.svg",
  "grid-active": "/icons/grid-active.svg",
  "list-active": "/icons/list-active.svg",
  reset: "/icons/reset.svg",
};
</script>

<template>
  <img :src="iconPaths[icon]" />
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
</style>
