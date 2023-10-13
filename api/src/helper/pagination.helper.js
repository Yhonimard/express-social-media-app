const paginationHelper = (pageNo, size) => {
  console.log("pageNo", pageNo);
  return {
    skip: parseInt((parseInt(pageNo) - 1) * parseInt(size)),
    take: parseInt(size),
  };
};

export default paginationHelper;
