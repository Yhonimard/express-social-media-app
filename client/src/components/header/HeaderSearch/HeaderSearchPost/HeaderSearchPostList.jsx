import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import post from "@/config/post"
import { Button, Grid, Typography } from "@mui/material"
import { Fragment } from "react"
import HeaderSearchPostCard from "./HeaderSearchPostCard"

const HeaderSearchPostList = ({ searchValue, toggleModal }) => {
  const postQuery = post.query.SearchPost(searchValue)
  if (postQuery.isLoading) return <LoadingOverlay />

  return (
    <Grid container spacing={1} mt={1}>
      {postQuery.data.pages.map((p, i) => (
        <Fragment key={i}>
          {p.posts.map(p => (
            <Grid item key={p.id} xs={12}>
              <HeaderSearchPostCard
                content={p.content}
                title={p.title}
                postId={p.id}
                isLoading={postQuery.isLoading}
                toggleModal={toggleModal}
              />
            </Grid>
          ))}
          {(p.posts.length < 1 && !postQuery.isLoading) && (
            <Grid xs={12} item >
              <Typography textAlign={`center`} p={4} mt={1}>
                No Post found by keyword {searchValue}
              </Typography>
            </Grid>
          )}
        </Fragment>
      ))}
      {postQuery.hasNextPage && (
        <Grid item xs={12}>
          <Button onClick={postQuery.fetchNextPage} fullWidth variant="contained" color="inherit">See More</Button>
        </Grid>
      )}

    </Grid>
  )

}

export default HeaderSearchPostList

