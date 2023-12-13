import comment from "@/config/comment"
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import LoadingOverlay from "../loadingOverlay/LoadingOverlay"
import { Fragment } from "react"

const ProfileCommentListItem = ({ author, created_at, id, title, child, isLast }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <IconButton sx={{ mt: "2px", mr: "8px" }} size="small" >
          <Avatar sx={{ width: 37, height: 37 }} src={`${import.meta.env.VITE_API_BASE_URL}/${author.photo_profile}`} />
        </IconButton>
        <Stack gap={1}>
          <Stack pt={.7} direction={`row`} gap={.5}>
            <Box>
              <Typography variant="body2" color={`text.secondary`} >
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {author.username}
                </Typography>
                {" "}
                {title}
              </Typography>
              <Typography
                variant="body2"
                color={`text.secondary`}
              >
                {created_at}
              </Typography>
            </Box>
          </Stack>
          {child && <ProfileCommentListItemChild author={child.author} created_at={child.created_at} id={child.id} title={child.title} />}
        </Stack>
      </ListItem>
      {!isLast && <Divider variant="inset" />}
    </>
  )
}

const ProfileCommentListItemChild = ({ author, created_at, id, title }) => {

  return (
    <>
      <Box alignItems="flex-start" display={`flex`} >
        <IconButton sx={{ mt: "2px", mr: "8px" }} size="small" >
          <Avatar sx={{ width: 37, height: 37 }} src={`${import.meta.env.VITE_API_BASE_URL}/${author.photo_profile}`} />
        </IconButton>
        <Stack pt={.7} direction={`row`} gap={.5}>
          <Box>
            <Typography variant="body2" color={`text.secondary`} >
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {author.username}
              </Typography>
              {" "}
              {title}
            </Typography>
            <Typography
              variant="body2"
              color={`text.secondary`}
            >
              {created_at}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  )
}



const ProfileComment = () => {
  const currentUser = useSelector(s => s.auth.user)
  const commentQuery = comment.query.GetUserComment(currentUser.id)
  if (commentQuery.isLoading) return <LoadingOverlay />
  return (
    <List>
      {commentQuery.data.pages.map((p, i) => (
        <Fragment key={i}>
          {p.data.map((c, i) => (
            <ProfileCommentListItem key={c.child ? c.child.id : c.id} author={c.author} created_at={c.created_at} id={c.id} title={c.title} child={c.child} isLast={(p.data.length - 1) === i} />
          ))}
        </Fragment>

      ))}
    </List>
  )
}

export default ProfileComment
