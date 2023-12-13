import Icon from "@/assets/icon";
import authReducer from "@/redux/authReducer";
import {
  ActionIcon,
  Avatar,
  Menu,
  Tooltip,
  rem,
  useMantineTheme
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const HeaderAvatar = ({ user }) => {
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  const logoutUser = () => {
    dispatch(authReducer.action.logoutUser())
  }
  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      withinPortal>
      <Menu.Target>
        <ActionIcon radius={`xl`} variant="subtle" color="gray" size={"lg"}>
          <Tooltip withArrow label={user.username}>
            <Avatar
              src={`${import.meta.env.VITE_API_BASE_URL}/${user.photoProfile
                }`}
              alt={user.username}
              radius="xl"
              size="md"
            />
          </Tooltip>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          to={`/profile?tabs=likes`}
          leftSection={
            <Icon.Favorite
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          }>
          Liked posts
        </Menu.Item>

        <Menu.Item
          component={Link}
          to={`/profile?tabs=comment`}
          leftSection={
            <Icon.Message
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }>
          Your comments
        </Menu.Item>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          onClick={logoutUser}
          leftSection={
            <Icon.Logout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default HeaderAvatar
