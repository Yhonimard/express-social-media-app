import { MuiFileInput } from "mui-file-input";
import { useRef } from "react";

const HiddenFileInput = ({ multiple, children, onChange }) => {
  const inputRef = useRef(null)
  return (
    <>
      <MuiFileInput inputRef={inputRef} sx={{ display: 'none' }} multiple={multiple || false} onChange={onChange} />
      <div onClick={() => { inputRef.current?.click() }}>
        {children}
      </div>
    </>
  );
};

export default HiddenFileInput;