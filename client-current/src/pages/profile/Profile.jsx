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
import ProfileDetail from "@/components/profile/ProfileDetail";
import ProfileEditComponent from "@/components/profile/profileEdit";
import ProfilePostComponent from "@/components/profile/profilePost";
import ProfileLikes from "@/components/profile/profileLikes/ProfileLikes";
import ProfileComment from "@/components/profile/profileComment/ProfileComment";
import ProfileFriend from "@/components/profile/profileFriend";


const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabsLocation = searchParams.get("tabs");

  const { data: currentUserData, isLoading: isLoadingGetCurrUser } = useGetCurrentUser();


  const currentUser = useSelector((state) => state.auth.user);
  const { data: currentUserProfileData, isLoading: isLoadingFetchUserProfile } = useGetCurrentUserProfile(currentUser.id);

  if (isLoadingFetchUserProfile || isLoadingGetCurrUser)
    return <LoadingOverlay visible />;

  return (
    <Container size={`md`}>
      <Flex justify={`flex-start`} mt={`xl`} direction={`column`} gap={20}>
        <Stack gap={35}>
          <Group>
            <Avatar
              src={`${import.meta.env.VITE_API_BASE_URL}/${currentUserData?.photoProfile
                }`}
              size={`xl`}
            />
            <Stack gap={0}>
              <Title order={3}>{currentUserData.username}</Title>
              <Text order={4}>{currentUserProfileData.name}</Text>
            </Stack>
          </Group>
          <Box px={10}>
            <ProfileEditComponent currentUserProfile={currentUserProfileData} />
          </Box>
        </Stack>
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
            <Tabs.Panel value="friend"><ProfileFriend /></Tabs.Panel>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};

export default ProfilePage;
