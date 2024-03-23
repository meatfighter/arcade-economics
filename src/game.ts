import { reduce } from './reduce';

export class Game {
    title: string;
    reducedTitle: string;
    year: number;
    company: string;
    reducedCompany: string;
    inflated: number;
    deflated: number;

    constructor(title: string, year: number, company: string) {
        this.title = title;
        this.reducedTitle = reduce(title);
        this.year = year;
        this.company = company;
        this.reducedCompany = reduce(company);
        this.inflated = 0;
        this.deflated = 0;
    }
}