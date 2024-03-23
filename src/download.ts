import { delay } from "@/delay";
import { Game } from "@/game";
import JSZip from "jszip";

export async function downloadGames() {
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