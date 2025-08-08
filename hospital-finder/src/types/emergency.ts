export interface HospitalRoom {
  hospitalId: string;
  institution_name: string;
  available_emergency_room_count: number;
  available_surgery_room_count: number;
  available_hospital_room_count: number;
  isAvailableCT: 'Y' | 'N' | 'U' | string;
  isAvailableMRI: 'Y' | 'N' | 'U' | string;
  isAvailableAmbulance: 'Y' | 'N' | 'U' | string;
  emergency_tel: string | null;
  provinces: string; // 시도
  municipalities: string; // 시군구
  updatedAt: string;
  latitude?: number; // 서버 업데이트 이후 제공 예정
  longitude?: number; // 서버 업데이트 이후 제공 예정
}

export interface EmergencyListResponse {
  success: boolean;
  statusCode: number;
  data: {
    rooms: HospitalRoom[];
  };
}
