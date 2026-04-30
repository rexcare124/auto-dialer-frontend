"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { PauseIcon, PlayIcon, RefreshCwIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { DialerStatus } from "@/lib/types";

export function DialerCard({
  status,
  lastUpdatedAt,
  onStart,
  onStop,
  onRefresh,
}: {
  status?: DialerStatus | null;
  lastUpdatedAt?: string | null;
  onStart: () => void;
  onStop: () => void;
  onRefresh: () => void;
}) {
  const dialerUpdated = lastUpdatedAt ? `${formatDistanceToNowStrict(new Date(lastUpdatedAt))} ago` : "—";

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">Dialer / checker service</CardTitle>
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCwIcon className="mr-2 size-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={status?.running ? "default" : "secondary"}>{status?.running ? "running" : "stopped"}</Badge>
          <span className="text-sm text-muted-foreground">
            Last checked: <span className="font-medium text-foreground">{dialerUpdated}</span>
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          <div>
            <div className="text-muted-foreground">Current number</div>
            <div className="font-medium">{status?.currentNumber ?? "—"}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Total dialed</div>
            <div className="font-medium">{status?.totalDialed ?? "—"}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Started at</div>
            <div className="font-medium">{status?.startedAt ?? "—"}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onStart} disabled={!!status?.running}>
            <PlayIcon className="mr-2 size-4" />
            Start
          </Button>
          <Button variant="secondary" onClick={onStop} disabled={!status?.running}>
            <PauseIcon className="mr-2 size-4" />
            Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

