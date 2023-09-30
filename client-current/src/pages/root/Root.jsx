import HeaderComponent from "@/components/header";
import NavbarComponent from "@/components/navbar";
import { Box, Flex, Grid, Group } from "@mantine/core";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <>
      <Box>
        <HeaderComponent />
      </Box>
      <Flex>
        <Box
          display={{ base: "none", sm: "block", xs: "block" }}
          mih={`100vh`}
        >
          <NavbarComponent />
        </Box>
        <Box style={{ flexGrow: 1 }} mt={55}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default RootPage;
