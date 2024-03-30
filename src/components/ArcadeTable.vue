<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import type { VDataTable } from 'vuetify/components'
import { reduce } from "@/utils/reduce";
import { Game } from "@/types/game";
import { downloadGames } from "@/services/download";
import { useDisplay } from 'vuetify'

type ReadonlyHeaders = VDataTable['$props']['headers'];
type SortItems = VDataTable['$props']['sortBy'];

const headerValues: ReadonlyHeaders = [
  {
    key: 'title',
    title: 'Title',
    align: 'start',
    width: '40%',
    sortable: true,
    sortRaw: (a, b) => a.reducedTitle.localeCompare(b.reducedTitle),
  },
  {
    key: 'year',
    title: 'Year',
    align: 'end',
    width: '10%',
    sortable: true,
  },
  {
    key: 'company',
    title: 'Company',
    align: 'start',
    width: '40%',
    sortable: true,
    sortRaw: (a, b) => a.reducedCompany.localeCompare(b.reducedCompany),
  },
  {
    key: 'inflated',
    title: 'Inflated ($)',
    align: 'end',
    width: '10%',
    sortable: true,
    headerProps: {
      class: 'text-no-wrap',
    },
  },
];

const { xs } = useDisplay();
const largeHeaderValues = [ headerValues[0], headerValues[1], headerValues[2], headerValues[3] ];
const smallHeaderValues = [ headerValues[0], headerValues[1], headerValues[3] ];
const headers: Ref<ReadonlyHeaders> = computed(() => xs.value ? smallHeaderValues : largeHeaderValues);


const games: Ref<Game[] | undefined> = ref(undefined);
const search: Ref<string> = ref('');
const loading: Ref<boolean> = computed(() => games.value === undefined);

let reducedQuery = '';

watch(search, () => reducedQuery = reduce(search.value));

function searchFilter(value: string, query: string, item?: any) {
  return item.raw.reducedTitle.indexOf(reducedQuery) >= 0 || item.raw.reducedCompany.indexOf(reducedQuery) >= 0;
}

const filterKeys = [ 'title' ];

const itemsPerPageOptions = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
];

const sortBy: Ref<SortItems> = ref([{
  key: 'title',
  order: 'asc',
}]);

onMounted(async () => games.value = await downloadGames());
</script>

<template>
  <v-data-table
      :items="games"
      :headers="headers"
      :search="search"
      :custom-filter="searchFilter"
      :filter-keys="filterKeys"
      :loading="loading"
      :items-per-page-options="itemsPerPageOptions"
      :must-sort="true"
      v-model:sort-by="sortBy">
    <template v-slot:top>
      <v-text-field
          v-model="search"
          label="Search arcade title"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
      ></v-text-field>
    </template>
    <template v-slot:item.inflated="{ value }">
      {{ value ? value.toFixed(2) : 'N/A' }}
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:no-data>Nothing to see here.</template>
  </v-data-table>
</template>

<style scoped>

</style>