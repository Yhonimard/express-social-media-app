import Icon from "@/assets/icon"
import { Card, Divider, Group, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom"

const ProfileCommentCard = ({ title, createdAt, postId }) => {
  const navigate = useNavigate()
  return (
    <Card py={20} >
      <Card.Section inheritPadding mih={75}>
        <Text lineClamp={3}>{title}</Text>
      </Card.Section>
      <Divider my={`xs`} />
      <Card.Section style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }} inheritPadding pb={7}>
        <div>{createdAt}</div>
        <Group gap={`xs`} align="center" justify="center" style={{ cursor: "pointer" }} onClick={() => navigate(`/post/${postId}`)}>see the post <Icon.ArrowForward style={{ marginTop: "1px" }} /></Group>
      </Card.Section>
    </Card>
  )
}

export default ProfileCommentCard