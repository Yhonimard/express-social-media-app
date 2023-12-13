import useCustomMediaQuery from "@/hooks/useCustomMediaQuery"
import { Box, ImageList, ImageListItem } from "@mui/material"
import ProfileLike from "./ProfileLike"
import post from "@/config/post"
import { useSelector } from "react-redux"
import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import { Fragment } from "react"
import useFetchWhenScroll from "@/hooks/useFetchWhenScroll"

const ProfileLikeList = () => {
  const mediaQuery = useCustomMediaQuery()
  const currentUser = useSelector(s => s.auth.user)
  const postQuery = post.query.GetPostLikedUser(currentUser.id)
  const fetchOnScroll = useFetchWhenScroll(postQuery.fetchNextPage)
  if (postQuery.isLoading) return <LoadingOverlay />
  return (
    <Box>
      <ImageList gap={4} cols={mediaQuery.downMd ? 2 : 3} sx={{ overflow: "hidden" }} >
        {postQuery.data.pages.map((p, i) => (
          <Fragment key={i}>
            {p.data.map(p => (
              <ProfileLike
                key={p.id}
                author={p.author}
                image={p.image}
                title={p.title}
                postId={p.id}
              />
            ))}
          </Fragment>
        ))}
        {fetchOnScroll.isShowBtn && (
          <button style={{ visibility: "hidden" }} ref={fetchOnScroll.inViewRef} disabled={!postQuery.hasNextPage || postQuery.isFetchingNextPage} ></button>
        )}
      </ImageList>
    </Box>
  )
}

export default ProfileLikeList