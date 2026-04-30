export type NumberStatus = "not_started" | "pending" | "done";

export type Verdict =
  | "IN_SERVICE"
  | "OUT_OF_SERVICE"
  | "LIKELY_ACTIVE"
  | "AMBIGUOUS"
  | "INVALID"
  | "UNKNOWN";

export type PhoneNumberRow = {
  id: number;
  phone_number: string;
  status: NumberStatus;
  verdict: Verdict | null;
  call_sid: string | null;
  error_code: string | null;
  call_duration: number | null;
  note: string | null;
  created_at: string;
  dialed_at: string | null;
  completed_at: string | null;
};

export type PaginatedMeta = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginatedMeta;
};

export type NumbersStats = {
  total: number;
  not_started: number;
  pending: number;
  done: number;
  in_service: number;
  out_of_service: number;
  likely_active: number;
  ambiguous: number;
  invalid: number;
  unknown: number;
};

export type DialerStatus = {
  running: boolean;
  currentNumber: string | null;
  totalDialed: number;
  startedAt: string | null;
};

