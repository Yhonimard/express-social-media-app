import auth from "@/redux/auth";
import { AccountCircle, Home, Logout } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const RootSidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.data)

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
    <Paper sx={{ minHeight: "100vh" }} >
      <List disablePadding>
        {listArr.map((i) => (
          <ListItem key={i.name}>
            <ListItemButton onClick={i.onClick} >
              <ListItemIcon>{i.icon}</ListItemIcon>
              <ListItemText primary={i.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RootSidebar;
