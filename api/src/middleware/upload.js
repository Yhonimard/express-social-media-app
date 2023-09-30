import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import ApiBadRequestError from "../exception/ApiBadRequestError"

const IMAGE_MIME_TYPE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg"
}

const image = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `storage/images`)
    },
    filename: (req, file, cb) => {
      const ext = IMAGE_MIME_TYPE[file.mimetype]
      cb(null, `${file.fieldname}-${uuidv4()}.${ext}`)
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!IMAGE_MIME_TYPE[file.mimetype]
    let err = isValid ? null : new ApiBadRequestError("invalid mime type")
    cb(err, isValid)

  }
})


export default {
  image
}