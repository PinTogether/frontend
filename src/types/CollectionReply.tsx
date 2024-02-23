// 특정 콜렉션의 모든 댓글 조회
// 요청사항
// - “writer”  추가
export default interface CollectionReply {
  id: number;
  writerId: number;
  writer: string;
  writerAvatar: string;
  contents: string;
  createdAt: string;
}

interface ERDCollectionComment {
  id: number;
  collection_id: number;
  writer_id: number; //
  contents: string;
  created_at: string;
}

// 특정 콜렉션의 모든 댓글 조회 -> writer 추가 요청

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
