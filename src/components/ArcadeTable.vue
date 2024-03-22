<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { VDataTable } from 'vuetify/components'

type ReadonlyHeaders = VDataTable['$props']['headers'];

interface Item {
  title: string;
  reducedTitle: string;
  year: number;
  company: string;
  reducedCompany: string;
  inflated: number;
  deflated: number;
}

const items: Item[] = [
  {
    title: 'Frogger',
    year: 1981,
    company: 'Konami Industry Company, Limited',
    inflated: 0.88,
    deflated: 0.07,
    reducedTitle: '',
    reducedCompany: '',
  },
  {
    title: 'Frogs',
    year: 1978,
    company: 'Gremlin',
    inflated: 1.23,
    deflated: 0.05,
    reducedTitle: '',
    reducedCompany: '',
  },
  {
    title: 'Front Line',
    year: 1982,
    company: 'Taito',
    inflated: 0.82,
    deflated: 0.08,
    reducedTitle: '',
    reducedCompany: '',
  },
  {
    title: 'Fruit land',
    year: 2006,
    company: 'Unknown',
    inflated: 0.39,
    deflated: 0.16,
    reducedTitle: '',
    reducedCompany: '',
  },
  {
    title: 'Fruit Star',
    year: 1992,
    company: 'Fun World',
    inflated: 0.56,
    deflated: 0.11,
    reducedTitle: '',
    reducedCompany: '',
  },
  {
    title: 'Fu\'un - Super Tag Battle [Special Version]',
    year: 1996,
    company: 'SNK [Shin Nihon Kikaku]',
    inflated: 0.50,
    deflated: 0.13,
    reducedTitle: '',
    reducedCompany: '',
  },
  {
    title: 'Fujiyama Buster',
    year: 1992,
    company: 'Kaneko',
    inflated: 0.56,
    deflated: 0.11,
    reducedTitle: '',
    reducedCompany: '',
  },
  {
    title: 'Full Throttle',
    year: 1987,
    company: 'Taito corp',
    inflated: 0.70,
    deflated: 0.09,
    reducedTitle: '',
    reducedCompany: '',
  },
  {
    title: 'Fun Casino',
    year: 1983,
    company: 'Status Games Corp',
    inflated: 0.79,
    deflated: 0.08,
    reducedTitle: '',
    reducedCompany: '',
  },
  {
    title: 'Fun Four',
    year: 1976,
    company: 'Bailey International Inc',
    inflated: 1.39,
    deflated: 0.04,
    reducedTitle: '',
    reducedCompany: '',
  },
];

items.forEach(item => {
  item.reducedTitle = removeNonAlphaNumericAndLowercase(item.title);
  item.reducedCompany = removeNonAlphaNumericAndLowercase(item.company);
});

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
  {
    key: 'deflated',
    title: 'Deflated ($)',
    align: 'end',
    sortable: true,
  },
];

const search: Ref<string> = ref('');
const loading: Ref<boolean> = ref(false);

function removeNonAlphaNumericAndLowercase(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

let lastQuery = '';
let reducedQuery = '';
let lastRowIndex = -1;
let lastRowValue = false;

function searchFilter(value: string, query: string, item?: any) {
  if (item.index === lastRowIndex) {
    return lastRowValue;
  }
  lastRowIndex = item.index;
  if (query !== lastQuery) {
    lastQuery = query;
    reducedQuery = removeNonAlphaNumericAndLowercase(query);
  }
  const i = item.raw;
  lastRowValue = i.reducedTitle.indexOf(reducedQuery) >= 0 || i.reducedCompany.indexOf(reducedQuery) >= 0;
  return lastRowValue;
}
</script>

<template>
    <v-data-table
        :items="items"
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
    </v-data-table>
</template>

<style scoped>

</style>