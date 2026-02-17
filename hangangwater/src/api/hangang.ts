const HANGANG_API_URL = 'https://api.hangang.life/';

export interface HangangSpot {
  TEMP: number;
  LAST_UPDATE: string;
  PH: number;
}

export interface HangangApiResponse {
  STATUS: string;
  MSG: string;
  DATAs: {
    CACHE_META: {
      CREATED_AT: number;
      UPDATED_AT: number;
      DATA_KEY: string;
    };
    DATA: {
      HANGANG: Record<string, HangangSpot>;
    };
  };
}

export async function fetchHangang(): Promise<HangangApiResponse> {
  const res = await fetch(HANGANG_API_URL);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = (await res.json()) as HangangApiResponse;
  if (data.STATUS !== 'OK') throw new Error(data.MSG ?? 'API error');
  return data;
}

export function formatLastUpdate(lastUpdate: string, location: string): string {
  const [datePart, timePart] = lastUpdate.split(' ');
  const [year, month, day] = datePart.split('-');
  const hour = timePart?.slice(0, 2) ?? '00';
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  const hourNum = parseInt(hour, 10);
  return `${monthNum}월 ${dayNum}일 ${hourNum}시에 ${location}에서 가져온 정보예요`;
}
