import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import comment from "@/config/comment"
import { Collapse } from "@mui/material"
import { TransitionGroup } from "react-transition-group"
import CommentReply from "./CommentReply"
import { memo } from "react"

const CommentReplyList = ({ cid, pid, size }) => {
  const commentReplyQuery = comment.query.GetCommentReply({ cid, pid, size })

  return (
    <>
      {commentReplyQuery.isLoading && <LoadingOverlay />}
      {!commentReplyQuery.isLoading &&
        commentReplyQuery.data.pages.map((p, i) => (
          <TransitionGroup key={i}>
            {p.data.map((cr, i) => (
              <Collapse key={cr.id}>
                <CommentReply
                  author={cr.author}
                  cid={cr.id}
                  pid={pid}
                  created_at={cr.created_at}
                  isLast={p.data.length === (i + 1)}
                  title={cr.title}
                  parentId={cid}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        ))
      }
    </>
  )
}

export default memo(CommentReplyList)
