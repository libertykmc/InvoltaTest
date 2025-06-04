<template>
  <div v-if="newsStore.viewModeReady" class="view-toggle">
    <button
      :class="{ active: newsStore.viewMode === 'list' }"
      @click="setMode('list')"
    >
      <Icon :icon="newsStore.viewMode === 'list' ? 'list-active' : 'list'" />
    </button>
    <button
      :class="{ active: newsStore.viewMode === 'grid' }"
      @click="setMode('grid')"
    >
      <Icon :icon="newsStore.viewMode === 'grid' ? 'grid-active' : 'grid'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from "#imports";
import { Icon } from "#components";

const newsStore = useNewsStore();

const setMode = (mode: "grid" | "list") => {
  newsStore.setViewMode(mode);
};
</script>

<style scoped>
.view-toggle {
  display: flex;
  gap: 10px;
}

button {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
