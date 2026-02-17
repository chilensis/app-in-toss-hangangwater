const STATS_API_BASE = import.meta.env.DEV
  ? ''
  : 'https://hangangwater-server.vercel.app';

export interface StatsTotalResponse {
  today: number;
  allTime: number;
  date: string;
  timezone: string;
}

function getBase(): string {
  return STATS_API_BASE.replace(/\/$/, '');
}

/** 총 접속 통계 조회 (GET /api/stats/total, 호출 시 접속 자동 기록) */
export async function fetchStatsTotal(): Promise<StatsTotalResponse> {
  const base = getBase();
  const res = await fetch(`${base}/api/stats/total`, { mode: 'cors' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const raw = (await res.json()) as Record<string, unknown>;
  return {
    today: Number(raw.today) || 0,
    allTime: Number(raw.allTime) || 0,
    date: String(raw.date ?? ''),
    timezone: String(raw.timezone ?? ''),
  };
}
