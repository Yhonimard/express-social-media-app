import useGetAllCommentPostId from "@/features/comment/useGetAllCommentPostId";
import useLikeOrUnlikePostList from "@/features/post/useLikeOrUnlikePostList";
import { Favorite, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentComponent from "../comment";
import CommentInputComponent from "../commentInput";
import CommentNotFoundComponent from "../commentNotFound";
import PostCardMenuComponent from "../postCardMenu";
import useGetPostLikesList from "@/features/post/useGetPostLikesList";

const PostCard = ({
  author,
  content,
  postId,
  image,
  title,
  createdAt,
  isLoading,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { username } = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.data);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const { data: likesData } = useGetPostLikesList({ postId });

  const userHasLike = likesData?.data?.some((u) => u?.user?.id === user.id);

  const { data: commentsData } = useGetAllCommentPostId(postId, 1);
  const { mutate: likeOrUnlike } = useLikeOrUnlikePostList({ postId });

  const likeOrUnlikeHandler = (userHasLike) => {
    likeOrUnlike(userHasLike);
  };

  return (
    <Card sx={{ width: "100%", maxWidth: "600px", borderRadius: ".5rem" }}>
      <CardHeader
        avatar={
          isLoading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={35}
              height={35}
            />
          ) : (
            <Tooltip title={author.username}>
              <IconButton>
                <Avatar
                  sx={{ width: 35, height: 35 }}
                  src={`${import.meta.env.VITE_API_BASE_URL}/${
                    author?.photoProfile
                  }`}
                />
              </IconButton>
            </Tooltip>
          )
        }
        action={
          isLoading || author?.username !== username ? null : (
            <>
              <IconButton onClick={openMenu}>
                <MoreVert />
              </IconButton>
              <PostCardMenuComponent
                postId={postId}
                anchorEl={anchorEl}
                title={title}
                content={content}
                handleCloseMenu={() => setAnchorEl(null)}
                single={false}
              />
            </>
          )
        }
        title={
          isLoading ? (
            <Skeleton animation="wave" height={10} width="80%" sx={{ mb: 1 }} />
          ) : (
            author?.username
          )
        }
        subheader={
          isLoading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            createdAt
          )
        }
      />
      <CardActionArea onClick={() => navigate(`post/${postId}`)}>
        {isLoading ? (
          <Skeleton
            sx={{ height: 400 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
            // height={{ base: 300, md: 100, xl: 500 }}
            sx={{ objectFit: "cover" }}
          />
        )}
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          ) : (
            <>
              <Typography variant="body1">{title}</Typography>
              <Typography
                variant="body2"
                className="text3truncate"
                color="text.secondary"
              >
                {content}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          onClick={() => likeOrUnlikeHandler({ postId, userHasLike })}
        >
          <Favorite color={userHasLike ? "error" : ""} />
        </IconButton>
      </CardActions>
      <Divider />
      <CommentInputComponent postId={postId} />
      <Divider />
      {commentsData?.pages?.map((g, i) => {
        return (
          <Fragment key={i}>
            {g.data.length < 1 && <CommentNotFoundComponent />}
            {g?.data.map((i) => (
              <CommentComponent
                key={i.id}
                author={i.author}
                createdAt={i.createdAt}
                title={i.title}
              />
            ))}
          </Fragment>
        );
      })}
    </Card>
  );
};

export default PostCard;
