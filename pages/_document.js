import Document, { Head, Html, Main, NextScript } from 'next/document'
import { author, siteDescription } from '../global.d'
import { GA_ID, existsGaId } from '../lib/gtag'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='ja' prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
        <Head>
          {/* meta view */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="HandheldFriendly" content="True" />

          {/* Default description */}
          {siteDescription &&
            <meta name="description" content={siteDescription} />
          }
          {/* Default Author */}
          {author &&
            <meta name="author" content={author} />
          }

          {/* OGP */}
          {/* <meta property="og:title" content={siteName} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:image" content={`${siteUrl}/images/default.png`} />
          <meta property="og:site_name" content={siteName} />
          {siteDescription &&
            <meta property="og:description" content={siteDescription} />
          } */}
          {/* OGP > Twitter */}
          <meta name="twitter:card" content="summary" />

          {/* Robot crawling: Default > index & follow */}
          <meta name="robots" content="index, follow" />

          {/* This SSG Generator */}
          <meta name="generator" content="Next.js" />

          {/* Favicon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
          <link rel="manifest" href="/favicon_io/site.webmanifest" />

          {/* Google Analytics */}
          {existsGaId && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          )}
          {/* Google Adsense */}
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
        <body onTouchStart=''>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument