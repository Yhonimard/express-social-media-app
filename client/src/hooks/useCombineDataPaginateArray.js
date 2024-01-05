const useCombineDataPaginateArray = (data) => { 
  const combinedArr = data?.pages.reduce((acc, curr) => { 
    return acc.concat(curr.data)
  }, [])
  return combinedArr
}
export default useCombineDataPaginateArray