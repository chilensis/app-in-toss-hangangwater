import { useState, useEffect } from 'react';
import { fetchHangang, type HangangSpot } from '../api/hangang';

type HangangState =
  | { status: 'loading' }
  | { status: 'success'; spots: Record<string, HangangSpot> }
  | { status: 'error'; message: string };

export function useHangang() {
  const [state, setState] = useState<HangangState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    fetchHangang()
      .then((res) => {
        if (cancelled) return;
        setState({
          status: 'success',
          spots: res.DATAs.DATA.HANGANG,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          status: 'error',
          message: err instanceof Error ? err.message : '데이터를 불러오지 못했어요',
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
