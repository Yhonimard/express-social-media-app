
const useScrollIntoView = () => {
  const scroll = (id) => setTimeout(() => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "center" })
  }, 500)
  return scroll
}

export default useScrollIntoView