import CommentFormComponent from "@/components/comment/commentForm";
import CommentNotFoundComponent from "@/components/comment/commentNotFound";
import Post from "@/components/Post";
import PostCardActionComponent from "@/components/Post/PostCardAction";
import useGetListCommentByPostId from "@/features/comment/useGetListCommentsByPostId";
import useDeletePostByUser from "@/features/post/useDeletePostByUser";
import useUpdatePostByUser from "@/features/post/useUpdatePostByUser";
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  CardSection,
  Divider,
  Group,
  Image,
  Menu,
  rem,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Delete as IconDelete,
  Edit as IconEdit,
  MoreVert as IconMoreVert,
} from "@mui/icons-material";
import { useFormik } from "formik";
import moment from "moment";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ProfilePostCommentComponent from "../profilePostComment";

const ProfilePostCardComponent = ({
  author,
  content,
  title,
  image,
  createdAt,
  postId,
}) => {
  const [isOpenDeleteModal, { toggle: toggleDeleteModal }] =
    useDisclosure(false);
  const [isOpenEditModal, { toggle: toggleEditModal }] = useDisclosure(false);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

  const handleDeletePost = () => {
    deletePost(postId);
  };

  const updateFormik = useFormik({
    initialValues: {
      title: title,
      content: content,
    },
    validationSchema: yup.object({
      title: yup.string().required().min(5).max(200),
      content: yup.string().required().min(5).max(200),
    }),
    onSubmit: (data) => {
      updatePost(data, {
        onSuccess: () => {
          updateFormik.handleReset();
          toggleEditModal();
        },
      });
    },
  });

  const { mutate: updatePost } = useUpdatePostByUser(currentUser.id, postId);
  const { data: commentsData, isSuccess: isSuccessFetchComment } =
    useGetListCommentByPostId(postId, { size: 1 });
  const { mutate: deletePost } = useDeletePostByUser(currentUser.id);

  return (
    <>
      <Card>
        <CardSection inheritPadding py={`xs`}>
          <Group justify="space-between">
            <Group>
              <ActionIcon
                radius={`xl`}
                variant="subtle"
                color="gray"
                size={`xl`}>
                <Tooltip withArrow label={author?.username}>
                  <Avatar
                    src={`${import.meta.env.VITE_API_BASE_URL}/${
                      author?.photoProfile
                    }`}
                    alt={author?.username}
                    radius="xl"
                    size="md"
                  />
                </Tooltip>
              </ActionIcon>
              <Box>
                <Text>{author?.username}</Text>
                <Text size="sm">
                  {moment(createdAt).format("DD MMMM, YYYY")}
                </Text>
              </Box>
            </Group>
            {author?.id === currentUser.id && (
              <Menu position="left-start">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconMoreVert />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={toggleEditModal}
                    leftSection={
                      <IconEdit style={{ width: rem(14), height: rem(14) }} />
                    }>
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    onClick={toggleDeleteModal}
                    leftSection={
                      <IconDelete style={{ width: rem(14), height: rem(14) }} />
                    }
                    color="red">
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </CardSection>
        <Box
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/post/${postId}`)}>
          <CardSection mt={`sm`}>
            <Image
              src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
              width={`100%`}
              mah={`500px`}
              loading="lazy"
            />
          </CardSection>
          <Stack mt={"md"}>
            <Title order={4}>{title}</Title>
            <Text lineClamp={3}>{content}</Text>
          </Stack>

          <Divider mt={"sm"} />
        </Box>
        <PostCardActionComponent postId={postId} />
        <Divider mt={"sm"} />
        <CommentFormComponent postId={postId} />
        <Divider mt={`md`} />
        <CardSection inheritPadding>
          {isSuccessFetchComment &&
            commentsData?.pages.map((p, i) => {
              return (
                <Fragment key={i}>
                  {p.data.length < 1 && <CommentNotFoundComponent />}
                  {p.data.map((p) => {
                    return (
                      <ProfilePostCommentComponent
                        key={p.id}
                        author={p.author}
                        commentId={p.id}
                        postId={postId}
                        createdAt={moment(p.createdAt).format("DD MMMM, YYYY")}
                        title={p.title}
                      />
                    );
                  })}
                </Fragment>
              );
            })}
        </CardSection>
      </Card>
      <Post.delete
        close={toggleDeleteModal}
        openedModal={isOpenDeleteModal}
        deletePost={handleDeletePost}
        postId={postId}
      />
      <Post.edit
        openedModal={isOpenEditModal}
        close={toggleEditModal}
        formik={updateFormik}
      />
    </>
  );
};
//
export default ProfilePostCardComponent;
