"use client";

import type { Dispatch, SetStateAction } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NumbersFilters({
  phone,
  setPhone,
  status,
  setStatus,
  verdict,
  setVerdict,
  limit,
  setLimit,
  setPage,
}: {
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  verdict: string;
  setVerdict: Dispatch<SetStateAction<string>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex flex-row justify-between gap-4">
      <div className="md:col-span-2 space-y-2">
        <Label>Search phone</Label>
        <Input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setPage(1);
          }}
          placeholder="+1415"
        />
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={status}
          onValueChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="not_started">not_started</SelectItem>
            <SelectItem value="pending">pending</SelectItem>
            <SelectItem value="done">done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Verdict</Label>
        <Select
          value={verdict}
          onValueChange={(v) => {
            setVerdict(v);
            setPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="IN_SERVICE">IN_SERVICE</SelectItem>
            <SelectItem value="OUT_OF_SERVICE">OUT_OF_SERVICE</SelectItem>
            <SelectItem value="LIKELY_ACTIVE">LIKELY_ACTIVE</SelectItem>
            <SelectItem value="AMBIGUOUS">AMBIGUOUS</SelectItem>
            <SelectItem value="INVALID">INVALID</SelectItem>
            <SelectItem value="UNKNOWN">UNKNOWN</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Page size</Label>
        <Select
          value={String(limit)}
          onValueChange={(v) => {
            setLimit(Number(v));
            setPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
