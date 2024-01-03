import Icon from "@/assets/Icon"
import user from "@/config/user"
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const ProfileDetail = () => {
  const currentUser = useSelector(s => s.auth.user)
  const { data, isLoading, isSuccess } = user.query.GetCurrentUserProfile(currentUser.id)

  return (
    <>
      {!isLoading && isSuccess && (
        <>
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
          {(data.phone === null || data.phone === "") && (data.bio === null || data.bio === "") && (data.birthday === null || data.birthday === "") && (
            <Box minHeight={`100%`} justifyContent={`center`} display={`flex`} alignItems={`center`}>
              <Typography textAlign={`center`} mt={1}>you dont have any profile. please update it first</Typography>
            </Box>
          )}
        </>
      )}
    </>

  )
}

export default ProfileDetail