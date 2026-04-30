"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchDialerStatus,
  setPollIntervalMs,
  startDialer,
  stopDialer,
} from "@/store/dialerSlice";

export function useDialer() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.dialer);

  useEffect(() => {
    dispatch(fetchDialerStatus());
  }, [dispatch]);

  async function start() {
    const t = toast.loading("Starting dialer…");
    try {
      await dispatch(startDialer()).unwrap();
      toast.success("Dialer started", { id: t });
      dispatch(fetchDialerStatus());
    } catch {
      toast.error("Failed to start dialer", { id: t });
    }
  }

  async function stop() {
    const t = toast.loading("Stopping dialer…");
    try {
      await dispatch(stopDialer()).unwrap();
      toast.success("Dialer stopped", { id: t });
      dispatch(fetchDialerStatus());
    } catch {
      toast.error("Failed to stop dialer", { id: t });
    }
  }

  return {
    ...state,
    setPollIntervalMs: (ms: number) => dispatch(setPollIntervalMs(ms)),
    refresh: () => dispatch(fetchDialerStatus()),
    start,
    stop,
  };
}

