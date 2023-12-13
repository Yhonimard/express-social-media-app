const paginationHelper = (query) => {
  const { size, pageNo } = query
  const limit = size
  const offset = (pageNo - 1) * size

  return {
    limit,
    offset
  }

}

export default paginationHelper