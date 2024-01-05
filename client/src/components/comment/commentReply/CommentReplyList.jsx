import comment from "@/config/comment"
import { Box, Button, Collapse } from "@mui/material"
import { memo } from "react"
import { TransitionGroup } from "react-transition-group"
import CommentReply from "./CommentReply"
import useCombineDataPaginateArray from "@/hooks/useCombineDataPaginateArray"

const CommentReplyList = ({ cid, pid, size }) => {
  const commentReplyQuery = comment.query.GetCommentReply({ cid, pid, size })

  const commentRepliesData = useCombineDataPaginateArray(commentReplyQuery.data)
  return (
    <Box>

      {!commentReplyQuery.isLoading && (
        <TransitionGroup >
          {commentRepliesData.map((cr, i) => (
            <Collapse key={cr.id}  >
              <CommentReply
                author={cr.author}
                cid={cr.id}
                pid={pid}
                created_at={cr.created_at}
                isLast={commentRepliesData.length === (i + 1)}
                title={cr.title}
                parentId={cid}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      )}
      <Collapse in={commentReplyQuery.hasNextPage} >
        <Button fullWidth onClick={commentReplyQuery.fetchNextPage} color="inherit">Show More</Button>
      </Collapse >



      {/* {!commentReplyQuery.isLoading &&
        commentReplyQuery.data.pages.map((p, i) => (
          <TransitionGroup key={i}>
            {p.data.map((cr, i) => {
              return (
                <Collapse key={cr.id}>
                  <CommentReply
                    author={cr.author}
                    cid={cr.id}
                    pid={pid}
                    created_at={cr.created_at}
                    isLast={commentRepliesData.length === (i + 1)}
                    title={cr.title}
                    parentId={cid}
                  />
                </Collapse>
              )
            })}
          </TransitionGroup>
        ))
      } */}



    </Box>
  )
}

export default memo(CommentReplyList)
