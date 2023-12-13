import multer from "multer"
import ApiBadRequestError from "../exceptions/ApiBadRequestError"


const MIME_TYPE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg"
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `storage/image`)
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE[file.mimetype]
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE[file.mimetype]
    let err = isValid ? null : new ApiBadRequestError("invalid mime type")
    cb(err, isValid)
  }
})

export default upload