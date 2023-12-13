import Icon from "@/assets/Icon"
import postLike from "@/config/post-like"
import { IconButton, ImageListItem, ImageListItemBar, Stack } from "@mui/material"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProfileLike = ({ image, author, title, postId }) => {

  const navigate = useNavigate()
  const currentUser = useSelector(s => s.auth.user)
  const { mutate: unlike } = postLike.query.UnlikePost({ pid: postId, uid: currentUser.id })

  const unlikePost = useCallback(() => {
    unlike()
  }, [unlike])


  return (
    <ImageListItem sx={{ cursor: "pointer" }} >
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
        alt={title}
        onClick={() => navigate(`/post/${postId}`)}
        style={{ display: "block", objectFit: "cover" }} />
      <ImageListItemBar
        title={title}
        subtitle={(
          <Stack alignItems={`center`} direction={`row`} gap={0.6}>
            <Icon.Create sx={{ width: 14, height: 14 }} />
            {author.username}
          </Stack>
        )}
        actionIcon={
          <IconButton
            onClick={unlikePost}
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about`}
          >
            <Icon.Favorite color="error" />
          </IconButton>
        }
      />
    </ImageListItem>
  )
}

export default ProfileLike