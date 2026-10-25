import { EventsList } from "@/components/admin/sections/events/eventsList/eventsList";
import { Pagination } from "@/components/admin/shared/pagination";
import { RowsPerPage } from "@/components/admin/shared/rowsPerPage";
import { SearchBar } from "@/components/admin/shared/searchBar";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { getCountEvents } from "@/data/events";
import {
  getFormattedEventsLimit,
  getFormattedPage,
  getFormattedQuery,
  ROWS_PER_PAGE_EVENTS,
} from "@/lib/searchParams";
import { getTranslations } from "next-intl/server";

export default async function Events({
  searchParams,
}: {
  searchParams: Promise<{
    limit?: string | string[];
    page?: string | string[];
    query?: string | string[];
  }>;
}) {
  const t = await getTranslations("Admin.Events");
  const { limit, page, query } = await searchParams;

  const formattedQuery = getFormattedQuery(query);
  const formattedLimit = getFormattedEventsLimit(limit);
  const formattedPage = getFormattedPage(page);

  const countEvents = await getCountEvents(formattedQuery);
  const totalPages = countEvents === 0 ? 1 : Math.ceil(countEvents / formattedLimit);
  const currentPage = formattedPage > totalPages ? totalPages : formattedPage;

  const persistedParams = {
    limit: formattedLimit,
    page: currentPage,
    query: formattedQuery,
  };

  return (
    <>
      <SectionHeader
        title={t("title")}
        label={t("label", { events: countEvents })}
        action={{ btnLabel: t("addingBtn"), pathname: "/admin/events/create" }}
      />
      <div className="flex items-center gap-4">
        <SearchBar placeholder={"Search by title, date, client..."} />
      </div>
      <div className="flex flex-col gap-4">
        <EventsList persistedParams={persistedParams} />
        {countEvents > 0 && (
          <div className="flex flex-row justify-between px-4 md:px-0">
            <RowsPerPage
              limitsOption={ROWS_PER_PAGE_EVENTS}
              persistedParams={persistedParams}
              pathname="/admin/events"
            />
            <Pagination
              totalPages={totalPages}
              persistedParams={persistedParams}
              pathname="/admin/events"
            />
          </div>
        )}
      </div>
    </>
  );
}
