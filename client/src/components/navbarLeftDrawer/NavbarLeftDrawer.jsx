import { AccountCircle, Home, Logout } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import global from "../../redux/global";
import { useNavigate } from "react-router-dom";
import auth from "@/redux/auth";


const NavbarLeftDrawer = () => {
  const { navbarDrawer } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(state => state?.auth?.data)
  
  const listArr = [
    {
      name: "Home",
      icon: <Home />,
      onClick: () => {
        navigate("/")
      }
    },
    {
      name: "Profile",
      icon: <AccountCircle />,
      onClick: () => {
        navigate(`/profile/${user?.id}`)
      }
    },
    {
      name: "Logout",
      icon: <Logout />,
      onClick: () => {
        navigate("/auth?mode=login")
        dispatch(auth.action.removeUser())
      }
    },
  ];
  return (
    <Drawer
      open={navbarDrawer.open}
      onClose={() => dispatch(global.action.showNavbarLeftDrawer(false))}
    >
      <List sx={{ width: 300 }}>
        {listArr.map((i) => (
          <ListItem key={i.name}>
            <ListItemButton onClick={i.onClick}>
              <ListItemIcon>{i.icon}</ListItemIcon>
              <ListItemText primary={i.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavbarLeftDrawer;
