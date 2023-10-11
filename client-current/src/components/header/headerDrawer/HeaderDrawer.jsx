import { listNavbar } from "@/fixtures/global";
import { Drawer, Space, Stack } from "@mantine/core";
import { NavLink } from "react-router-dom";
import classes from "./HeaderDrawer.module.css";

const HeaderDrawerComponent = ({ opened, close }) => {
  return (
    <Drawer opened={opened} onClose={close} size={`xs`}>
      <Stack justify="center" gap={2}>
        {listNavbar.map((l) => {
          return (
            <NavLink
              key={l.label}
              // label={l.label}
              // key={l.label}
              // active={loc.pathname.startsWith(l.label)}
              // leftSection={<l.icon />}
              // component={NavLinkReactRouter}
              to={l.to}
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
