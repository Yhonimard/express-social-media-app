import { MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import redux from "./redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import "./index.css"

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={redux.store}>
      <PersistGate persistor={redux.persistor}>
        <SnackbarProvider anchorOrigin={{ horizontal: "right", vertical: "top" }} preventDuplicate={true} autoHideDuration={1500} maxSnack={2}>
          <MantineProvider defaultColorScheme="dark">
            <App />
          </MantineProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
