import comment from "@/config/comment"
import { Box, Button, Collapse, List } from "@mui/material"
import { TransitionGroup } from "react-transition-group"
import Comment from "./Comment"
import CommentNotFound from "./CommentNotFound"

const CommentList = ({ size, pid, isOnDetailPage = false }) => {
  const commentsQuery = comment.query.GetCommentsPosts({ postId: pid, size })
  return (
    <List>
      {commentsQuery?.data?.pages.map((p, i) => (
        <TransitionGroup key={i}>
          {p.data.map((c, i) => (
            <Collapse key={c.id} timeout={350} >
              <Comment pid={pid} author={c.author} created_at={c.created_at} title={c.title} cid={c.id} isLast={(p.data.length - 1) === i} />
            </Collapse>
          ))}
          <Collapse in={p.data.length >= 1 || p.data.length < 1}>
            {p.data.length < 1 && <CommentNotFound />}
          </Collapse>
        </TransitionGroup>
      ))}
      <Collapse in={isOnDetailPage && commentsQuery.hasNextPage} timeout={350}>
        <Box px={2}>
          <Button onClick={commentsQuery.fetchNextPage} fullWidth variant="contained" color="inherit">See More</Button>
        </Box>
      </Collapse>
    </List >
  )
}

export default CommentList

