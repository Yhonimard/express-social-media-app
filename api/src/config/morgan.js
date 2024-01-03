const logger = (req, res) => {
  let result
  const url = new URL(req.url)


  result = `${JSON.stringify(req.method)} - ${JSON.stringify(url.pathname)}`

  if (req.method === 'POST') {
    result = `${result} - ${JSON.stringify(req.body)}`
  }

  console.log(result);
}

export default logger