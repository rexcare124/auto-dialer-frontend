"use client";

import type { Dispatch, SetStateAction } from "react";

import type { PhoneNumberRow } from "@/lib/types";

import moment from "moment";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StatusBadge } from "./StatusBadge";

export function NumbersTable({
  loading,
  rows,
  error,
  page,
  setPage,
  pages,
  total,
}: {
  loading: boolean;
  rows: PhoneNumberRow[];
  error?: string | null;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pages: number;
  total?: number | null;
}) {
  const canPrev = page > 1;
  const canNext = page < pages;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Numbers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Showing page{" "}
            <span className="font-medium text-foreground">{page}</span> of{" "}
            <span className="font-medium text-foreground">{pages}</span>{" "}
            {typeof total === "number" ? (
              <>
                • total{" "}
                <span className="font-medium text-foreground">{total}</span>
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={!canPrev}
              onClick={() => {
                const nextPage = Math.max(1, page - 1);
                setPage(nextPage);
              }}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              disabled={!canNext}
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
              }}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">ID</TableHead>
                <TableHead className="min-w-[160px]">Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="min-w-[180px]">Note</TableHead>
                <TableHead className="min-w-[160px]">Created</TableHead>
                <TableHead className="min-w-[160px]">Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    Loading…
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No numbers found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono text-xs">
                      {row.id}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {row.phone_number}
                    </TableCell>
                    <TableCell>
                      <StatusBadge row={row} />
                    </TableCell>
                    <TableCell className="text-sm">{row.note ?? "—"}</TableCell>
                    <TableCell className="text-sm">
                      {moment(row.created_at).format("DD/MM/YYYY HH:mm:ss")}
                    </TableCell>
                    <TableCell className="text-sm">
                      {row.completed_at
                        ? moment(row.completed_at).format("DD/MM/YYYY HH:mm:ss")
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </CardContent>
    </Card>
  );
}
