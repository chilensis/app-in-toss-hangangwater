import { useState, useEffect } from 'react';
import { fetchStatsTotal } from '../api/stats';

const COUNT_INTERVAL_MS = 15_000;

/** 총 접속 통계 조회 (total 호출 시 서버에서 접속 자동 기록). @returns 오늘 접속 인원(today) */
export function useAccessCount(): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const load = () => {
      fetchStatsTotal()
        .then((d) => {
          const n = typeof d.today === 'number' ? d.today : Number(d.today);
          setCount(Number.isFinite(n) ? n : null);
        })
        .catch(() => setCount(null));
    };

    // Strict Mode에서 effect가 두 번 돌면 첫 cleanup 시 이 timeout이 취소되어, 실제 로드는 한 번만 실행됨
    const timeoutId = setTimeout(load, 0);
    const timer = setInterval(load, COUNT_INTERVAL_MS);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(timer);
    };
  }, []);

  return count;
}
