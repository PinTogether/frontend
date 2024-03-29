// 특정 콜렉션의 모든 댓글 조회
export default interface CollectionReply {
  id: number;
  writerId: number;
  writerName: string;
  writerMembername: string;
  writerAvatar: string;
  contents: string;
  createdAt: string;
}

interface ERDCollectionComment {
  id: number;
  collection_id: number;
  writer_id: number;
  contents: string;
  created_at: string;
}
