import { TZDate } from "@date-fns/tz";

const TIME_ZONE = "Europe/Warsaw";

function toWarsawDate(date: string, time: string, addDays = 0) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(new TZDate(year, month - 1, day + addDays, hours, minutes, TIME_ZONE).getTime());
}

/**
 * Converts form values (date "YYYY-MM-DD", times "HH:MM") into Event fields.
 * - eventDate: UTC midnight, as expected by the @db.Date column.
 * - startsAt / endsAt: exact moments in Polish time, or null when the time is not known yet.
 * An end time earlier than (or equal to) the start time means the event ends the next day.
 * Without a start time, an end time before noon is treated as the next day.
 */
export function toEventDates(date: string, startTime?: string, endTime?: string) {
  const eventDate = new Date(`${date}T00:00:00.000Z`);
  const startsAt = startTime ? toWarsawDate(date, startTime) : null;

  let endsAt: Date | null = null;
  if (endTime) {
    const endsNextDay = startTime ? endTime <= startTime : endTime < "12:00";
    endsAt = toWarsawDate(date, endTime, endsNextDay ? 1 : 0);
  }

  return { eventDate, startsAt, endsAt };
}
