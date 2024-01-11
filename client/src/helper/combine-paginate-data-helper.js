const combinePaginateDataHelper = (data, nameOfdata) => { 
  const dataName = nameOfdata || 'data'
  const combinedArr = data?.pages.reduce((acc, curr) => { 
    return acc.concat(curr[dataName])
  }, [])
  return combinedArr
}

export default combinePaginateDataHelper