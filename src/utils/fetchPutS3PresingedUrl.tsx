const fetchPutS3PresignedUrl = async (
  presignedUrl: string,
  imageFile: File
) => {
  try {
    const res = await fetch(presignedUrl, {
      method: "PUT",
      body: imageFile,
      headers: { "Content-Type": imageFile.type },
    });
    console.log("fetchPutS3PresignedUrl", res, res.json());
    if (!res.ok) throw new Error("이미지 업로드에 실패했습니다.");
    return { success: true, errorMessage: "" };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      errorMessage: "이미지 업로드에 실패했습니다.",
    };
  }
};
