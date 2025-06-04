<template>
  <div class="search-wrapper">
    <input
      type="text"
      v-model="search"
      class="search-input"
      @keydown.enter="applySearch"
    />
    <button class="search-button" @click="applySearch">
      <Icon class="search-icon" icon="search" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "#components";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNewsStore } from "@/stores/useNewsStore";

const router = useRouter();
const route = useRoute();
const newsStore = useNewsStore();

const search = ref((route.query.query as string) || "");

let debounceTimeout: ReturnType<typeof setTimeout>;

watch(
  search,
  (newValue) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      applySearch();
    }, 500); 
  }
);

watch(
  () => route.query.query,
  (newQuery) => {
    search.value = newQuery?.toString() || "";
    newsStore.setQuery(search.value);
  },
  { immediate: true }
);

const applySearch = () => {
  newsStore.setQuery(search.value);
  router.push({
    path: route.path,
    query: { ...route.query, query: search.value },
  });
};
</script>

<style scoped>
.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  height: 56px;
}

.search-input {
  flex-grow: 1;
  padding: 0 44px 0 16px;
  font-size: 14px;
  border: none;
  outline: none;
  background: transparent;
  color: #212121;
  height: 100%;
}

.search-button {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  width: 20px;
  height: 20px;
  opacity: 0.5;
}
</style>
