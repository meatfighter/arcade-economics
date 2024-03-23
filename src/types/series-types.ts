export type SeriesData = {
    year: string;
    period: string;
    periodName: string;
    latest: string;
    value: string;
    footnotes: {}[];
};

export type SeriesTypes = {
    seriesID: string;
    data: SeriesData[];
};

export type SeriesResults = {
    series: SeriesTypes[];
};

export type SeriesResponse = {
    status: string;
    responseTime: number;
    message: string[];
    Results: SeriesResults;
};