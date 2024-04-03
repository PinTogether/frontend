export interface Notify {
  subjectId: number;
  subject: string; // memebername
  notificationType:
    | "SCRAP_COLLECTION"
    | "COMMENT_ON_COLLECTION"
    | "LIKE_COLLECTION"
    | "FOLLOW"
    | "CREATE_COLLECTION";
  object: string | null; // collectionName
}

export interface NotifyResponse {
  today: Notify[];
  yesterday: Notify[];
  aweekAgo: Notify[];
  withinAMonth: Notify[];
}
