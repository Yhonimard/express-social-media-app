import Footer from "@/components/footer/Footer";
import HeaderComponent from "@/components/header";
import NavbarComponent from "@/components/navbar";
import { Box, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <>
      <Box mih={`100vh`} >
        <Box>
          <HeaderComponent />
        </Box>
        <Flex style={{ flexDirection: "row-reverse" }}>
          <Box style={{ flexGrow: 1 }} mt={75}>
            <Outlet />
          </Box>
          <Box
            display={{ base: "none", sm: "block", xs: "block" }}
            mih={`100vh`}
          >
            <NavbarComponent />
          </Box>
        </Flex >
      </Box>
      <Footer />
    </>

  );
};

export default RootPage;
