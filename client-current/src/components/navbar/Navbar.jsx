import { listNavbar } from "@/fixtures/global";
import { Stack, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";

function NavbarLink({ icon: Icon, label, active, onClick }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export default function NavbarComponent() {
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  const navigateHandler = ({ index, to }) => {
    setActive(index);
    navigate(to);
  };

  const links = listNavbar.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => navigateHandler({ index, to: link.to })}
    />
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
