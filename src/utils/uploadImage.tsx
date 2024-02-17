// If failed to upload, return empty string
const uploadImage = async ({
  file,
  contentType,
  contentId,
}: {
  file: File;
  contentType: "profile" | "collection" | "pin-review";
  contentId: number;
}) => {
  if (!file) return;

  const { presignedURL, imgUrl } = await getPresignedUrl({
    fileName: file.name,
    fileType: file.type,
    contentType,
    contentId,
  });

  console.log("presignedURL", presignedURL);
  console.log("imgUrl", imgUrl);
  if (
    imgUrl &&
    presignedURL &&
    (await putS3File({
      file,
      presignedURL,
    }))
  )
    return imgUrl;
  return "";
};
export default uploadImage;

// API
const getPresignedUrl = ({
  fileName,
  fileType,
  contentType,
  contentId,
}: {
  fileName: string;
  fileType: string;
  contentType: string;
  contentId: number;
}) => {
  let presignedURL = "";
  let imgUrl = "";

  return fetch(
    `/api/presigned-url?fileName=${fileName}&fileType=${fileType}&contentType=${contentType}&contentId=${contentId}`
  )
    .then((res) => {
      console.log("res", res);
      return res.json();
    })
    .then((res) => {
      presignedURL = res?.url || "";
      imgUrl = res?.imgUrl || "";
      console.log("aaapresignedURL", presignedURL);
      console.log("aaaimgFileName", imgUrl);
      return { presignedURL, imgUrl };
    })
    .catch((error) => {
      console.error("Error getting presigned URL:", error);
      return { presignedURL, imgUrl };
    });
};

// API
const putS3File = ({
  file,
  presignedURL,
}: {
  file: File;
  presignedURL: string;
}) => {
  return fetch(presignedURL, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  })
    .then((res) => {
      console.log("res", res);
      return res.ok;
    })
    .then((ok) => {
      if (ok) console.log("Uploaded successfully!");
      return ok;
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      return false;
    });
};
