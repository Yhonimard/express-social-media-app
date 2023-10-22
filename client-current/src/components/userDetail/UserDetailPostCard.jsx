import useGetListCommentByPostId from "@/features/comment/useGetListCommentsByPostId";
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  CardSection,
  Divider,
  Group,
  Image,
  LoadingOverlay,
  Stack,
  Text,
  Title,
  Tooltip
} from "@mantine/core";
import moment from "moment";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import CommentComponent from "../comment";
import CommentFormComponent from "../comment/commentForm";
import CommentNotFoundComponent from "../comment/commentNotFound";
import PostCardActionComponent from "../Post/PostCardAction";



const UserDetailPostCard = ({
  author,
  content,
  title,
  image,
  createdAt,
  postId
}) => {
  const navigate = useNavigate()

  // const { data: commentsData, isLoading } = useGetListCommentByPostId(postId, { size: 1 });
  // if (isLoading) return <LoadingOverlay visible />


  return (
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
                  src={`${import.meta.env.VITE_API_BASE_URL}/${author?.photoProfile
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
            loading="eager"
            alt="ww"
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
        {/* {commentsData?.pages?.map((p) => {
          return (
            <Fragment key={p.data}>
              {p.data.length < 1 && <CommentNotFoundComponent />}
              {p.data.length > 0 &&
                p?.data?.map((c) => (
                  <CommentComponent
                    key={c?.id}
                    author={c?.author}
                    createdAt={moment(c.createdAt).format("DD MMMM, YYYY")}
                    title={c.title}
                    commentId={c.id}
                    postId={postId}
                  />
                ))}
            </Fragment>
          );
        })} */}
      </CardSection>
    </Card>

  )
}

export default UserDetailPostCard