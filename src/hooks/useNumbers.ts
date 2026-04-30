"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addPhoneNumber,
  fetchNumbers,
  fetchNumbersStats,
  setFilters,
  uploadNumbersCsv,
  type NumbersFilters,
} from "@/store/numbersSlice";

export function useNumbers() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.numbers);

  const refetch = useCallback(
    async (args: { page: number; limit: number; filters: NumbersFilters }) => {
      await dispatch(fetchNumbers(args));
      dispatch(fetchNumbersStats());
    },
    [dispatch],
  );

  const updateFilters = useCallback(
    (filters: NumbersFilters) => {
      dispatch(setFilters(filters));
    },
    [dispatch],
  );

  const addOne = useCallback(
    async (body: { phone_number: string; note?: string }) => {
      const t = toast.loading("Adding phone number…");
      try {
        await dispatch(addPhoneNumber(body)).unwrap();
        toast.success("Added phone number", { id: t });
        return true;
      } catch {
        toast.error("Failed to add phone number", { id: t });
        return false;
      }
    },
    [dispatch],
  );

  const uploadCsv = useCallback(
    async (file: File) => {
      const t = toast.loading("Uploading CSV…");
      try {
        await dispatch(uploadNumbersCsv(file)).unwrap();
        toast.success("CSV uploaded", { id: t });
        return true;
      } catch {
        toast.error("CSV upload failed", { id: t });
        return false;
      }
    },
    [dispatch],
  );

  const downloadCsv = useCallback(
    async (filters: NumbersFilters) => {
      const params = new URLSearchParams();
      if (filters.status) params.set("status", filters.status);
      if (filters.verdict) params.set("verdict", filters.verdict);
      if (filters.phone) params.set("phone", filters.phone);

      const t = toast.loading("Preparing CSV…");
      try {
        const res = await api.get(`/api/numbers/download?${params.toString()}`, {
          responseType: "blob",
        });
        const blob = new Blob([res.data], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "numbers.csv";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Downloaded CSV", { id: t });
      } catch {
        toast.error("CSV download failed", { id: t });
      }
    },
    [],
  );

  return {
    ...state,
    refetch,
    updateFilters,
    addOne,
    uploadCsv,
    downloadCsv,
  };
}

