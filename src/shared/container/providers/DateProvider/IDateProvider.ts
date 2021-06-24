interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;

    convertToUtc(date: Date): string;

    addDays(date: Date, daysToAdd: number): Date;

    addHours(date: Date, hoursToAdd: number): Date;

    addSeconds(date: Date, secondsToAdd: number): Date;

    dateNow(): Date;

    compareInDays(start_date: Date, end_date: Date): number;

    expired(date_to_check: Date, date_reference: Date): boolean;
}

export { IDateProvider };
