"use client";

import type { PhoneNumberRow } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function StatusBadge({ row }: { row: PhoneNumberRow }) {
  const statusVariant =
    row.status === "done"
      ? "default"
      : row.status === "pending"
        ? "secondary"
        : "outline";

  const verdictVariant =
    row.verdict === "IN_SERVICE"
      ? "default"
      : row.verdict === "OUT_OF_SERVICE" || row.verdict === "INVALID"
        ? "destructive"
        : "secondary";

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant={statusVariant} className="capitalize">
        {row.status}
      </Badge>
      {row.verdict ? (
        <Badge variant={verdictVariant} className="capitalize">
          {row.verdict}
        </Badge>
      ) : (
        <Badge variant="outline">—</Badge>
      )}
    </div>
  );
}
