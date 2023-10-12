import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Container,
  Group,
  Menu,
  Text,
  TextInput,
  Tooltip,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import HeaderDrawerComponent from "./headerDrawer";
import { useSelector } from "react-redux";
import {
  Favorite as IconFavorite,
  Search as IconSearch,
  Star as IconStar,
  Message as IconMessage,
  Settings as IconSettings,
  SwapHoriz as IconSwapHoriz,
  Logout as IconLogout,
  Pause as IconPlayerPause,
  Delete as IconDelete,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function HeaderComponent() {
  const theme = useMantineTheme();
  const [openedDrawer, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure();
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <div className={classes.header}>
        <Container size={5000} className={classes.mainSection}>
          <Group justify="space-between">
            <Box>
              <Text display={{ base: "none", xs: "block" }}>social media</Text>
              <Burger
                opened={openedDrawer}
                onClick={toggleDrawer}
                display={{ base: "block", xs: "none" }}
              />
              <HeaderDrawerComponent
                opened={openedDrawer}
                close={closeDrawer}
              />
            </Box>
            <TextInput
              radius="xl"
              size="md"
              style={{ width: "40%" }}
              placeholder="Search..."
              rightSectionWidth={42}
              leftSection={
                <IconSearch
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              rightSection={
                <ActionIcon
                  size={32}
                  radius="xl"
                  color={theme.primaryColor}
                  variant="filled">
                  <IconSearch
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              }
            />
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              withinPortal>
              <Menu.Target>
                <ActionIcon radius={`xl`} variant="subtle" color="gray">
                  <Tooltip withArrow label={user.username}>
                    <Avatar
                      src={`${import.meta.env.VITE_API_BASE_URL}/${
                        user.photoProfile
                      }`}
                      alt={user.username}
                      radius="xl"
                      size="sm"
                    />
                  </Tooltip>
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  component={Link}
                  to={`/profile?tabs=likes`}
                  leftSection={
                    <IconFavorite
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }>
                  Liked posts
                </Menu.Item>

                <Menu.Item
                  component={Link}
                  to={`/profile?tabs=saved_post`}
                  leftSection={
                    <IconStar
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.yellow[6]}
                      stroke={1.5}
                    />
                  }>
                  Saved posts
                </Menu.Item>

                <Menu.Item
                  component={Link}
                  to={`/profile?tabs=comment`}
                  leftSection={
                    <IconMessage
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  }>
                  Your comments
                </Menu.Item>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Account settings
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconSwapHoriz
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Change account
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Logout
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconPlayerPause
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Pause subscription
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconDelete
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </div>
    </div>
  );
}
