"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import { useDialer } from "@/hooks/useDialer";
import { useNumbers } from "@/hooks/useNumbers";
import type { NumbersFilters as NumbersFiltersType } from "@/store/numbersSlice";

import { DashboardHeaderActions } from "./DashboardHeaderActions";
import { DialerCard } from "./DialerCard";
import { NumbersFilters as NumbersFiltersPanel } from "./NumbersFilters";
import { NumbersTable } from "./NumbersTable";
import { StatsCard } from "./StatsCard";

export default function DashboardClient() {
  const numbers = useNumbers();
  const dialer = useDialer();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [status, setStatus] = useState<string>("all");
  const [verdict, setVerdict] = useState<string>("all");
  const [phone, setPhone] = useState("");

  const effectiveFilters = useMemo(() => {
    const f: NumbersFiltersType = {
      status: status === "all" ? undefined : status,
      verdict: verdict === "all" ? undefined : verdict,
      phone: phone.trim() ? phone.trim() : undefined,
    };
    return f;
  }, [phone, status, verdict]);

  useEffect(() => {
    numbers.updateFilters(effectiveFilters);
  }, [effectiveFilters, numbers]);

  // useEffect(() => {
  //   // Fetch on first mount + whenever filters/page-size/page change.
  //   numbers.refetch({ page, limit, filters: effectiveFilters });
  // }, [effectiveFilters, limit, numbers, page]);

  useEffect(() => {
    // Fetch on first mount + whenever filters/page-size/page change.
    numbers.refetch({ page, limit, filters: effectiveFilters });
  }, [limit, status, verdict, phone, page]);

  const lastUpdated = numbers.lastUpdatedAt
    ? `${formatDistanceToNowStrict(new Date(numbers.lastUpdatedAt))} ago`
    : "—";

  const pages = numbers.meta?.pages ?? 1;

  return (
    <div className="min-h-full flex-1 bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Numbers dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated:{" "}
              <span className="font-medium text-foreground">{lastUpdated}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard stats={numbers.stats} />

          <DialerCard
            status={dialer.status}
            lastUpdatedAt={dialer.lastUpdatedAt}
            onStart={dialer.start}
            onStop={dialer.stop}
            onRefresh={dialer.refresh}
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-row justify-between gap-4">
            <NumbersFiltersPanel
              phone={phone}
              setPhone={setPhone}
              status={status}
              setStatus={setStatus}
              verdict={verdict}
              setVerdict={setVerdict}
              limit={limit}
              setLimit={setLimit}
              setPage={setPage}
            />
            <DashboardHeaderActions
              setPage={setPage}
              onRefetch={() =>
                numbers.refetch({ page, limit, filters: effectiveFilters })
              }
              onDownloadCsv={() => numbers.downloadCsv(effectiveFilters)}
              onAddOne={numbers.addOne}
              onUploadCsv={numbers.uploadCsv}
            />
          </div>

          <NumbersTable
            loading={numbers.loading}
            rows={numbers.rows}
            error={numbers.error}
            page={page}
            setPage={setPage}
            pages={pages}
            total={numbers.meta?.total ?? null}
          />
        </div>
      </div>
    </div>
  );
}
