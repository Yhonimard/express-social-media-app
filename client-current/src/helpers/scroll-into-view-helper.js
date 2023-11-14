const scrollIntoViewHelper = (id) => {
  setTimeout(() => {
    const element = document.getElementById(id)
    element.scrollIntoView({ behavior: "smooth", block: "center" })
  }, 500);
}
export default scrollIntoViewHelper