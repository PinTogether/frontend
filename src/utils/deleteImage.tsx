const deleteImage = (imageId: string) => {
  return fetch("/api/image", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ targetName: imageId }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res);
      return true;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
};

export default deleteImage;
