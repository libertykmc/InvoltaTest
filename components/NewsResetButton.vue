<template>
  <button class="reset-button" @click="resetFilters">
    <Icon icon="reset" />
  </button>
</template>

<script setup lang="ts">
import { useNewsStore } from "#imports";
import { Icon } from "#components";
import { useRouter } from "vue-router";

const newsStore = useNewsStore();
const router = useRouter();
const resetFilters = () => {
  newsStore.resetFilters();
  router.push({ path: "/news/1" });
};
</script>

<style scoped>
.reset-button {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.reset-button:hover {
  background-color: #f5f5f5;
}
</style>
