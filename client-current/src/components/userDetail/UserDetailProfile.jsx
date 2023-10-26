import Icon from "@/assets/icon";
import { Group, Stack, Text } from "@mantine/core";
import moment from "moment";
const UserDetailProfile = ({ profileData }) => {


  return (
    <Stack px={20}>
      {profileData.phone &&
        <Group>
          <Icon.ContactPhone />
          <Text>{profileData.phone}</Text>
        </Group>
      }
      {profileData.bio &&
        <Group>
          <Icon.StickyNote2 />
          <Text>{profileData.bio}</Text>
        </Group>
      }
      {profileData.birthday &&
        <Group>
          <Icon.Cake />
          <Text>{moment(profileData.birthday).format("DD MMMM, YYYY")}</Text>
        </Group>
      }
      {
        !profileData.phone && !profileData.bio && !profileData.birthday &&
        <Text>you dont have profile please update it first</Text>
      }
    </Stack >
  );
};

export default UserDetailProfile;
