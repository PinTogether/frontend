import PresignedUrl from "@/types/PresingedUrl";
import APIResponse from "@/types/APIResponse";

const fetchPostCollection = async (
  title: string,
  thumnail: string,
  details: string,
  tags: string[],
  fileType: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          title: title,
          thumnail: thumnail,
          details: details,
          tags: tags,
          fileType: fileType,
        }),
      }
    );
    console.log("fetchPostCollection res", res);
    if (!res.ok) throw new Error("컬렉션 생성을 실패했습니다.");
    const data: APIResponse = await res.json();
    console.log("fetchPostCollection data", data);
    if (fileType === "") {
      const presingedUrlData: PresignedUrl = data.results[0];
      return {
        presingedUrlData: presingedUrlData,
        newCollectionId: presingedUrlData.id,
        errorMessage: "",
      };
    } else {
      const result = data.results[0];
      return {
        presingedUrlData: null,
        newCollectionId: result.id,
        errorMessage: "",
      };
    }
  } catch (err: any) {
    console.error(err);
    return {
      presingedUrlData: null,
      newCollectionId: null,
      errorMessage: "컬렉션 생성을 실패했습니다.",
    };
  }
};
export default fetchPostCollection;
