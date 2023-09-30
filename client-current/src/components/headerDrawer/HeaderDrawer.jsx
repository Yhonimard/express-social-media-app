import { Box, Drawer } from "@mantine/core";

const HeaderDrawerComponent = ({ opened, close }) => {
  return (
    <Drawer opened={opened} onClose={close}>
      <Box></Box>
    </Drawer>
  );
};

export default HeaderDrawerComponent;
