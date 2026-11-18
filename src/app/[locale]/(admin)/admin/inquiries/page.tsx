import { InquiriesList } from "@/components/admin/sections/inquiries/inquiriesList/inquiriesList";
import { Filters } from "@/components/admin/shared/filters";
import { Pagination } from "@/components/admin/shared/pagination";
import { RowsPerPage } from "@/components/admin/shared/rowsPerPage";
import { SearchBar } from "@/components/admin/shared/searchBar";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { InquiriesListSkeleton } from "@/components/admin/skeletons/inquiriesListSkeleton";
import { filtersInquiriesData } from "@/constants/admin/filtersOptions";
import { getCountInquiries } from "@/data/inquiries";
import {
  getFormattedEventsLimit,
  getFormattedInquiryFilter,
  getFormattedPage,
  getFormattedQuery,
  InquiryFilterType,
  PersistedParams,
  ROWS_PER_PAGE_EVENTS,
} from "@/lib/searchParams";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function Inquiries({
  searchParams,
}: {
  searchParams: Promise<{
    limit?: string | string[];
    page?: string | string[];
    query?: string | string[];
    filter?: string | string[];
  }>;
}) {
  const t = await getTranslations("Admin.Inquiries");
  const { limit, page, query, filter } = await searchParams;

  // Cards like the events list, so the same rows-per-page options
  const formattedLimit = getFormattedEventsLimit(limit);
  const formattedPage = getFormattedPage(page);
  const formattedQuery = getFormattedQuery(query);
  const formattedFilter = getFormattedInquiryFilter(filter);

  const countInquiries = await getCountInquiries(formattedQuery, formattedFilter);
  const totalPages = countInquiries === 0 ? 1 : Math.ceil(countInquiries / formattedLimit);
  const currentPage = formattedPage > totalPages ? totalPages : formattedPage;

  const persistedParams: PersistedParams<InquiryFilterType> = {
    page: currentPage,
    limit: formattedLimit,
    query: formattedQuery,
    filter: formattedFilter,
  };

  return (
    <>
      <SectionHeader title={t("title")} label={t("count", { count: countInquiries })} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <SearchBar placeholder={t("searchBar.placeholder")} />
        <Filters
          t={t}
          pathname="/admin/inquiries"
          filters={filtersInquiriesData}
          persistedParams={persistedParams}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Suspense
          key={`${currentPage}-${formattedLimit}-${formattedQuery}-${formattedFilter}`}
          fallback={<InquiriesListSkeleton count={formattedLimit} />}
        >
          <InquiriesList persistedParams={persistedParams} />
        </Suspense>

        {countInquiries > 0 && (
          <div className="flex flex-row justify-between px-4 md:px-0">
            <RowsPerPage
              limitsOption={ROWS_PER_PAGE_EVENTS}
              persistedParams={persistedParams}
              pathname="/admin/inquiries"
            />
            <Pagination
              persistedParams={persistedParams}
              totalPages={totalPages}
              pathname="/admin/inquiries"
            />
          </div>
        )}
      </div>
    </>
  );
}
