"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

async function fetchSummary(articleId: string) {
  const response = await fetch(
    `http://localhost:5000/api/v1/articles/summarize/${articleId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch summary");
  }
  const data = await response.json();
  return data.data.result;
}

export function useSummarize(articleId: string) {
  const [summary, setSummary] = useState<string | null>(null);

  const {
    mutate: summarize,
    isPending: isSummarizing,
    error,
  } = useMutation({
    mutationFn: () => fetchSummary(articleId),
    onSuccess: (data) => {
      setSummary(data);
    },
  });

  return { summarize, summary, isSummarizing, error };
}
