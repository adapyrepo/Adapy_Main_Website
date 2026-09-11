import { useQuery } from "@tanstack/react-query";

export async function fetchMobilityTotal(): Promise<number> {
  const response = await fetch("https://my.adapy.com/moment-of-mobility", {
    credentials: "omit",
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("Mobility total could not be loaded.");
  const data = await response.json();
  if (!data || !Number.isSafeInteger(data.total) || data.total < 0) {
    throw new Error("Mobility endpoint returned an invalid total.");
  }
  return data.total;
}

export function useMobilityMoments() {
  const query = useQuery({
    queryKey: ["mobility-moments-total"],
    queryFn: fetchMobilityTotal,
    staleTime: Infinity,
    retry: 1,
  });
  return {
    total: query.data,
    formattedCount: query.data !== undefined
      ? query.data.toLocaleString("en-US")
      : query.isError ? "Unavailable" : "Loading…",
  };
}
