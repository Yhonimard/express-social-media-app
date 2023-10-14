import { Card, Group, Text } from "@mantine/core";
import { Favorite } from "@mui/icons-material";

const ProfileLikesCard = () => {
  return (
    <Card style={{ backgroundColor: "tomato" }}>
      <Card.Section>
        <Group>
          <Favorite />
          <Text>testing</Text>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default ProfileLikesCard;
