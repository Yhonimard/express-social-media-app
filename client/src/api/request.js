import api from "."


const createComment = async (pageNo) => {
  const res = await api.request.get("/post", {
    params: {
      size: 4,
      pageNo
    }
  })
  return res.data
}

export default createComment