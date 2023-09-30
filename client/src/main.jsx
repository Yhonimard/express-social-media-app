import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import persistor from "./redux/persistor.js";
import store from "./redux/store.js";
import theme from "./theme.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <SnackbarProvider
        autoHideDuration={1500}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        maxSnack={2}
        preventDuplicate={true}
      >
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            {import.meta.env.MODE === "dev" && <ReactQueryDevtools />}
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </SnackbarProvider>
    </Provider>
  </QueryClientProvider>
);
