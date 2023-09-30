import PostFloatingButtonComponent from "@/components/postFloatingButton";
import PostModalComponent from "@/components/postModal";
import RootSidebarComponent from "@/components/rootSidebar";
import {
  Box,
  Container,
  Grid,
  Paper,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

const Root = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 10 }} maxWidth={mdUp ? "xl" : "md"}>
        <Grid container spacing={3}>
          <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ position: "sticky", top: 70 }}>
              <RootSidebarComponent />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Outlet />
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <Paper>friend</Paper>
          </Grid>
        </Grid>
      </Container>
      <PostFloatingButtonComponent />
      <PostModalComponent />
    </>
  );
};

export default Root;
