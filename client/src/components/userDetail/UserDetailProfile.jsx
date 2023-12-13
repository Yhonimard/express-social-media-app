import Icon from "@/assets/Icon"
import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import user from "@/config/user"
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"

const UserDetailProfile = ({ userId, username }) => {
  const { data, isLoading } = user.query.GetProfileByUserId(userId)
  if (isLoading) return <LoadingOverlay />
  console.log(data);
  return (
    <>
      {(data.phone && data.bio && data.birthday) && (
        <List >
          {data.bio !== null && data.bio !== "" && (
            <ListItem>
              <ListItemIcon>
                <Icon.Abc />
              </ListItemIcon>
              <ListItemText primary={data.bio} />
            </ListItem>
          )}

          {data.birthday !== null && data.birthday !== "" && (
            <ListItem>
              <ListItemIcon>
                <Icon.Cake />
              </ListItemIcon>
              <ListItemText primary={data.birthday} />
            </ListItem>
          )}

          {data.phone !== null && data.phone !== "" && (
            <ListItem>
              <ListItemIcon>
                <Icon.Phone />
              </ListItemIcon>
              <ListItemText primary={data.phone} />
            </ListItem>
          )}
        </List>
      )}

      {(data.phone === null || data.phone === "") && (data.bio === null || data.bio === "") && (data.birthday === null || data.birthday === "") && (
        <Box minHeight={`100%`} justifyContent={`center`} display={`flex`} alignItems={`center`} mt={2}>
          <Typography textAlign={`center`} mt={1}>{username} dont have updated profile</Typography>
        </Box>
      )}
    </>

  )
}

export default UserDetailProfile