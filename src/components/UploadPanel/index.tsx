import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import { options } from "../../../utils/uploaderOptions";
import SizeInput from "../SizeInput";

const UploadPanel = () => {
  const [error, setError] = useState<string>("");
  const [imageUrl, setImageUrl] = useState({
    uploadUrl: "",
    originalWidth: "",
    originalHeight: "",
  });
  const [size, setSize] = useState<{ width: string; height: string }>({
    width: "",
    height: "",
  });

  function handleUpload(file: any) {
    const [base, params] = file[0].fileUrl.split("?");
    console.log(base);
    const imageParams = new URLSearchParams(params);
    const originalWidth = imageParams.get("w")!;
    const originalHeight = imageParams.get("h")!;
    setImageUrl({
      uploadUrl: base,
      originalWidth,
      originalHeight,
    });
    setSize({ width: originalWidth, height: originalHeight });
  }

  const uploader = Uploader({
    apiKey: import.meta.env.UPLOAD_API_KEY
      ? import.meta.env.UPLOAD_API_KEY
      : "free",
  });

  return (
    <div className="w-full max-w-3xl my-0 mt-24">
      <form className="flex flex-col items-center gap-4 mx-auto">
        <h1 className="text-5xl text-black font-bold">Image resizer</h1>
        <UploadDropzone
          uploader={uploader}
          options={options}
          onUpdate={(file) => handleUpload(file)}
        />
        <div className="flex gap-8">
          <SizeInput
            name="width"
            placeholder="width"
            type="text"
            size={size}
            setSize={setSize}
          />
          <SizeInput
            name="height"
            placeholder="height"
            type="text"
            size={size}
            setSize={setSize}
          />
        </div>
        {Boolean(error) && (
          <p className="underline text-black font-bold">{error}</p>
        )}
      </form>
      {imageUrl.uploadUrl && size.width && size.height && (
        <div className="mx-auto my-8 max-w-lg flex flex-col gap-4">
          <h2 className="text-2xl font-bold uppercase text-center text-black">
            Result
          </h2>
          <img
            className="outline-dashed outline-2 outline-gray-300 rounded-md p-1"
            src={`https://tmresizer.deno.dev/?image=${imageUrl.uploadUrl}&width=${size.width}&height=${size.height}`}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default UploadPanel;
