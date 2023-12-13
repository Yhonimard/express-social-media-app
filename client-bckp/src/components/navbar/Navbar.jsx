import { listNavbar } from "@/fixtures/global";
import { Stack, Tooltip, rem } from "@mantine/core";
import { NavLink, useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import chatReducer from "@/redux/chatReducer";

function NavbarLink({ icon: Icon, label, to }) {
  const chatState = useSelector(s => s.chat)
  const dispatch = useDispatch()
  const location = useLocation()

  const handleChatNavigate = () => {
    if (location.pathname === "/chat" && chatState.message.isOpen) dispatch(chatReducer.action.closeChatMessage())
  }
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink
        onClick={to === "/chat" && handleChatNavigate}
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.link_active}` : classes.link
        }
        to={to}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </NavLink>
    </Tooltip>
  );
}

export default function NavbarComponent() {
  const links = listNavbar.map((link) => (
    <NavbarLink {...link} key={link.label} to={link.to} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}
