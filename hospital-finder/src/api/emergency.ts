import { api } from './client';
import type { EmergencyListResponse } from '@/types/emergency';

export async function fetchEmergencyByRegion(params: {
  stage1: string;
  stage2: string;
  wideSearch?: boolean;
  pageNumber?: number;
}) {
  const { stage1, stage2, wideSearch = true, pageNumber = 1 } = params;
  const res = await api.get<EmergencyListResponse>('/emergency', {
    params: { stage1, stage2, wideSearch, pageNumber },
  });
  return res.data;
}

export async function fetchEmergencyByCoordinate(params: {
  latitude: number;
  longitude: number;
  wideSearch?: boolean;
  pageNumber?: number;
}) {
  const { latitude, longitude, wideSearch = true, pageNumber = 1 } = params;
  const res = await api.get<EmergencyListResponse>('/emergency/by-coordinate', {
    params: { latitude, longitude, wideSearch, pageNumber },
  });
  return res.data;
}
