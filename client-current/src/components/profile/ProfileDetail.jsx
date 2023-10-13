import { Stack, Group, Text } from "@mantine/core";
import { Cake, ContactPhone } from "@mui/icons-material";
import { StickyNote2 } from "@mui/icons-material";
import moment from "moment";
const ProfileDetail = ({ phone, bio, birthday }) => {
  return (
    <Stack px={20}>
      <Group>
        <ContactPhone />
        <Text>{phone}</Text>
      </Group>
      <Group>
        <StickyNote2 />
        <Text>{bio}</Text>
      </Group>
      <Group>
        <Cake />
        <Text>{moment(birthday).format("DD MMMM, YYYY")}</Text>
      </Group>
    </Stack>
  );
};

export default ProfileDetail;
