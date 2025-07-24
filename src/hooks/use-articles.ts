'use client';

import { fetchSummary } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

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
