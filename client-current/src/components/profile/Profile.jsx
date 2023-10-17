import useGetCurrentUser from "@/features/user/useGetCurrentUser";
import useGetCurrentUserProfile from "@/features/user/useGetCurrentUserProfile";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProfileDetail from "./ProfileDetail";
import ProfileEditComponent from "./profileEdit";
import ProfilePostComponent from "./profilePost";
import ProfileLikes from "./profileLikes/ProfileLikes";
import ProfileComment from "./profileComment/ProfileComment";

const ProfileComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabsLocation = searchParams.get("tabs");

  const { data: currentUserData, isLoading: isLoadingGetCurrUser } =
    useGetCurrentUser();

  const currentUser = useSelector((state) => state.auth.user);
  const { data: currentUserProfileData, isLoading: isLoadingFetchUserProfile } =
    useGetCurrentUserProfile(currentUser.id);

  if (isLoadingFetchUserProfile || isLoadingGetCurrUser)
    return <LoadingOverlay visible />;

  return (
    <Container size={`md`}>
      <Flex justify={`flex-start`} mt={`xl`} direction={`column`} gap={20}>
        <Group>
          <Avatar
            src={`${import.meta.env.VITE_API_BASE_URL}/${currentUserData.photoProfile
              }`}
            size={`xl`}
          />
          <Stack gap={0}>
            <Title order={3}>{currentUserData.username}</Title>
            <Text order={4}>{currentUserProfileData.bio}</Text>
          </Stack>
        </Group>
        <Box px={10}>
          <ProfileEditComponent currentUserProfile={currentUserProfileData} />
        </Box>
        <Box>
          <Tabs
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
              <ProfileDetail
                bio={currentUserProfileData.bio}
                phone={currentUserProfileData.phone}
                birthday={currentUserProfileData.birthday}
              />
            </Tabs.Panel>
            <Tabs.Panel value="likes">
              <ProfileLikes />
            </Tabs.Panel>
            <Tabs.Panel value="comment">
              <ProfileComment />
            </Tabs.Panel>
            <Tabs.Panel value="friend">friend</Tabs.Panel>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};

export default ProfileComponent;
