interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;

    convertToUtc(date: Date): string;

    addDays(date: Date, daysToAdd: number): Date;

    addHours(date: Date, hoursToAdd: number): Date;

    dateNow(): Date;

    compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
