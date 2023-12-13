import { Card, Stack, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom"

const HeaderSearchPostCard = ({ title, content, pid, toggle }) => {
  const navigate = useNavigate()
  const navigateToPostDetail = (pid) => {
    navigate(`/post/${pid}`)
    toggle()
  }
  return (
    <Card style={{ cursor: "pointer" }} onClick={() => navigateToPostDetail(pid)}>
      <Card.Section inheritPadding py={10}>
        <Stack gap={0}>
          <Text size="lg" fw={`bold`} truncate="end">{title}</Text>
          <Text truncate="end">{content}</Text>
        </Stack>
      </Card.Section>
    </Card>
  )
}

export default HeaderSearchPostCard