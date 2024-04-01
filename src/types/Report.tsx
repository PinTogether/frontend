export enum PlatformType {
  COLLECTION = "COLLECTION",
  PIN = "PIN",
  COLLECTION_COMMENT = "COLLECTION_COMMENT",
}

export enum ComplaintCategory {
  SPAM = "SPAM",
  FLOODING = "FLOODING",
  PORNO = "PORNO",
  ILLEGAL = "ILLEGAL",
  HARMFUL_TO_MINORS = "HARMFUL_TO_MINORS",
  DISCRIMINATORY = "DISCRIMINATORY",
  PERSONAL_INFORMATION = "PERSONAL_INFORMATION",
}

export interface Report {
  id: number;
  platformType: PlatformType;
  reporterId: number;
  reporterMembername: string;
  targetMemberId: number;
  targetMembername: string;
  createdAt: string;
  progress: string; //"ACCEPTED";
  complaintCategory: ComplaintCategory;
  reason: string;
  targetId: number;
}
