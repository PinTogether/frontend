export default interface Pin {
  id: number;
  collectionId: number;
  writer: string;
  review: string;
  createdAt: string;
  saveCnt: number;
  roadNameAddress: string;
  placeName: string;
  placeId?: number; // TODO
  latitude: number;
  longitude: number;
  starred: boolean;
  category: string;
  tags: string[];
  collectionTitle: string;
  imagePaths: string[];
}

export default interface MarkerData {
  id: number;
  placeName: string;
  latitude: number;
  longitude: number;
}

// 장소에 대한 모든 핀 조회
export interface PinForPlace extends Pin {
  // pinId: number;
  collectionTitle: string;
  imagePaths: string[];
}

// 장소에 대한 모든 핀 조회
export interface PinImages {
  imagePaths: string[];
}

// 특정 콜렉션의 모든 핀 조회
export interface CollectionPins {
  centerPin: Pin;
  pins: Pin[];
}

interface ERDPin {
  id: number;
  place_id: number;
  collection_id: number;
  writer_id: number;
  review: string;
  created_at: string;
}
