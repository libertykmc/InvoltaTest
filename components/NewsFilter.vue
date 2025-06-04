<template>
  <div class="filters">
    <button
      v-for="source in filterOptions"
      :key="source.key"
      :class="{ active: newsStore.activeFilter === source.key }"
      @click="setFilter(source.key)"
    >
      {{ source.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from "#imports";

const newsStore = useNewsStore();

const filterOptions = [
  { label: "Все", key: "all" },
  { label: "Lenta.ru", key: "lenta.ru" },
  { label: "Mos.ru", key: "mos.ru" },
];

const setFilter = (key: string) => {
  newsStore.setFilter(key);
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

button {
  all: unset;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
  color: #2962ff;
}

button.active {
  color: #000;
  font-weight: 700;
}
</style>
