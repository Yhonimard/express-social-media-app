import { listNavbar } from "@/fixtures/global";
import chatReducer from "@/redux/chatReducer";
import { Drawer, Space, Stack } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import classes from "./HeaderDrawer.module.css";

const HeaderDrawerComponent = ({ opened, close }) => {
  const chatState = useSelector(s => s.chat)
  const dispatch = useDispatch()
  const location = useLocation()

  const handleChatNavigate = () => {
    if (location.pathname === "/chat" && chatState.message.isOpen) dispatch(chatReducer.action.closeChatMessage())
  }
  return (
    <Drawer opened={opened} onClose={close} size={`xs`}>
      <Stack justify="center" gap={2}>
        {listNavbar.map((l) => {
          return (
            <NavLink
              key={l.label}
              // to={l.to}
              to={l.to}
              onClick={l.to === "/chat" && handleChatNavigate}
              className={({ isActive }) =>
                isActive
                  ? `${classes.link_active} ${classes.link}`
                  : classes.link
              }
            >
              <l.icon />
              <Space w={`md`} />
              {l.label}
            </NavLink>
          );
        })}
      </Stack>
    </Drawer>
  );
};

export default HeaderDrawerComponent;
