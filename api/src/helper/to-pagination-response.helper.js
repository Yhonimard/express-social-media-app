const toPaginationResponseHelper = async (dataCount, data, query) => {
  const { pageNo, size } = query;
  const totalData = dataCount;
  const totalPages = Math.ceil(totalData / size);
  const currentPageData = data.length;
  const isLast = parseInt(pageNo) === parseInt(totalPages) || parseInt(totalPages) < parseInt(pageNo)

  const mapperData = {
    currentPageData,
    totalData,
    totalPages,
    isLast,
    data,
  };

  return mapperData;
};

export default toPaginationResponseHelper;
