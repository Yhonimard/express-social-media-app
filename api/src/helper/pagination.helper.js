const paginationHelper = (pageNo, size) => {
  return {
    skip: parseInt((pageNo - 1) * size),
    take: parseInt(size)
  }
}

export default paginationHelper