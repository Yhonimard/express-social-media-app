import useGetCurrentUser from "@/features/user/useGetCurrentUser";
import useGetCurrentUserProfile from "@/features/user/useGetCurrentUserProfile";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useSelector } from "react-redux";
import ProfileEditComponent from "./profileEdit";
import ProfilePostComponent from "./profilePost";
import { useSearchParams } from "react-router-dom";
import { ContactPhone, StickyNote2 } from "@mui/icons-material";

const ProfileComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabsLocation = searchParams.get("tabs");

  const { data: currentUserData } = useGetCurrentUser();
  const currentUser = useSelector((state) => state.auth.user);
  const { data: currentUserProfile } = useGetCurrentUserProfile(currentUser.id);

  return (
    <Container size={`md`}>
      <Flex justify={`flex-start`} mt={`xl`} direction={`column`} gap={20}>
        <Group>
          <Avatar
            src={`${import.meta.env.VITE_API_BASE_URL}/${
              currentUserData?.photoProfile
            }`}
            size={`xl`}
          />
          <Stack gap={0}>
            <Title order={3}>{currentUserData?.username}</Title>
            <Text order={4}>{currentUserProfile?.data?.bio}</Text>
          </Stack>
        </Group>
        <Box px={10}>
          <ProfileEditComponent currentUserProfile={currentUserProfile?.data} />
        </Box>
        <Box>
          <Tabs
            defaultValue={tabsLocation || "post"}
            value={tabsLocation || "post"}
            onChange={(e) => setSearchParams({ tabs: e })}>
            <Tabs.List mb={20}>
              <Tabs.Tab value="post">post</Tabs.Tab>
              <Tabs.Tab value="profile">profile</Tabs.Tab>
              <Tabs.Tab value="likes">likes</Tabs.Tab>
              <Tabs.Tab value="comment">comment</Tabs.Tab>
              <Tabs.Tab value="friend">friend</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="post">
              <ProfilePostComponent />
            </Tabs.Panel>
            <Tabs.Panel value="profile">
              <Stack px={20}>
                <Group>
                  <ContactPhone />
                  <Text>086569455246</Text>
                </Group>
                <Group>
                  <StickyNote2 />
                  <Text>this is me</Text>
                </Group>
                <Group>
                  <ContactPhone />
                  <Text>086569455246</Text>
                </Group>
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="likes">likes</Tabs.Panel>
            <Tabs.Panel value="comment">comment</Tabs.Panel>
            <Tabs.Panel value="friend">friend</Tabs.Panel>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};

export default ProfileComponent;
