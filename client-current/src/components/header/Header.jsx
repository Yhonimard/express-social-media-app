import Icon from "@/assets/icon";
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
  useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import HeaderSearch from "./headerSearch/HeaderSearch";
import HeaderDrawerComponent from "./headerDrawer";

export default function HeaderComponent() {
  const theme = useMantineTheme();
  const [openedDrawer, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure();
  const [openedModal, { toggle: toggleModal }] = useDisclosure()
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
              onClick={toggleModal}
              radius="xl"
              size="md"
              style={{ width: "40%" }}
              placeholder="Search..."
              rightSectionWidth={42}
              leftSection={
                <Icon.Search
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
                  <Icon.Search
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
                  to={`/profile?tabs=saved_post`}
                  leftSection={
                    <Icon.Star
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
                  leftSection={
                    <Icon.Settings
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Account settings
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <Icon.SwapHoriz
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Change account
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <Icon.Logout
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
                    <Icon.Pause
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }>
                  Pause subscription
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <Icon.Delete
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
      <HeaderSearch opened={openedModal} toggle={toggleModal} />
    </div>
  );
}
