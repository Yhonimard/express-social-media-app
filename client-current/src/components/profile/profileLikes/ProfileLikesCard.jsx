import Icon from "@/assets/icon";
import useGetCurrentUserHasLike from "@/features/post-like/useGetCurrentUserHasLike";
import useUnlikePostHasLikeUser from "@/features/post-like/useUnlikePostHasLikeUser";
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  CardSection,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProfileLikesCard = ({
  author,
  content,
  title,
  image,
  createdAt,
  postId,
}) => {


  const navigate = useNavigate()

  const currentUser = useSelector(state => state.auth.user)
  const { data: userHasLike } = useGetCurrentUserHasLike(postId, currentUser.id);

  const unlikePost = () => {
    unlike(null)
  }

  const { mutate: unlike } = useUnlikePostHasLikeUser(postId, currentUser.id)

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
            {/* {author?.id === currentUser.id && (
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
            )} */}
          </Group>
        </CardSection>
        <Box
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/post/${postId}`)}>
          <CardSection mt={`sm`}>
            <Image
              src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
              width={`100%`}
              height={250}
              loading="lazy"
            />
          </CardSection>
          <Stack mt={"md"}>
            <Text size="lg" fw={`bold`} truncate="end">{title}</Text>
            <Text lineClamp={3}>{content}</Text>
          </Stack>

          <Divider mt={"sm"} />
        </Box>
        <Group mt={`sm`}>
          <ActionIcon variant="transparent" color="white" onClick={unlikePost}>
            <Icon.Favorite color={userHasLike?.hasLike ? "error" : "inherit"} />
          </ActionIcon>
        </Group>
      </Card>
      {/* <Post.delete
        close={toggleDeleteModal}
        openedModal={isOpenDeleteModal}
        deletePost={handleDeletePost}
        postId={postId}
      />
      <Post.edit
        openedModal={isOpenEditModal}
        close={toggleEditModal}
        formik={updateFormik}
      /> */}
    </>
  );
};

export default ProfileLikesCard;
