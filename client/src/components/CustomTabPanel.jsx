const CustomTabPanel = ({ value, index, children }) => {
  return value === index && (children)
}

export default CustomTabPanel
