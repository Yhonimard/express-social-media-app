const toPaginationResponseHelper = async (repo, data, pageNo, size) => {
  const totalData = await repo.count();
  const totalPages = Math.ceil(totalData / size);
  const currentPageData = data.length;
  const isLast = pageNo === totalPages;

  const mapperData = {
    data,
    currentPageData,
    totalData,
    totalPages,
    isLast,
  };

  return mapperData;
};


export default toPaginationResponseHelper