export type PersistedParams = {
  page: ReturnType<typeof getFormattedPage>;
  limit: ReturnType<typeof getFormattedLimit>;
  query: ReturnType<typeof getFormattedQuery>;
  filter: ReturnType<typeof getFormattedFilter>;
};

export type limitType = ReturnType<typeof getFormattedLimit>;

export const ROWS_PER_PAGE = [6, 12, 18, 24] as const;

export function getFormattedLimit(rawLimit: string | string[] | undefined) {
  return ROWS_PER_PAGE.find((rows) => String(rows) === rawLimit) ?? ROWS_PER_PAGE[0];
}

export function getFormattedPage(rawPage: string | string[] | undefined) {
  const stringToNumber = Number(rawPage);

  if (!stringToNumber || stringToNumber < 1 || !Number.isInteger(stringToNumber)) return 1;

  return stringToNumber;
}

export function getFormattedQuery(rawQuery: string | string[] | undefined) {
  if (typeof rawQuery !== "string") return undefined;

  const formatted = rawQuery.trim().slice(0, 100);

  if (!formatted.length) return undefined;

  return formatted;
}

export type FilterType = ReturnType<typeof getFormattedFilter>;

export function getFormattedFilter(rawFilter: string | string[] | undefined) {
  switch (rawFilter) {
    case "active":
    case "past":
    case "no-event":
      return rawFilter;
    default:
      return undefined;
  }
}
