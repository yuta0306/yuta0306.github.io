import '../styles/globals.scss'
import 'highlight.js/styles/vs2015.css'

// Google Analytics
import React from 'react'
import { useEffect } from 'react'
import router from 'next/router'
import * as gtag from '../lib/gtag'

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

  return <Component {...pageProps} />
}

export default MyApp
