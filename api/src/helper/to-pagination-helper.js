const toPaginationHelper = (data, count, query, nameOfdata, lastId) => {
  const { pageNo, size } = query
  const isLast = pageNo * size >= count
  const totalPages = Math.ceil(count / size)
  const totalData = count
  const dataResult = nameOfdata || 'data'
  return {
    [dataResult]: data,
    isLast,
    totalPages,
    totalData,
    lastId
  }
}


export default toPaginationHelper


