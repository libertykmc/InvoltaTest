<template>
  <div class="toolbar">
    <div class="left">
      <h1 class="title">Список новостей</h1>
      <NewsResetButton />
    </div>
    <div class="right">
      <NewsSearchInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewsResetButton from "@/components/NewsResetButton.vue";
import NewsSearchInput from "@/components/NewsSearchInput.vue";
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  font-family: Arial, sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  color: #000000;
  margin: 0;
}

.right {
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .title {
    font-size: 28px;
  }

  .right {
    width: 100%;
  }
}
</style>
