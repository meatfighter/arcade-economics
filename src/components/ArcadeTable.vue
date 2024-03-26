<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import type { VDataTable } from 'vuetify/components'
import { reduce } from "@/reduce";
import { Game } from "@/game";
import { fetchGames } from "@/download";
import { useDisplay } from 'vuetify'

type ReadonlyHeaders = VDataTable['$props']['headers'];

const headerValues: ReadonlyHeaders = [
  {
    key: 'title',
    title: 'Title',
    align: 'start',
    sortable: true,
    width: '25%',
  },
  {
    key: 'year',
    title: 'Year',
    align: 'end',
    sortable: true,
    width: '25%',
  },
  {
    key: 'company',
    title: 'Company',
    align: 'start',
    sortable: true,
    width: '25%',
  },
  {
    key: 'inflated',
    title: 'Inflated ($)',
    align: 'end',
    sortable: true,
    width: '25%',
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

onMounted(async () => games.value = await fetchGames());
</script>

<template>
  <v-data-table
      :items="games"
      :headers="headers"
      :search="search"
      :custom-filter="searchFilter"
      :filter-keys="filterKeys"
      :loading="loading"
      :items-per-page-options="itemsPerPageOptions">
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
      {{ value.toFixed(2) }}
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:no-data>Nothing to see here.</template>
  </v-data-table>
</template>

<style scoped>

</style>