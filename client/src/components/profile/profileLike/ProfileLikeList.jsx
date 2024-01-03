import post from "@/config/post"
import useCustomMediaQuery from "@/hooks/useCustomMediaQuery"
import useFetchWhenScroll from "@/hooks/useFetchWhenScroll"
import { Box, ImageList } from "@mui/material"
import { Fragment } from "react"
import { useSelector } from "react-redux"
import ProfileLike from "./ProfileLike"

const ProfileLikeList = () => {
  const mediaQuery = useCustomMediaQuery()
  const currentUser = useSelector(s => s.auth.user)
  const postQuery = post.query.GetPostLikedUser(currentUser.id)
  const fetchOnScroll = useFetchWhenScroll(postQuery.fetchNextPage)
  return (
    <>
      {!postQuery.isLoading && postQuery.isSuccess && (
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
      )}
    </>
  )
}

export default ProfileLikeList