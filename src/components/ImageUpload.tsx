"use client";
import { useRef } from "react";
import { MdDriveFolderUpload } from "react-icons/md";

interface ImageUploadProps {
  images: (File | null)[];
  setImages: React.Dispatch<React.SetStateAction<(File | null)[]>>;
}

export default function ImageUpload({ images, setImages }: ImageUploadProps) {
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = file;
      return newImages;
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = null;
      return newImages;
    });
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current!.value = "";
    }
  };

  const allImagesEmpty = images.every((img) => img === null);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        Car Images{" "}
        {allImagesEmpty && (
          <span className="text-amber-500">(At least one image required)</span>
        )}
      </label>
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="relative">
            <input
              type="file"
              id={`file-upload-${index}`}
              accept="image/*"
              onChange={(e) => handleFileChange(e, index)}
              ref={fileInputRefs[index]}
              className="hidden"
            />
            <label
              htmlFor={`file-upload-${index}`}
              className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer
              hover:bg-gray-700 ${index === 0 ? "border-amber-600" : "border-amber-300"}`}
            >
              {!images[index] && (
                <MdDriveFolderUpload className="text-4xl text-amber-500 mb-2" />
              )}
              <span className="text-sm">
                {images[index]
                  ? ""
                  : index === 0
                    ? "Main image (required)"
                    : "Additional image"}
              </span>
              {images[index] && (
                <img
                  src={URL.createObjectURL(images[index] as File)}
                  alt={`Preview ${index}`}
                  className="mt-2 w-full h-24 object-cover rounded"
                />
              )}
            </label>
            {images[index] && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-amber-500 text-white rounded-lg px-1.5 p-1"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
