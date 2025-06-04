<template>
  <div class="news-page">
    <NewsToolBar />

    <div class="top-controls">
      <NewsFilters />
      <NewsViewToggle />
    </div>

    <div v-if="loading" class="loading">Загрузка...</div>

    <div v-else>
      <div v-if="newsStore.viewMode === 'grid'" class="grid-view">
        <NewsCardGrid
          v-for="article in paginatedArticles"
          :key="article.link"
          v-bind="article"
        />
      </div>

      <div v-else class="list-view">
        <NewsCardList
          v-for="article in paginatedArticles"
          :key="article.link"
          v-bind="article"
        />
      </div>

      <Pagination
        v-if="totalPages > 1"
        v-model="pageBinding"
        :totalPages="totalPages"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNewsStore } from "@/stores/useNewsStore";
import { storeToRefs } from "pinia";

import NewsToolBar from "@/components/NewsToolBar.vue";
import NewsFilters from "@/components/NewsFilter.vue";
import NewsViewToggle from "@/components/NewsViewToggle.vue";
import NewsCardGrid from "@/components/NewsCardGrid.vue";
import NewsCardList from "@/components/NewsCardList.vue";
import Pagination from "@/components/Pagination.vue";

const newsStore = useNewsStore();

onMounted(() => {
  newsStore.initViewMode();
});

const { paginatedArticles, loading, totalPages, currentPage } =
  storeToRefs(newsStore);

const route = useRoute();
const router = useRouter();

const routePage = parseInt(route.params.page as string);
if (!isNaN(routePage)) {
  newsStore.setPage(routePage);
}

await newsStore.fetchArticles();

const pageBinding = computed({
  get: () => newsStore.currentPage,
  set: (val: number) => newsStore.setPage(val),
});
</script>

<style scoped>
.news-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 16px 0;
  flex-wrap: wrap;
}

.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(520px, 1fr));
  gap: 20px;
}

.list-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loading {
  text-align: center;
  margin-top: 32px;
  font-size: 16px;
}
</style>
