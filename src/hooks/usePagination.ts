import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { log } from '../services/logger';

function parsePositive(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => parsePositive(searchParams.get('page'), 1), [searchParams]);
  const limit = useMemo(() => parsePositive(searchParams.get('limit'), 10), [searchParams]);

  const setPage = (next: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(next));
    setSearchParams(params);
    log('frontend', 'info', 'hook', `Pagination changed to page=${next}`);
  };

  const setLimit = (next: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', String(next));
    params.set('page', '1');
    setSearchParams(params);
    log('frontend', 'info', 'hook', `Pagination changed to limit=${next}`);
  };

  return { page, limit, setPage, setLimit };
}
