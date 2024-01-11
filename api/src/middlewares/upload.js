import mime from "mime-types"
import moment from "moment"
import multer from "multer"



const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = file.fieldname.split('/').shift()
      cb(null, `storage/${folder}`)
    },
    filename: (req, file, cb) => {
      const ext = mime.extension(file.mimetype)
      const fieldname = file.fieldname.split('/').pop()
      cb(null, `${fieldname}_${moment().format('DD-MM-YYYY_HH-mm')}.${ext}`)
    },
  }),
  fileFilter: (req, file, cb) => {
    // const isValid = !!MIME_TYPE[file.mimetype]
    // let err = isValid ? null : new ApiBadRequestError("invalid mime type")
    cb(undefined, true)
  }
})

export default upload