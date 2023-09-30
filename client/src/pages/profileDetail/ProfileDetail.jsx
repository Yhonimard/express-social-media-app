import ProfileDetailPostListComponent from "@/components/profileDetailPostList";
import ProfileDetailTabPanelComponent from "@/components/profileDetailTabPanel";
import { MoreVert } from "@mui/icons-material";
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";

const ProfileDetail = () => {
  const [leftAnchorEl, setLeftAnchorEl] = useState(null)
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null)
  const isOpenLeftMenu = Boolean(leftAnchorEl)
  const isOpenAvatarMenu = Boolean(avatarAnchorEl)

  const openLeftMenu = useCallback((e) => {
    if (!isOpenLeftMenu) setLeftAnchorEl(e.currentTarget)
    if (isOpenLeftMenu) setLeftAnchorEl(null)
  }, [isOpenLeftMenu])

  const openAvatarMenu = useCallback((e) => {
    if (!isOpenAvatarMenu) setAvatarAnchorEl(e.currentTarget)
    if (isOpenAvatarMenu) setAvatarAnchorEl(null)
  }, [isOpenAvatarMenu])

  return (
    <Stack spacing={2}>
      <Paper sx={{ px: 2, py: 2 }}>
        <Stack direction={"row"} justifyContent="space-between">
          <Stack direction={`row`} spacing={2}>
            <Box>
              <IconButton onClick={openAvatarMenu}>
                <Avatar sx={{ width: 70, height: 70 }} />
              </IconButton>
              <Menu open={isOpenAvatarMenu} anchorEl={avatarAnchorEl} onClose={openAvatarMenu} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "center" }}>
                <MenuItem>change photo profile</MenuItem>
              </Menu>
            </Box>
            <Box >
              <Typography variant="h6" sx={{ mt: 1.5 }} fontWeight="semi-bold" color="text.secondary">
                username
              </Typography>
              <Typography variant="body1" color="text.secondary" >
                birthday date
              </Typography>
            </Box>
          </Stack>
          <Box>
            <IconButton onClick={openLeftMenu}>
              <MoreVert />
            </IconButton>
            <Menu open={isOpenLeftMenu} anchorEl={leftAnchorEl} onClose={openLeftMenu} anchorOrigin={{ horizontal: "left", vertical: "bottom" }} transformOrigin={{ horizontal: "right", vertical: "top" }}>
              <MenuItem>edit profile</MenuItem>
            </Menu>
          </Box>
        </Stack>
        <ProfileDetailTabPanelComponent />
      </Paper>
      <ProfileDetailPostListComponent />
    </Stack>

  )
}

export default ProfileDetail