import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    expired(date_to_check: Date, date_reference: Date): boolean {
        return dayjs(date_to_check)
            .utc()
            .local()
            .isBefore(dayjs(date_reference).utc().local());
    }

    addSeconds(date: Date, secondsToAdd: number): Date {
        return dayjs(date).utc().local().add(secondsToAdd, "second").toDate();
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const start_date_utc = this.convertToUtc(start_date);
        const end_date_utc = this.convertToUtc(end_date);
        return dayjs(start_date_utc).diff(end_date_utc, "days");
    }

    compareInHours(start_date: Date, end_date: Date): number {
        const start_date_utc = this.convertToUtc(start_date);
        const end_date_utc = this.convertToUtc(end_date);
        return dayjs(start_date_utc).diff(end_date_utc, "hours");
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    addDays(date: Date, daysToAdd: number): Date {
        return dayjs(date).utc().local().add(daysToAdd, "day").toDate();
    }
    addHours(date: Date, hoursToAdd: number): Date {
        return dayjs(date).utc().local().add(hoursToAdd, "hour").toDate();
    }
}

export { DayjsDateProvider };
