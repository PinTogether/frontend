"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

import uploadImage from "@/utils/uploadImage";
import deleteImage from "@/utils/deleteImage";

export default function Upload() {
  const [saving, setSaving] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteImageRes, setDeleteImageRes] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmitSave = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setSaving(true);

    const imgUrl = await uploadImage({
      file: selectedFile,
      contentType: "collection",
      contentId: 2,
    });
    setImageSrc(imgUrl || "");
    console.log("imgUrl", imgUrl);

    setSaving(false);
  };

  const onSubmitDelete = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);

    const targetName = imageSrc.split("/").pop() || "";
    const success = await deleteImage(`collection/${targetName}`);
    console.log("targetName", `collection/${targetName}`);
    console.log("delete image res", status);

    if (success) {
      // res 객체에 success 필드가 있다고 가정
      console.log("delete image success");
      setImageSrc("");
      setDeleteImageRes("Success to delete image");
    } else {
      console.log("delete image failed");
      setDeleteImageRes("Failed to delete image");
    }
    setSaving(false);
  };

  return (
    <div>
      <form
        onSubmit={onSubmitSave}
        className="w-full max-w-sm m-auto py-10 mt-10 px-10 border"
      >
        <div className="mb-4 mt-6">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-gray-600 bg-gray-100 rounded border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600"
          />
        </div>
        <div className="text-right mt-6">
          <button
            type="submit"
            disabled={saving}
            className={`${
              saving ? "cursor-not-allowed" : "cursor-pointer"
            } py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 disabled:text-gray-300`}
          >
            Save
          </button>
        </div>
        {imageSrc && (
          <>
            <Image
              src={imageSrc}
              width={350}
              height={350}
              alt="Uploaded image"
            />
            <br />
          </>
        )}
      </form>

      <form
        onSubmit={onSubmitDelete}
        className="w-full max-w-sm m-auto py-10 mt-10 px-10 border"
      >
        <span>{deleteImageRes}</span>
        <div className="text-right mt-6">
          <button
            type="submit"
            disabled={saving}
            className={`${
              saving ? "cursor-not-allowed" : "cursor-pointer"
            } py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 disabled:text-gray-300`}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
