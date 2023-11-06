import Icon from "@/assets/icon";
import { Group, Stack, Text } from "@mantine/core";
import moment from "moment";
const UserDetailProfile = ({ profileData, username }) => {


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
        <Text>{username} dont have updated profile</Text>
      }
    </Stack >
  );
};

export default UserDetailProfile;
