import Icon from "@/assets/icon";
import mediaQueryHelper from "@/helpers/validation/media-query";
import authReducer from "@/redux/authReducer";
import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Container,
  Group,
  Menu,
  Stack,
  Text,
  TextInput,
  Tooltip,
  rem,
  useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import HeaderDrawerComponent from "./headerDrawer";
import HeaderSearch from "./headerSearch/HeaderSearch";
import HeaderAvatar from "./HeaderAvatar";

export default function HeaderComponent() {
  const theme = useMantineTheme();
  const [openedDrawer, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure();
  const [openedModal, { toggle: toggleModal }] = useDisclosure()
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const chatState = useSelector(s => s.chat)
  const mediaQuery = mediaQueryHelper()
  const location = useLocation()

  const inChatUrl = location.pathname === "/chat"


  return (
    <div>
      <div className={classes.header}>
        <Container size={5000} className={classes.mainSection}>
          <Group justify="space-between">

            <Box>
              {(!chatState.message.isOpen || mediaQuery.up750 || !inChatUrl) && (

                <Text display={{ base: "none", xs: "block" }}>social media</Text>
              )}

              <Group gap={20}>

                <Burger
                  opened={openedDrawer}
                  onClick={toggleDrawer}
                  display={{ base: "block", xs: "none" }}
                />
                <HeaderDrawerComponent
                  opened={openedDrawer}
                  close={closeDrawer}
                />
                {(chatState.message.isOpen && inChatUrl && mediaQuery.down750) && (
                  <Group gap={30}>
                    <ActionIcon radius={`xl`} variant="subtle" color="gray" size={"lg"}>
                      <Tooltip withArrow label={currentUser.username}>
                        <Avatar
                          src={`${import.meta.env.VITE_API_BASE_URL}/${currentUser.photoProfile
                            }`}
                          alt={currentUser.username}
                          radius="xl"
                          size="md"
                        />
                      </Tooltip>
                    </ActionIcon>

                    <Stack gap={0}>
                      <Text>username</Text>
                      <Text size="sm">online</Text>
                    </Stack>
                  </Group>
                )}

              </Group>


            </Box>

            {(!chatState.message.isOpen || !inChatUrl || mediaQuery.up750) && (
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
            )}
            {(!chatState.message.isOpen || !inChatUrl || mediaQuery.up750) && (
              <HeaderAvatar user={currentUser} />
            )}

          </Group>
        </Container>
      </div>
      <HeaderSearch opened={openedModal} toggle={toggleModal} />
    </div>
  );
}
