import { AppBar, Avatar, Box, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import Icon from "@/assets/Icon"
import React, { Fragment, memo, useState } from "react"
import HeaderDrawer from "./Header.Drawer"
import { useDispatch, useSelector } from "react-redux"
import HeaderSearch from "./HeaderSearch"
import StyledMenu from "../StyledMenu"
import useOpenMenu from "@/hooks/useOpenMenu"
import { useNavigate } from "react-router-dom"
import profile from "@/config/profile/profile"

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const currentUser = useSelector(s => s.auth.user)

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <IconButton sx={{ display: { md: "none" } }} size="large" onClick={() => setOpenDrawer(s => !s)} >
              <Icon.Menu />
            </IconButton>
            <Typography sx={{ display: { xs: "none", md: "block" } }}>social</Typography>
          </Box>
          <HeaderSearch />
          {/* <Tooltip title={currentUser.username}>
            <IconButton>
              <Avatar sx={{ width: 30, height: 30 }} src={`${import.meta.env.VITE_API_BASE_URL}/${currentUser.photo_profile}`} />
            </IconButton>
          </Tooltip> */}
          <HeaderAvatar
            currentUser={currentUser}
          />
        </Toolbar>
      </AppBar >
      <HeaderDrawer open={openDrawer} onClose={() => setOpenDrawer(s => !s)} />
    </>
  )
}


const HeaderAvatar = ({ currentUser }) => {
  const [isOpenMenu, anchorEl, toggleMenu] = useOpenMenu()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const navigateHandler = (tabsLocation) => {
    dispatch(profile.reducer.action.setTabsLocation(tabsLocation))
    navigate(`/profile`)
  }

  const openFollowersModal = () => {
    dispatch(profile.reducer.action.toggleFollowersModal())
  }

  const openFollowingModal = () => {
    dispatch(profile.reducer.action.toggleFollowingModal())
  }

  return (
    <>
      <Tooltip title={currentUser.username}>
        <IconButton onClick={toggleMenu} >
          <Avatar sx={{ width: 30, height: 30 }} src={`${import.meta.env.VITE_API_BASE_URL}/${currentUser.photo_profile}`} />
        </IconButton>
      </Tooltip>
      <StyledMenu anchorEl={anchorEl} open={isOpenMenu} onClose={toggleMenu}>

        <MenuItem onClick={() => navigateHandler(1)}>
          <Icon.AccountCircle />
          Profile
        </MenuItem>

        <MenuItem onClick={() => navigateHandler(0)}>
          <Icon.Upload />
          Post
        </MenuItem>

        <MenuItem onClick={() => navigateHandler(3)}>
          <Icon.Favorite />
          Liked Post
        </MenuItem>

        <MenuItem onClick={() => navigateHandler(4)}>
          <Icon.Comment />
          Commented Post
        </MenuItem>

        <MenuItem onClick={openFollowersModal}>
          <Icon.People />
          Followers
        </MenuItem>

        <MenuItem onClick={openFollowingModal}>
          <Icon.PersonAddAlt1 />
          Following
        </MenuItem>

        <MenuItem onClick={() => navigateHandler(2)}>
          <Icon.GroupAdd />
          Request Followers
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem>
          <Icon.Logout />
          Logout
        </MenuItem>
      </StyledMenu>
    </>
  )
}


export default Header
