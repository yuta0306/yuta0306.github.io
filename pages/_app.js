import 'highlight.js/scss/base16/dracula.scss'
import Head from 'next/head'
import router from 'next/router'
// Google Analytics
import { useEffect } from 'react'
import { siteName } from '../global.d'
import * as gtag from '../lib/gtag'
import '../styles/globals.scss'



function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!gtag.existsGaId) {
      return
    }

    const handleRouteChange = (path) => {
      gtag.pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        {/* Default Title */}
        <title>{siteName}</title>
        {/* Meta Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
