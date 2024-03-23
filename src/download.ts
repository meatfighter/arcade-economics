import { delay } from "@/delay";
import { Game } from "@/game";
import JSZip from "jszip";

const START_YEAR = 1971;

type SeriesData = {
    year: string;
    period: string;
    periodName: string;
    latest: string;
    value: string;
    footnotes: {}[];
};

type Series = {
    seriesID: string;
    data: SeriesData[];
};

type SeriesResults = {
    series: Series[];
};

type SeriesResponse = {
    status: string;
    responseTime: number;
    message: string[];
    Results: SeriesResults;
};

async function fetchInflationData(startYear: number, endYear: number): Promise<SeriesResponse> {

    console.log(`https://api.bls.gov/publicAPI/v2/timeseries/data`
        + `?seriesid=CUUR0000SA0&startyear=${startYear}&endyear=${endYear}&catalog=false`
        + `&calculations=false&annualaverage=true&aspects=false`);


    // while (true) {
        try {
            const response = await fetch(`https://api.bls.gov/publicAPI/v2/timeseries/data/`
                    + `seriesid=CUUR0000SA0&startyear=${startYear}&endyear=${endYear}&catalog=false&`
                    + `calculations=false&annualaverage=true&aspects=false`);
            if (!response.ok) {
                await delay();
                // continue;
            }
            return await response.json();
        } catch {
            await delay();
        }
    // }
    return { } as SeriesResponse;
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
                const company = tokens[i++];
                if (!year) {
                    break;
                }
                games.push(new Game(title, year, company));
            }
            return games;
        } catch {
            await delay();
        }
    }
}

function assignInflatedValues(games: Game[], responses: SeriesResponse[]) {
    const values: number[] = [];
    const periods: string[] = [];
    for (const response of responses) {
        for (const entry of response.Results.series[0].data) {
            const index = +entry.year - START_YEAR;
            if (!periods[index] || periods[index] < entry.period) {
                periods[index] = entry.period;
                values[index] = +entry.value;
            }
        }
    }
    for (let i = values.length - 1; i >= 0; --i) {
        values[i] *= 0.25 / values[0];
    }
    games.forEach(game => game.inflated = values[game.year - START_YEAR]);
}

export async function fetchGames(): Promise<Game[]> {
    const seriesPromises: Promise<SeriesResponse>[] = [];
    const currentYear: number = new Date().getFullYear();
    for (let year = START_YEAR; year <= currentYear; year += 10) {
        seriesPromises.push(fetchInflationData(year, Math.min(currentYear, year + 9)));
    }
    const games: Game[] = await fetchGameDescriptions();
    assignInflatedValues(games, await Promise.all(seriesPromises));
    return games;
}






























