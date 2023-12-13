import Icon from "@/assets/Icon"
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Link } from "react-router-dom"

const HeaderDrawer = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} >
      <Box width={300}>
        <List >

          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/" >
              <ListItemIcon>
                <Icon.Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="profile">
              <ListItemIcon>
                <Icon.AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="chat">
              <ListItemIcon>
                <Icon.Chat />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
    </Drawer>
  )
}

export default HeaderDrawer