import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { SeriesResponse } from "@/types/series-types";

const KEY = 'arcade-economics-series-responses';

export const useSeriesStore = defineStore(KEY, () => {
    const responses = ref<SeriesResponse[] | any>(useLocalStorage(KEY, []));

    function loadSeriesResponses() {
        return responses.value;
    }

    function saveSeriesResponses(rs: SeriesResponse[]) {
        responses.value = rs;
    }

    return { loadSeriesResponses, saveSeriesResponses };
});
