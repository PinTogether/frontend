export default interface Place {
  id: number;
  name: string;
  address: string;
  category: string;
  // | "HEALTH" // 건강
  // | "ANIMALS" // 동물
  // | "FOOD" // 음식
  // | "CULTURE" // 문화
  // | "LIFESTYLE" // 생활
  // | "ENVIRONMENTAL_RESOURCES" // 자원
  // | "ETC"; // 기타
}

// 특정 장소 정보 조회
export interface PlaceDetail extends Place {
  xPos: number;
  yPos: number;
  phoneNumber: string;
  starred: boolean;
}

// 찜한 모든 장소 조회
export interface PlaceStarred extends Place {
  created_at: string;
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
