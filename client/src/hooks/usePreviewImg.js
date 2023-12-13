import { withFormik } from "formik"
import { useEffect, useState } from "react"

const usePreviewImg = (file) => {
  const [previewImg, setPreviewImg] = useState()

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setPreviewImg(reader.result)
      }
    }

  }, [file])

  return previewImg
}

export default usePreviewImg
