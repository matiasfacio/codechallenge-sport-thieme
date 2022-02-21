import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Layout from "../components/Layout";
import { ListOrderContextProvider } from "../context/listOrderContext";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api",
    cache: new InMemoryCache(),
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: {
              main: "#0054a6",
              light: "rgb(220, 236, 252)",
              dark: "#292929",
            },
            secondary: { main: "#ff0000" },
          },
        })}
      >
        <ApolloProvider client={client}>
          <Head>
            <link
              rel="icon"
              href="https://pimage.sport-thieme.de/icon32/springer"
              type="image/png"
            />
          </Head>
          <ListOrderContextProvider>
            <Layout />
            <Component {...pageProps} />
          </ListOrderContextProvider>
        </ApolloProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
