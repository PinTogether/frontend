import { PlaceStarred } from "@/types/Place";
import APIResponse from "@/types/APIResponse";

const fetchGetStars = async (userId: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stars`, {
      credentials: "include",
    });
    console.log("fetchGetStars res", res);
    if (!res.ok) throw new Error("찜한 목록 불러오기에 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchGetStars data", data);
    if (data.metadata.resultCount === 0) {
      return {
        starredDatas: [],
        errorMessage: "찜한 목록이 없습니다. 장소를 찜해 보세요!",
      };
    }
    const starredDatas: PlaceStarred[] = data.results.map((result: any) => ({
      id: result.id,
      name: result.name,
      category: result.category,
      roadNameAddress: result.address.roadNameAddress,
      latitude: result.address.latitude,
      longtitude: result.address.longtitude,
      updatedAt: result.address.updatedAt,
      starred: true,
    }));
    return { starredDatas, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      starredDatas: [],
      errorMessage: "찜한 목록 불러오기에 실패했습니다.",
    };
  }
};
export default fetchGetStars;
