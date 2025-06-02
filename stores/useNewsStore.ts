import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", {
  state: () => ({
    allArticles: [] as any[],
    articles: [] as any[],
    currentPage: 1,
    pageSize: 6,
    loading: false,
    activeFilter: "all",
    viewMode: "grid" as "grid" | "list",

    sources: [
      {
        name: "Mos.ru",
        url: "https://mos.ru/rss",
        key: "mos.ru",
      },
      {
        name: "Lenta.ru",
        url: "https://lenta.ru/rss",
        key: "lenta.ru",
      },
    ],
  }),

  getters: {
    paginatedArticles(state) {
      const start = (state.currentPage - 1) * state.pageSize;
      return state.articles.slice(start, start + state.pageSize);
    },
    totalPages(state) {
      return Math.ceil(state.articles.length / state.pageSize);
    },
  },

  actions: {
    async fetchArticles() {
      this.loading = true;
      try {
        const results = await Promise.all(
          this.sources.map((src) => $fetch(`/api/rss?source=${src.url}`))
        );
        this.allArticles = results.flat();
        this.applyFilter();
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    applyFilter() {
      if (this.activeFilter === "all") {
        this.articles = this.allArticles;
      } else {
        this.articles = this.allArticles.filter(
          (a) => new URL(`https://${a.source}`).hostname === this.activeFilter
        );
      }
      this.currentPage = 1;
    },

    setFilter(filter: string) {
      this.activeFilter = filter;
      this.applyFilter();
    },

    setViewMode(mode: "grid" | "list") {
      this.viewMode = mode;
      localStorage.setItem("viewMode", mode);
    },

    initViewMode() {
      const saved = localStorage.getItem("viewMode");
      if (saved === "grid" || saved === "list") {
        this.viewMode = saved;
      }
    },

    setPage(page: number) {
      this.currentPage = page;
    },
  },
});
