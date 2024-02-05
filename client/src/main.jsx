import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'moment/locale/en-gb'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import redux from './redux/index.js'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./index.css"


const theme = createTheme({
  palette: {
    mode: "dark"
  },
  components: {
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 740,
      lg: 1080,
      xl: 1536,
    }
  }
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ["data", 'error'],
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
      staleTime: Infinity
    },

  },
  queryCache: new QueryCache({
    onError: (err, queryKey) => {
    },

  })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={redux.store}>
      <PersistGate persistor={redux.persistor}>
        <ThemeProvider theme={theme} >
          <SnackbarProvider
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            preventDuplicate={true}
            autoHideDuration={1500}
            maxSnack={2}
          >
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en-gb'}>
              <CssBaseline />
              <App />
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>

  </QueryClientProvider>
)
