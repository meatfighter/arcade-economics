import { delay } from "@/utils/delay";
import { Game } from "@/types/game";
import JSZip from "jszip";

const START_YEAR = 1971;

async function downloadGameDescriptions(): Promise<Game[]> {
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

async function downloadInflatedValues(): Promise<number[]> {
    while (true) {
        try {
            const response = await fetch('inflated-values.txt');
            if (!response.ok) {
                await delay();
                continue;
            }
            const tokens = (await response.text()).split(/\r?\n/);
            const values: number[] = [];
            for (let i = 2; i < tokens.length; ++i) {
                values.push(parseFloat(tokens[i]));
            }
            return values;
        } catch {
            await delay();
        }
    }
}

export async function downloadGames(): Promise<Game[]> {
    const [ games, values ] = await Promise.all([ downloadGameDescriptions(), downloadInflatedValues() ]);
    games.forEach(game => game.inflated = values[game.year - START_YEAR]);
    return games;
}






























