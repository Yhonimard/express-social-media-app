import fs from 'fs'
import ApiBadRequestError from "../exceptions/ApiBadRequestError"
import config from '../config'
import mime from "mime-types"
import { isArray, isObject, isString, reduce } from 'lodash'


const uploadBase64 = (file) => {
  const { storage } = config('/')

  if (isString(file) || isObject(file) && !isArray(file)) {
    const base64File = file
    const matches = base64File.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)


    if (matches.length !== 3) throw new ApiBadRequestError('error when uploading image')
    const ext = mime.extension(matches[1])
    const filename = `${Date.now()}.${ext}`
    const response = {
      data: Buffer.from(matches[2], 'base64'),
      filename
    }

    fs.writeFileSync(`${storage.image.path}/${response.filename}`, response.data, { encoding: 'base64' })
    return response.filename
  }

  if (isArray(file)) {
    const base64FilesArr = file
    const result = reduce(base64FilesArr, (acc, f) => {


      const matches = f.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      if (matches.length !== 3) throw new ApiBadRequestError('error when uploading img')

      const ext = mime.extension(matches[1])
      const filename = `${Date.now()}.${ext}`
      const result = {
        data: Buffer.from(matches[2], 'base64'),
        filename
      }

      fs.writeFileSync(`${storage.image.path}/${result.filename}`, result.data, { encoding: 'base64' })
      acc.push({ filename })
      return acc
    }, [])


    return result
  }

}

export default uploadBase64
