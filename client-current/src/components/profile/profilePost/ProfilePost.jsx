import useCreatePostByUser from "@/features/post/useCreatePostByUser";
import useGetPostListByUser from "@/features/post/useGetPostListByUser";
import postValidation from "@/helpers/validation/post.validation";
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  FileButton,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  AddPhotoAlternate as IconAddPhoto,
  Send as IconSend,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import classes from "./ProfilePost.module.css";
import ProfilePostCardComponent from "./profilePostCard";

const ProfilePost = () => {
  
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
    <>
      <Paper>
        <form
          className={classes.upload_form}
          onSubmit={createPostFormik.handleSubmit}>
          <div className={classes.upload__form}>
            <TextInput
              label=""
              w={`100%`}
              placeholder="title"
              name="title"
              onChange={createPostFormik.handleChange}
              value={createPostFormik.values.title}
              error={
                createPostFormik.touched.title && createPostFormik.errors.title
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
              size={`xl`}
              radius={`xl`}
              component="button">
              <IconSend />
            </ActionIcon>
          </div>
          <Group align="center" mt={`xs`}>
            <FileButton
              onChange={(e) => createPostFormik.setFieldValue("image", e)}>
              {(props) => (
                <ActionIcon variant="subtle" color="gray" {...props}>
                  <IconAddPhoto />
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
            {p.data.length < 1 && <Center h={`100%`}>no post here</Center>}
            {p.data.map((data) => (
              <ProfilePostCardComponent
                key={data.id}
                postId={data.id}
                author={data.author}
                content={data.content}
                createdAt={data.createdAt}
                image={data.image}
                title={data.title}
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
        my={50}>
        see more your post
      </Button>
    </>
  );
};

export default ProfilePost;
