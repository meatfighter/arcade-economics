<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Ref } from 'vue';
import type { VDataTable } from 'vuetify/components'
import { reduce } from "@/reduce";
import { Game } from "@/game";
import {fetchGames} from "@/download";

type ReadonlyHeaders = VDataTable['$props']['headers'];

const headers: ReadonlyHeaders = [
  {
    key: 'title',
    title: 'Title',
    align: 'start',
    sortable: true,
  },
  {
    key: 'year',
    title: 'Year',
    align: 'end',
    sortable: true,
  },
  {
    key: 'company',
    title: 'Company',
    align: 'start',
    sortable: true,
  },
  {
    key: 'inflated',
    title: 'Inflated ($)',
    align: 'end',
    sortable: true,
  },
];

const games: Ref<Game[] | undefined> = ref(undefined);
const search: Ref<string> = ref('');
const loading: Ref<boolean> = computed(() => games.value === undefined);

let lastQuery = '';
let reducedQuery = '';
let lastRowIndex = -1;
let lastRowValue = false;

function searchFilter(_: string, query: string, item?: any) {
  if (query !== lastQuery) {
    lastQuery = query;
    reducedQuery = reduce(query);
    lastRowIndex = -1;
  }

  if (item.index === lastRowIndex) {
    return lastRowValue;
  }
  lastRowIndex = item.index;

  const i = item.raw;
  lastRowValue = i.reducedTitle.indexOf(reducedQuery) >= 0 || i.reducedCompany.indexOf(reducedQuery) >= 0;
  return lastRowValue;
}

onMounted(async () => games.value = await fetchGames());
</script>

<template>
  <v-data-table
      :items="games"
      :headers="headers"
      :search="search"
      :custom-filter="searchFilter"
      :loading="loading">
    <template v-slot:top>
      <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
      ></v-text-field>
    </template>
    <template v-slot:item.inflated="{ value }">
      {{ value.toFixed(2) }}
    </template>
    <template v-slot:item.deflated="{ value }">
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