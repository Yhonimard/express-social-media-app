import useGetListCommentByPostId from "@/features/comment/useGetListCommentsByPostId";
import useDeletePost from "@/features/post/useDeletePost";
import useUpdatePost from "@/features/post/useUpdatePost";
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
import { useFormik } from "formik";
import moment from "moment";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import PostCardCommentComponent from "../postCardComment";
import PostCardCommentCreateComponent from "../postCardCommentCreate";
import PostCardCommentNotFound from "../postCardCommentNotFound/PostCardCommentNotFound";
import PostModalDeleteComponent from "../postModalDelete";
import PostModalEditComponent from "../postModalEdit";


const PostDetailCardComponent = ({ postData, postId }) => {
  const [isOpenDeleteModal, { toggle: toggleDeleteModal }] = useDisclosure(false)
  const [isOpenEditModal, { toggle: toggleEditModal }] = useDisclosure(false)

  const navigate = useNavigate()
  const { data: commentsData } = useGetListCommentByPostId(postId, { size: 2 })

  const handleDeletePost = (id) => {
    deletePost(id, {
      onSuccess: () => navigate("../..")
    })
  }

  const updateFormik = useFormik({
    initialValues: {
      title: postData?.title && postData.title,
      content: postData?.content && postData.content

    },

    validationSchema: yup.object({
      title: yup.string().required().min(5).max(200),
      content: yup.string().required().min(5).max(200)
    }),

    onSubmit: (data) => {
      updatePost(data, {
        onSuccess: () => {
          updateFormik.handleReset()
          toggleEditModal()
        }
      })
    }
  })
  const { mutate: updatePost } = useUpdatePost(postId, true)
  const { mutate: deletePost } = useDeletePost(true)

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
                <Tooltip withArrow label={postData?.author.username}>
                  <Avatar
                    src={`${import.meta.env.VITE_API_BASE_URL}/${postData?.author.photoProfile
                      }`}
                    alt={postData?.author.username}
                    radius="xl"
                    size="md"
                  />
                </Tooltip>
              </ActionIcon>
              <Box>
                <Text>{postData?.author.username}</Text>
                <Text size="sm">{moment(postData?.createdAt).format("DD MMMM, YYYY")}</Text>
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
            src={`${import.meta.env.VITE_API_BASE_URL}/${postData?.image}`}
            width={`100%`}
            mah={`500px`}
          />
        </CardSection>
        <Stack mt={"md"}>
          <Title order={4}>{postData?.title}</Title>
          <Text lineClamp={3}>{postData?.content}</Text>
        </Stack>

        <Divider mt={"sm"} />
        <PostCardCommentCreateComponent postId={postData?.postId} />
        <Divider mt={`md`} />
        <CardSection inheritPadding>
          {commentsData?.pages.map(p => {
            return (
              <Fragment key={p.data}>
                {p.data.length < 1 && <PostCardCommentNotFound />}
                {p.data.length >= 1 && p.data.map(c => (
                  <PostCardCommentComponent
                    key={c?.id}
                    author={c?.author}
                    createdAt={moment(c.createdAt).format("DD MMMM, YYYY")}
                    title={c.title}
                  />
                ))}
              </Fragment>

            )
          })}
        </CardSection>
      </Card>
      <PostModalDeleteComponent close={toggleDeleteModal} openedModal={isOpenDeleteModal} deletePost={handleDeletePost} postId={postId} />
      <PostModalEditComponent openedModal={isOpenEditModal} close={toggleEditModal} formik={updateFormik} />
    </>
  )
}

export default PostDetailCardComponent