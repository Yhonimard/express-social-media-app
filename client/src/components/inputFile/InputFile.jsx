import { useRef } from "react";

const InputFile = ({ children, name, setFieldValue }) => {
  const openImg = useRef();
  return (
    <>
      <input
        ref={openImg}
        type="file"
        name={name}
        onChange={(e) => setFieldValue(name, e.target.files[0])}
      style={{ display: "none" }}
      />
      <label onClick={() => openImg.current.click()}>{children}</label>
    </>
  );
};

export default InputFile;
