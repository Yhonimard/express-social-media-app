import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import redux from "./redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({});

console.log(import.meta.env);
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient} >
    <Provider store={redux.store} >
      <PersistGate persistor={redux.persistor}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          preventDuplicate={true}
          autoHideDuration={1500}
          maxSnack={2}
        >
          <MantineProvider defaultColorScheme="dark" theme={{ components: {} }}>
            <App />
            {import.meta.env.DEV && <ReactQueryDevtools />}
          </MantineProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
