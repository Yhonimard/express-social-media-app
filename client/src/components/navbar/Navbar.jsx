import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import global from "../../redux/global";
import NavbarLeftDrawerComponent from "../navbarLeftDrawer";

const Navbar = () => {
  const dispatch = useDispatch();
  const { username, photoProfile } = useSelector((state) => state.auth.data);

  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              onClick={() => dispatch(global.action.showNavbarLeftDrawer(true))}
            >
              <Menu />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography>sosmed app</Typography>
          </Box>
        </Box>
        <Box
          width="35%"
          px={1}
          bgcolor="white"
          color="black"
          borderRadius="3px"
        >
          <InputBase
            placeholder="search..."
            sx={{ width: "100%", color: "black" }}
          />
        </Box>
        <Box>
          <Tooltip title={username}>
            <IconButton>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={`${import.meta.env.VITE_API_BASE_URL}/${photoProfile}`}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      <NavbarLeftDrawerComponent />
    </AppBar>
  );
};

export default Navbar;
