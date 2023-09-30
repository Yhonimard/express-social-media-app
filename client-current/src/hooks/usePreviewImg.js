import { useEffect, useState } from "react"

const usePreviewImg = (img) => {
  const [previewImg, setPreviewImg] = useState()

  useEffect(() => {
    if (img) {
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onload = () => {
        setPreviewImg(reader.result)
      }
    }
  }, [img])
  
  return previewImg
}

export default usePreviewImg