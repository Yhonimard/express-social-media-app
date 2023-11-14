const scrollIntoViewHelper = (id) => {
  setTimeout(() => {
    const element = document.getElementById(id)
    if (element)
      element.scrollIntoView({ behavior: "smooth", block: "center" })
  }, 500);
}
export default scrollIntoViewHelper