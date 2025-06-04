<template>
  <div class="card">
    <img v-if="image" :src="image" class="thumbnail" />

    <div class="content">
      <a class="title" :href="link" target="_blank">
        {{ title }}
      </a>
      <p class="description">{{ description }}</p>
      <div class="meta">
        <span class="source">{{ source }}</span>
        <span class="date">{{ formatDate(pubDate) }}</span>
      </div>
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
  image: string;
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
  display: flex;
  width: 100%;
  max-width: 1060px;
  min-height: 189px;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 16px;
  gap: 16px;
  box-sizing: border-box;
}

.thumbnail {
  width: 200px;
  height: 100px;
  object-fit: fill;
  border-radius: 3px;
  flex-shrink: 0;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.title {
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: #0029ff;
  margin: 0 0 8px;
  text-decoration: none;
  transition: color 0.2s;
}

.title:hover {
  color: black;
}

.description {
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #000000;
  margin: 0 0 12px;
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
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    min-height: auto;
  }

  .thumbnail {
    width: 100%;
    height: auto;
  }

  .title,
  .description,
  .read-more,
  .meta {
    font-size: 14px;
  }

  .title {
    line-height: 22px;
  }

  .description {
    line-height: 20px;
  }

  .meta {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
