export default interface ICollection {
  id: number;
  title: string;
  ownerId: number;
  ownerNickname: string;
  thumbnail: string;
  detail: string;
  likeCnt: number;
  pinCnt: number;
}
