// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import { LabelItemProvider, ProjectProvider } from 'context/ItemContext';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';

import createEmotionCache from 'cache/createEmotionCache';
import theme from 'cache/theme';
import { GlobalStyles } from '@mui/material';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ProjectProvider>
        <LabelItemProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles
              styles={{
                body: { margin: 0 }
              }}
            />
            <Component {...pageProps} />
          </ThemeProvider>
        </LabelItemProvider>
      </ProjectProvider>
    </CacheProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;