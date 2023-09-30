import { useState } from "react";

const ImagePreview = ({ file, name, width, height }) => {
  const [image, setImage] = useState();

  if (file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
  }
  return (
    <img
      src={image}
      alt={name}
      width={width}
      height={height}
      style={{ objectFit: "cover", display: "block", objectPosition: "center" }}
    />
  );
};

export default ImagePreview;
