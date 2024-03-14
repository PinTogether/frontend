export default interface APIResponse {
  status: {
    code: number;
    message: string;
  };
  metadata: {
    resultCount: number;
  };
  results: any[];
}
