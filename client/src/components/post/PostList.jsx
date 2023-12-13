import useFetchWhenScroll from "@/hooks/useFetchWhenScroll"
import { Grid } from "@mui/material"
import { Fragment, memo } from "react"
import PostCard from "./PostCard/PostCard"

const PostList = ({ query }) => {
  const infiniteScroll = useFetchWhenScroll(query.fetchNextPage)
  
  return (
    <Grid container spacing={1}>
      {query.data.pages.map((p, i) => (
        <Fragment key={i}>
          {p.data.map(p => (
            <Grid key={p.id} item xs={12}>
              <PostCard
                content={p.content}
                created_at={p.created_at}
                title={p.title}
                isFetching={(query.isLoading || query.isFetchingNextPage)}
                author={p.author}
                image={p.image}
                pid={p.id}
              />
            </Grid>
          ))}
        </Fragment>
      ))}
      <Grid item xs={12}>
        {infiniteScroll.isShowBtn && (
          <button ref={infiniteScroll.inViewRef} style={{ visibility: "hidden" }} disabled={!query.hasNextPage || query.isFetchingNextPage} onClick={query.fetchNextPage}></button>
        )}
      </Grid>
    </Grid>
  )

}

export default memo(PostList)

