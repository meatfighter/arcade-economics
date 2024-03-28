import { delay } from "@/utils/delay";
import { Game } from "@/types/game";
import JSZip from "jszip";
import { SeriesResponse } from "@/types/series-types";
import { useSeriesStore } from "@/store/series-store";

const START_YEAR = 1971;

async function fetchInflationData(startYear: number, endYear: number): Promise<SeriesResponse> {
    console.log('fetchInflationData'); // TODO REMOVE
    while (true) {
        try {
            console.log('--1'); // TODO REMOVE
            const response = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
                method: 'POST',
                mode: "cors",
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `seriesid=CUUR0000SA0&startyear=${startYear}&endyear=${endYear}&catalog=false`
                        + `&calculations=false&annualaverage=true&aspects=false`,
            });
            console.log('--2'); // TODO REMOVE
            if (!response.ok) {
                console.log('--3'); // TODO REMOVE
                await delay();
                continue;
            }
            console.log('--4'); // TODO REMOVE
            return await response.json();
        } catch {
            console.log('--5'); // TODO REMOVE
            await delay();
        }
    }
}

async function fetchGameDescriptions(): Promise<Game[]> {
    while (true) {
        try {
            const response = await fetch('games.zip');
            if (!response.ok) {
                await delay();
                continue;
            }
            const tokens = (await (await new JSZip().loadAsync(await response.blob())).file('games.txt')!
                    .async('string')).split(/[|\n]/);

            const games: Game[] = [];
            let i = 0;
            while (true) {
                const title = tokens[i++];
                const year = +tokens[i++];
                let company = tokens[i++];
                if (!year) {
                    break;
                }
                if (!company || company.length === 0) {
                    company = 'Unknown';
                }
                games.push(new Game(title, year, company));
            }
            return games;
        } catch {
            await delay();
        }
    }
}

function getMinYear(response: SeriesResponse) {
    if (!response.Results.series || !response.Results.series[0].data) {
        return -1;
    }
    let minYear = Number.MAX_SAFE_INTEGER;
    for (const entry of response.Results.series[0].data) {
        minYear = Math.min(minYear, +entry.year);
    }
    return minYear;
}

function cacheSeriesResponses(responses: SeriesResponse[]): SeriesResponse[] {
    const store = useSeriesStore();
    const rs: SeriesResponse[] = store.loadSeriesResponses() || [];
    for (let i = responses.length - 1; i >= 0; --i) {
        const response = responses[i];
        if (response.status !== 'REQUEST_SUCCEEDED') {
            responses.splice(i, 1);
        } else {
            const minYear = getMinYear(response);
            for (let j = rs.length - 1; j >= 0; --j) {
                const r = rs[j];
                if (getMinYear(r) === minYear) {
                    rs.splice(j, 1);
                    break;
                }
            }
        }
    }
    responses.push(...rs);
    store.saveSeriesResponses(responses);
    return responses;
}

function assignInflatedValues(games: Game[], responses: SeriesResponse[]) {
    const values: number[] = [];
    const periods: string[] = [];
    for (const response of responses) {
        console.log(response); // TODO REMOVE
        if (response.status !== 'REQUEST_SUCCEEDED' || !response.Results.series || !response.Results.series[0].data) {
            continue;
        }
        for (const entry of response.Results.series[0].data) {
            const index = +entry.year - START_YEAR;
            if (!periods[index] || periods[index] < entry.period) {
                periods[index] = entry.period;
                values[index] = +entry.value;
            }
        }
    }
    const current = values[values.length - 1];
    for (let i = values.length - 1; i >= 0; --i) {
        values[i] = 0.25 * current / values[i];
    }
    games.forEach(game => game.inflated = values[game.year - START_YEAR]);
}

export async function fetchGames(): Promise<Game[]> {
    const seriesPromises: Promise<SeriesResponse>[] = [];
    const currentYear: number = new Date().getFullYear();
    for (let year = START_YEAR; year <= currentYear; year += 10) {
        console.log(`fetch: ${year}`); // TODO REMOVE
        seriesPromises.push(fetchInflationData(year, year + 9));
    }
    const games: Game[] = await fetchGameDescriptions();
    const responses: SeriesResponse[] = cacheSeriesResponses(await Promise.all(seriesPromises));
    assignInflatedValues(games, responses);
    return games;
}






























