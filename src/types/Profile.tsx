export default interface Profile {
  nickname: string;
  avatar: string;
  collectionCnt: number;
  scrappedCollectionCnt: number;
  followerCnt: number;
  followingCnt: number;
}

export interface ProfileMine extends Profile {
  id: number;
  registrationSource?: "KAKAO" | "NAVER" | "GOOGLE";
  role?: "ROLE_ADMIN" | "ROLE_MEMBER";
}

export interface ProfileOthers extends Profile {
  isFollowed: boolean;
}

interface ERDMember {
  id: number;
  nickname: string;
  avatar: string;
  registrationSource: string;
  registrationId: string;
  role: string;
  collection_cnt: number;
  scrapped_collection_cnt: number;
  follower_cnt: number;
  following_cnt: number;
}
