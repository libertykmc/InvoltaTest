<template>
  <div class="card">
    <h2 class="title">{{ title }}</h2>
    <p class="description">{{ description }}</p>
    <a :href="link" target="_blank" class="read-more">Подробнее</a>
    <div class="meta">
      <span class="source">{{ source }}</span>
      <span class="date">{{ formatDate(pubDate) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  link: string;
  source: string;
  pubDate: string;
}>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 520px;
  min-height: 256px;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transition: box-shadow 0.2s ease;
}

.title {
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: #0029ff;
  margin: 0 0 8px;
}

.description {
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #000000;
  margin: 0 0 12px;
}

.read-more {
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #0029ff;
  text-decoration: underline;
  margin-bottom: 8px;
  width: fit-content;
  display: inline-block;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #bdbdbd;
}

.source {
  text-decoration: underline;
  color: #bdbdbd;
  font-family: Arial, sans-serif;
}

.date {
  color: #bdbdbd;
  font-family: Arial, sans-serif;
}

@media (max-width: 600px) {
  .card {
    max-width: 100%;
    min-height: auto;
    padding: 16px;
  }

  .title {
    font-size: 18px;
    line-height: 22px;
  }

  .description {
    font-size: 14px;
    line-height: 20px;
  }

  .read-more,
  .meta {
    font-size: 14px;
  }
}
</style>
