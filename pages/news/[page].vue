<template>
  <div>
    <h1>Новости</h1>

    <div class="view-switcher">
      <button
        @click="newsStore.setViewMode('grid')"
        :class="{ active: newsStore.viewMode === 'grid' }"
      >
        Плитка
      </button>
      <button
        @click="newsStore.setViewMode('list')"
        :class="{ active: newsStore.viewMode === 'list' }"
      >
        Список
      </button>
    </div>

    <div class="filters">
      <button
        @click="newsStore.setFilter('all')"
        :class="{ active: newsStore.activeFilter === 'all' }"
      >
        Все
      </button>
      <button
        @click="newsStore.setFilter('mos.ru')"
        :class="{ active: newsStore.activeFilter === 'mos.ru' }"
      >
        Mos.ru
      </button>
      <button
        @click="newsStore.setFilter('lenta.ru')"
        :class="{ active: newsStore.activeFilter === 'lenta.ru' }"
      >
        Lenta.ru
      </button>
    </div>

    <div class="search-bar">
      <input
        type="text"
        :value="newsStore.query"
        placeholder="Поиск по заголовку или описанию..."
        @input="onSearchInput"
      />
    </div>

    <div class="reset-wrapper">
      <button @click="onResetFilters">Сбросить фильтры</button>
    </div>

    <div v-if="loading">Загрузка...</div>

    <div v-if="newsStore.viewMode === 'grid'" class="grid-view">
      <div
        v-for="article in paginatedArticles"
        :key="article.link"
        class="card"
      >
        <h3>{{ article.title }}</h3>
        <p>{{ article.description || "Описание отсутствует" }}</p>
        <a :href="article.link" target="_blank">Читать далее</a>
      </div>
    </div>

    <div v-else class="list-view">
      <div
        v-for="article in paginatedArticles"
        :key="article.link"
        class="list-item"
      >
        <h3>{{ article.title }}</h3>
        <p>{{ article.description || "Описание отсутствует" }}</p>
        <a :href="article.link" target="_blank">Читать далее</a>
        <hr />
      </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <NuxtLink v-for="page in totalPages" :key="page" :to="`/news/${page}`">
        <button :class="{ active: page === currentPage }">
          {{ page }}
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from "@/stores/useNewsStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const newsStore = useNewsStore();
const { paginatedArticles, loading, currentPage, totalPages } =
  storeToRefs(newsStore);

const route = useRoute();
const router = useRouter();

function onSearchInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const q = input.value;
  router.replace({
    query: {
      ...route.query,
      query: q,
    },
  });

  newsStore.setQuery(q);
}

function onResetFilters() {
  newsStore.resetFilters();
  router.replace({ path: "/news/1", query: {} });
}

onMounted(() => {
  newsStore.initViewMode();
  newsStore.fetchArticles().then(() => {
    const pageFromRoute = parseInt(route.params.page as string);
    if (!isNaN(pageFromRoute)) {
      newsStore.setPage(pageFromRoute);
    }

    const queryFromRoute = route.query.query as string;
    if (queryFromRoute) {
      newsStore.setQuery(queryFromRoute);
    }
  });
});

watch(
  () => route.params.page,
  (newVal) => {
    const page = parseInt(newVal as string);
    if (!isNaN(page)) {
      newsStore.setPage(page);
    }
  }
);

watch(
  () => route.query.query,
  (newQuery) => {
    newsStore.setQuery((newQuery || "") as string);
  }
);
</script>

<style scoped>
.view-switcher,
.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.3rem 0.8rem;
  font-size: 14px;
  border: 1px solid #aaa;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button.active {
  background: #444;
  color: white;
}

.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.8rem;
}

.search-bar {
  margin-bottom: 1rem;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.reser-wrapper {
  margin-top: 0.5rem;
}

.reset-wrapper button {
  padding: 0.4rem 1rem;
  font-size: 14px;
  background: #eee;
  border: 1px solid #bbb;
  border-radius: 4px;
  cursor: pointer;
}

.reset-wrapper button:hover {
  background: #ddd;
}

.card {
  border: 1px solid #ccc;
  padding: 0.8rem;
  border-radius: 4px;
  background: #fafafa;
}

.list-view {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.list-item {
  border: 1px solid #ccc;
  padding: 0.8rem;
  border-radius: 4px;
  background: #fdfdfd;
}

.list-item h3 {
  margin: 0 0 0.3rem 0;
  font-size: 16px;
}

.list-item p {
  margin: 0 0 0.5rem 0;
  font-size: 14px;
  color: #666;
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 1.5rem;
  justify-content: center;
}

.pagination button {
  min-width: 32px;
  padding: 0.3rem 0.6rem;
  font-size: 13px;
  border-radius: 4px;
}

.pagination button.active {
  background: #444;
  color: white;
  font-weight: bold;
}
</style>
