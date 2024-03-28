export default interface Profile {
  // id: number;
  nickname: string;
  avatar: string;
  collectionCnt: number;
}

export interface ProfileMine extends Profile {
  id: number;
  scrappedCollectionCnt: number;
  followerCnt: number;
  followingCnt: number;
  registrationSource?: "KAKAO" | "NAVER" | "GOOGLE";
  role?: "ROLE_ADMIN" | "ROLE_MEMBER";
}

export interface ProfileOthers extends Profile {
  // id: number;
  // collectionCnt: number;
  scrappedCollectionCnt: number;
  followerCnt: number;
  followingCnt: number;
  followed: boolean;
}

export interface ProfileFollower {
  id: number;
  nickname: string;
  avatar: string;
  collectionCnt: number;
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
