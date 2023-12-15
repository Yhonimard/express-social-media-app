import _ from "lodash"

const shuffleAndPaginateDataHelper = (data, query, nameOfdata, lastId) => {
  const { pageNo, size } = query

  const startIndex = (pageNo - 1) * size
  const endIndex = startIndex + size
  const shuffledData = _.shuffle(data)
  const paginatedData = shuffledData.slice(startIndex, endIndex)
  const isLast = endIndex >= data.length
  const totalPages = Math.ceil(data.length / size)
  const totalData = data.length

  const dataResult = nameOfdata || 'data'

  return {
    [dataResult]: paginatedData,
    isLast,
    totalPages,
    totalData,
    lastId
  }
}

export default shuffleAndPaginateDataHelper