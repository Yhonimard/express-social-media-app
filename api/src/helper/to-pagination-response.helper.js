const toPaginationResponseHelper = async (dataCount, data, query) => {
  const { pageNo, size } = query;
  const totalData = dataCount;
  const totalPages = Math.ceil(totalData / size);
  const currentPageData = data.length;
  const isLast = parseInt(pageNo) === parseInt(totalPages);

  const mapperData = {
    data,
    currentPageData,
    totalData,
    totalPages,
    isLast,
  };

  return mapperData;
};

export default toPaginationResponseHelper;
