import * as React from 'react';
import '@/styles/globals.css';
import { CacheProvider } from '@emotion/react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';

import axiosClient from '@/axiosConfig/axiosClient';
import { SWRConfig } from 'swr';

import { Toaster } from 'react-hot-toast';

import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import { useRouter } from 'next/router';

import { Provider } from 'react-redux'
import { store } from '@/store/store';
import createEmotionCache from '@/theme/createEmotionCache';

import { FBPixelScript, FBPixelProvider } from '@rivercode/facebook-conversion-api-nextjs/components';
import EmptyLayout from '@/layouts/empty';
import Script from 'next/script';

export default function MyApp(props) {

  const cache = createEmotionCache();

  const { Component, pageProps } = props;

  const Layout = Component.Layout ?? EmptyLayout

  const router = useRouter()

  React.useEffect(()=>{
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('232572856616426') // facebookPixelId
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  },[router.events])

  const storeRef = React.useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store()
  }

  usePageViews()

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <SWRConfig value={{fetcher: url => axiosClient.get(url), shouldRetryOnError: true}}>
          <CssBaseline />
            <Provider store={storeRef.current}>
              <Layout>
                  <FBPixelScript />
                  <GoogleAnalytics trackPageViews/>
                  <FBPixelProvider>
                    <Component {...pageProps} />
                  </FBPixelProvider>
                  <Script src="https://www.youtube.com/iframe_api" strategy="afterInteractive" />
              </Layout>
            </Provider>
          <Toaster position="top-right" />
        </SWRConfig>
      </ThemeProvider>
      </CacheProvider>
    </AppCacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
