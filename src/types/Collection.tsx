// 특정 유저의 콜렉션들 조회
// 특정 유저의 스크랩한 콜렉션들 조회
export default interface Collection {
  id: number;
  title: string;
  writerId: number;
  writer: string;
  thumbnail: string;
  likeCnt: number;
  pinCnt: number;
  scrapCnt: number;
  scrapped: boolean;
  liked: boolean;
}

// 특정 콜렉션 정보 조회
export interface CollectionDetail extends Collection {
  details: string;
  tags: string[];
  commentCnt: number;
}

export interface ERDCollection {
  id: number;
  writer_id: number;
  title: string;
  thumbnail: string;
  details: string;
  created_at: string;
  updated_at: string; //
  like_cnt: number;
  scrap_cnt: number;
  pin_cnt: number;
  comment_cnt: number;
}
