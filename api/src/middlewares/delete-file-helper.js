import fs from 'fs'
const single = (path) => {
  fs.unlink(path, err => {
    // console.log(`error ${err} when delete file ${path}`);
    console.log("delete file");
  })
}

const multiple = (arrPath = []) => {
  arrPath.forEach(val => {
    fs.unlink(val, err => {
      console.log(`error ${err} when delete image ${val}`);
    })
  })

}

export default {
  single,
  multiple
}