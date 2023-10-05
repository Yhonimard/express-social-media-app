import useCreatePostByUser from "@/features/post/useCreatePostByUser";
import useGetPostListByUser from "@/features/post/useGetPostListByUser";
import postValidation from "@/utils/validation/post.validation";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  FileButton,
  Flex,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPhoto, IconSend } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import classses from "./Profile.module.css";
import ProfilePostComponent from "./profilePost";

const ProfileComponent = () => {
  const {
    data: postUserData,
    isSuccess: isSuccessFetchPost,
    hasNextPage,
    fetchNextPage,
  } = useGetPostListByUser();

  const createPostFormik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: "",
    },
    onSubmit: (data) => {
      addPostByUser(data);
      createPostFormik.handleReset();
    },
    validationSchema: postValidation.createPostValidation,
  });
  const currentUser = useSelector((state) => state.auth.user);
  const { mutate: addPostByUser } = useCreatePostByUser(currentUser.id);

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
              <Paper>
                <form
                  className={classses.upload_form}
                  onSubmit={createPostFormik.handleSubmit}
                >
                  <div className={classses.upload__form}>
                    <TextInput
                      label=""
                      w={`100%`}
                      placeholder="title"
                      name="title"
                      onChange={createPostFormik.handleChange}
                      value={createPostFormik.values.title}
                      error={
                        createPostFormik.touched.title &&
                        createPostFormik.errors.title
                      }
                    />
                    <TextInput
                      label=""
                      w={`100%`}
                      placeholder="content"
                      name="content"
                      onChange={createPostFormik.handleChange}
                      value={createPostFormik.values.content}
                      error={
                        createPostFormik.touched.content &&
                        createPostFormik.errors.content
                      }
                    />
                    <ActionIcon
                      type="submit"
                      variant="subtle"
                      color="gray"
                      component="button"
                    >
                      <IconSend />
                    </ActionIcon>
                  </div>
                  <Group align="center" mt={`xs`}>
                    <FileButton
                      onChange={(e) =>
                        createPostFormik.setFieldValue("image", e)
                      }
                    >
                      {(props) => (
                        <ActionIcon variant="subtle" color="gray" {...props}>
                          <IconPhoto />
                        </ActionIcon>
                      )}
                    </FileButton>
                    {createPostFormik.values.image && (
                      <Text>{createPostFormik.values.image.name}</Text>
                    )}
                    {createPostFormik.touched.image && (
                      <Text c={`red`} size="xs">
                        {createPostFormik.errors.image}
                      </Text>
                    )}
                  </Group>
                </form>
              </Paper>
              <Divider my={`xs`} />
              {isSuccessFetchPost &&
                postUserData.pages.map((p, i) => (
                  <Stack key={i} gap={`sm`}>
                    {p.data.length < 1 && (
                      <Center h={`100%`}>no post here</Center>
                    )}
                    {p.data.map((data) => (
                      <ProfilePostComponent
                        key={data.id}
                        postId={data.id}
                        {...data}
                      />
                    ))}
                  </Stack>
                ))}
              <Button
                onClick={fetchNextPage}
                style={{ visibility: hasNextPage ? "visible" : "hidden" }}
                fullWidth
                color="gray"
                variant="filled"
                my={50}
              >
                see more your post
              </Button>
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
