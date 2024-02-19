export default interface IProfile {
  userNickname: string;
  userId?: number;
  registrationSource?: "KAKAO" | "NAVER" | "GOOGLE";
  role?: "ROLE_ADMIN" | "ROLE_MEMBER";
  avatar: string;
  collectionCnt: number;
  scrappedCollectionCnt: number;
  likedCollectionCnt: number;
}
