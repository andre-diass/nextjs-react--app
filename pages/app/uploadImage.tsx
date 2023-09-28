import axios from "axios";
import { ChangeEvent } from "react";

async function uploadToS3(e: ChangeEvent<HTMLFormElement>) {
  const formData = new FormData(e.target);

  const file = formData.get("file");

  if (!file) {
    return null;
  }

  // @ts-ignore
  const fileType = encodeURIComponent(file.type);

  const { data } = await axios.get(
    `/api/products/getSignedUrl?fileType=${fileType}`
  );

  const { uploadUrl, key } = data;

  const imageUrl = uploadUrl.split("?")[0];
  console.log(imageUrl);

  await axios.put(uploadUrl, file);

  return key;
}

function Upload() {
  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const key = await uploadToS3(e);
  }

  return (
    <>
      <p>Please select file to upload</p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/jpeg image/png" name="file" />
        <button className=" bg-gray-800 m-3 rounded-lg p-3" type="submit">
          Upload
        </button>
      </form>
    </>
  );
}

export default Upload;
