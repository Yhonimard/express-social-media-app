import useDeletePost from "@/features/post/useDeletePost";
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
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import PostCardCommentComponent from "../postCardComment";
import PostCardCreateCommentComponent from "../postCardCreateComment";
import PostModalDeleteComponent from "../postModalDelete";
import PostModalEditComponent from "../postModalEdit";
import useGetListCommentByPostId from "@/features/comment/useGetListCommentsByPostId";
import moment from "moment";

const PostCardComponent = ({
  author,
  content,
  title,
  image,
  createdAt,
  postId,
}) => {


  const [isOpenDeleteModal, { toggle: toggleDeleteModal }] = useDisclosure(false)
  const [isOpenEditModal, { toggle: toggleEditModal }] = useDisclosure(false)

  const handleDeletePost = () => {
    deletePost(postId)
  }
  const { mutate: deletePost } = useDeletePost(postId)

  const handleUpdatePost = (data) => {
    console.log(data);

  }
  const { data: commentsData } = useGetListCommentByPostId(postId, { size: 1 })

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
                size={`xl`}
              >
                <Tooltip withArrow label={author.username}>
                  <Avatar
                    src={`${import.meta.env.VITE_API_BASE_URL}/${author.photoProfile
                      }`}
                    alt={author.username}
                    radius="xl"
                    size="md"
                  />
                </Tooltip>
              </ActionIcon>
              <Box>
                <Text>{author.username}</Text>
                <Text size="sm">{moment(createdAt).format("DD MMMM, YYYY")}</Text>
              </Box>
            </Group>
            <Menu position="left-start">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDots />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={toggleEditModal}
                  leftSection={
                    <IconEdit style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  onClick={toggleDeleteModal}
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                  color="red"
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </CardSection>

        <CardSection mt={`sm`}>
          <Image
            src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
            width={`100%`}
            mah={`500px`}
          />
        </CardSection>
        <Stack mt={"md"}>
          <Title order={4}>{title}</Title>
          <Text lineClamp={3}>{content}</Text>
        </Stack>
        <Divider mt={"sm"} />
        <PostCardCreateCommentComponent postId={postId} />
        <Divider mt={`md`} />
        <CardSection inheritPadding>
          {commentsData?.pages.map(p => (
            p.data.map(p => (
              <PostCardCommentComponent
                key={p?.id}
                author={p?.author}
                createdAt={moment(p.createdAt).format("DD MMMM, YYYY")}
                title={p.title}
              />
            ))
          ))}
        </CardSection>
      </Card>
      <PostModalDeleteComponent close={toggleDeleteModal} openedModal={isOpenDeleteModal} deletePost={handleDeletePost} />
      <PostModalEditComponent openedModal={isOpenEditModal} close={toggleEditModal} updatePost={handleUpdatePost} prevData={{ title, content }} />
    </>
  );
};

export default PostCardComponent;
