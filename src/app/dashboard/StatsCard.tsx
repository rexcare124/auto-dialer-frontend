"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function StatsCard({
  stats,
}: {
  stats?:
    | {
        total: number;
        not_started: number;
        pending: number;
        done: number;
        in_service: number;
        out_of_service: number;
        unknown: number;
      }
    | null;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="font-medium">{stats?.total ?? "—"}</span>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Not started</span>
            <span className="font-medium">{stats?.not_started ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Pending</span>
            <span className="font-medium">{stats?.pending ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Done</span>
            <span className="font-medium">{stats?.done ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">In service</span>
            <span className="font-medium">{stats?.in_service ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Out of service</span>
            <span className="font-medium">{stats?.out_of_service ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Unknown</span>
            <span className="font-medium">{stats?.unknown ?? "—"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

