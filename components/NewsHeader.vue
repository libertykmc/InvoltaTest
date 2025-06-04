<template>
  <div class="header">
    <h1 class="title">Список новостей</h1>
    <NewsResetButton />
  </div>
</template>

<script setup lang="ts">
import { Icon } from "#components";
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 12px;
  flex-wrap: wrap;
}

.title {
  font-family: Arial, sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  margin: 0;
}

@media (max-width: 600px) {
  .title {
    font-size: 28px;
  }
}
</style>
