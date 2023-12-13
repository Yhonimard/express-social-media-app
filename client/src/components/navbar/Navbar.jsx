import Icon from "@/assets/Icon"
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Tooltip } from "@mui/material"
import { Link } from "react-router-dom"
const Navbar = ({ drawerWidth }) => {

  return (
    <Drawer variant="permanent" sx={{ width: drawerWidth, position: "fixed" }} >

      <Box sx={{ mt: "65px", width: drawerWidth }}>

        <List sx={{}}>

          <ListItem disablePadding>
            <Tooltip title="Home">
              <ListItemButton sx={{ minHeight: 48, justifyContent: "center" }} LinkComponent={Link} to="/" >
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <Icon.Home />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>

          <ListItem disablePadding>
            <Tooltip title="Profile">
              <ListItemButton sx={{ minHeight: 48, justifyContent: "center" }} LinkComponent={Link} to="profile">
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <Icon.AccountCircle />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>

          <ListItem disablePadding>
            <Tooltip title="Chat">
              <ListItemButton sx={{ minHeight: 48, justifyContent: "center" }} LinkComponent={Link} to="chat">
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <Icon.Chat />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>


      </Box>

    </Drawer>
  )
}

export default Navbar
