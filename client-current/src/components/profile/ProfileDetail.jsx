import { Stack, Group, Text } from "@mantine/core";
import { Cake, ContactPhone, Diversity1 } from "@mui/icons-material";
import { StickyNote2 } from "@mui/icons-material";
import moment from "moment";
const ProfileDetail = ({ phone, bio, birthday }) => {
  return (
    <Stack px={20}>
      {phone &&
        <Group>
          <ContactPhone />
          <Text>{phone}</Text>
        </Group>
      }
      {bio &&
        <Group>
          <StickyNote2 />
          <Text>{bio}</Text>
        </Group>
      }
      {birthday &&
        <Group>
          <Cake />
          <Text>{moment(birthday).format("DD MMMM, YYYY")}</Text>
        </Group>
      }
      {!phone && !bio && !birthday &&
        <Text>you dont have profile update</Text>
      }
    </Stack>
  );
};

export default ProfileDetail;
