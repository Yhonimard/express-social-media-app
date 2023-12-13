const paginationHelper = (pageNo, size) => {
  return {
    skip: parseInt((parseInt(pageNo) - 1) * parseInt(size)),
    take: parseInt(size),
  };
};

export default paginationHelper;
