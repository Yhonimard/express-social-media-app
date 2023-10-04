import useGetPostListByUser from "@/features/post/useGetPostListByUser";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import ProfilePostComponent from "./profilePost";

const ProfileComponent = () => {
  const { data: postUserData, isSuccess: isSuccessFetchPost } =
    useGetPostListByUser();

  return (
    <Container size={`md`}>
      <Flex
        justify={`flex-start`}
        mt={`xl`}
        direction={`column`}
        px={{ base: "lg" }}
        gap={20}
      >
        <Group>
          <Avatar src="https://source.unsplash.com/500x500" size={`xl`} />
          <Stack gap={0}>
            <Title order={3}>name</Title>
            <Text order={4}>name</Text>
          </Stack>
        </Group>
        <Box px={10}>
          <Button fullWidth color="gray">
            edit profile
          </Button>
        </Box>
        <Box>
          <Tabs defaultValue="post">
            <Tabs.List mb={20}>
              <Tabs.Tab value="post">post</Tabs.Tab>
              <Tabs.Tab value="likes">likes</Tabs.Tab>
              <Tabs.Tab value="comment">comment</Tabs.Tab>
              <Tabs.Tab value="friend">friend</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="post">
              {isSuccessFetchPost &&
                postUserData.pages.map((p) => (
                  <Stack key={p.data} gap={`sm`}>
                    {p.data.map((data) => (
                      <ProfilePostComponent
                        key={data.id}
                        postId={data.id}
                        {...data}
                      />
                    ))}
                  </Stack>
                ))}
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
