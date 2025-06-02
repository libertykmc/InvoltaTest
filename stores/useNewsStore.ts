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
    query: "",

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
      const filterBySource =
        this.activeFilter === "all"
          ? this.allArticles
          : this.allArticles.filter(
              (a) =>
                new URL(`https://${a.source}`).hostname === this.activeFilter
            );

      const q = this.query.toLowerCase().trim();
      const filterByQuery = q
        ? filterBySource.filter(
            (a) =>
              a.title.toLowerCase().includes(q) ||
              a.description.toLowerCase().includes(q)
          )
        : filterBySource;

      this.articles = filterByQuery;
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

    setQuery(query: string) {
      this.query = query;
      this.applyFilter();
    },

    resetFilters() {
      this.activeFilter = "all";
      this.query = "";
      this.currentPage = 1;
      this.applyFilter();
    },
  },
});
