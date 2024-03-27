export default interface Place {
  id: number;
  name: string;
  roadNameAddress: string;
  category: string;
  pinCnt?: number;
}

// 특정 장소 정보 조회
export interface PlaceDetail extends Place {
  latitude: number;
  longitude: number;
  starred: boolean;
}

// 찜한 모든 장소 조회
export interface PlaceStarred extends Place {
  latitude: number;
  longitude: number;
  starred: boolean;
  // updatedAt: string;
}

interface ERDPlace {
  id: number;
  service_id: string;
  local_code: string;
  local_manage_code: string;
  status_number: string;
  status: string;
  phone: string;
  zip_code: string;
  road_number_address: string;
  road_name_address: string;
  Field10: string;
  name: string;
  category: string;
  x: number;
  y: number;
  pinned_cnt: number;
}
