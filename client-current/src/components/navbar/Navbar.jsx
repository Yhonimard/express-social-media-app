import { listNavbar } from "@/fixtures/global";
import { Stack, Tooltip, rem } from "@mantine/core";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

function NavbarLink({ icon: Icon, label, onClick, to }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink
        onClick={onClick}
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
