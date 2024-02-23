export default interface IBookmark {
  id: number;
  address: string;
  name: string;
  category:
    | "HEALTH"
    | "ANIMALS"
    | "FOOD"
    | "CULTURE"
    | "LIFESTYLE"
    | "ENVIRONMENTAL_RESOURCES"
    | "ETC";
  created_at: string;
}
