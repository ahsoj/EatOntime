"use client";
import React, { Key } from "react";
import theme from "../utils/theme";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AppType, AppProps } from "next/app";
import { useSessionStorage } from "usehooks-ts";
// import {  } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "../utils/createEmotionCache";
import Document, { DocumentContext } from "next/document";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { useMediaQuery } from "@mui/material";
import { SnackbarProvider } from "notistack";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const emotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function EmotionStyleRegistary({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sessionTheme, setSessionTheme] = useSessionStorage<string>(
    "theme",
    "light"
  );
  const [mode, setMode] = React.useState<"light" | "dark">(
    sessionTheme ? "dark" : "light"
  );
  const systemTheme = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  React.useEffect(() => {
    if (sessionTheme !== systemTheme) {
      setSessionTheme(systemTheme);
    }
  }, [sessionTheme]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        setSessionTheme(mode === "light" ? "light" : "dark");
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <CacheProvider value={emotionCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <SnackbarProvider>{children}</SnackbarProvider>
          </Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}

EmotionStyleRegistary.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>
      ) =>
        function EnhanceApp(props: any) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(
    (style: { key: Key | null | undefined; ids: any[]; css: any }) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    )
  );

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
