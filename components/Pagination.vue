<template>
  <div class="pagination">
    <button
      v-for="item in pages"
      :key="item.key"
      :disabled="item.type === 'dots'"
      :class="{ active: item.page === modelValue, dots: item.type === 'dots' }"
      @click="item.type !== 'dots' && changePage(item.page)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const changePage = (page: number) => {
  if (page !== props.modelValue && page > 0 && page <= props.totalPages) {
    emit("update:modelValue", page);
  }
};

const pages = computed(() => {
  const pagesToShow: {
    type: "page" | "dots";
    page: number;
    label: string;
    key: string;
  }[] = [];

  const addPage = (page: number) => {
    pagesToShow.push({
      type: "page",
      page,
      label: String(page),
      key: `page-${page}`,
    });
  };

  const addDots = (key: string) => {
    pagesToShow.push({
      type: "dots",
      page: -1,
      label: "...",
      key,
    });
  };

  const { modelValue, totalPages } = props;

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) addPage(i);
  } else {
    addPage(1);

    if (modelValue <= 4) {
      for (let i = 2; i <= 5; i++) addPage(i);
      addDots("dots-right");
    } else if (modelValue >= totalPages - 3) {
      addDots("dots-left");
      for (let i = totalPages - 4; i < totalPages; i++) addPage(i);
    } else {
      addDots("dots-left");
      for (let i = modelValue - 1; i <= modelValue + 1; i++) addPage(i);
      addDots("dots-right");
    }

    addPage(totalPages);
  }

  return pagesToShow;
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}

button {
  background: none;
  border: none;
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  padding: 2px 6px;
  color: #000;
  transition: color 0.2s;
}

button:hover:not(.dots) {
  color: #0057ff;
}

button.active {
  color: #0057ff;
}

button.dots {
  cursor: default;
  color: #999;
}
</style>
