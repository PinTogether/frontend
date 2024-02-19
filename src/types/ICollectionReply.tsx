export default interface ICollectionReply {
  id: number;
  userId: number;
  userNickname: string;
  userAvatar: string;
  comment: string;
  createdAt: string;
}
/*
[
  {
    "id": 1,
    "writerId": 101,
    "writerAvatar": "/images/avatars/jane-doe.jpg",
    "contents": "Exploring the city's hidden gems today!",
    "createdAt": "2024-02-13T12:00:00Z"
  },
  {
    "id": 2,
    "writerId": 102,
    "writerAvatar": "/images/avatars/john-smith.jpg",
    "contents": "Had an amazing time at the beach with friends.",
    "createdAt": "2024-02-14T12:00:00Z"
  },
  {
    "id": 3,
    "writerId": 103,
    "writerAvatar": "/images/avatars/alex-taylor.jpg",
    "contents": "Nothing beats a quiet walk in the park.",
    "createdAt": "2024-02-15T12:00:00Z"
  }
]
*/
