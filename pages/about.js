import Head from 'next/head'
import path from 'path'

import {getMd2Html} from '../lib/md2html'
import { author, socials } from '../global.d'

import Link from 'next/link'

import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/main'
import FollowMe from '../components/partial/followme'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const dirName = path.join(process.cwd(), 'pages', 'excludes')
  const fileName = path.join(dirName, 'about.md')
  const aboutData = await getMd2Html(fileName)
  return {
    props: {
      aboutData,
    }
  }
}

export default function About({ aboutData }) {
  const content = (
    <>
      <h1>About {author}</h1>
      <div dangerouslySetInnerHTML={{__html: aboutData.contentHtml}} />
    </>
  )
  
  return (
    <div className={styles.container}>
      <Head>
        <title>About {author}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header index='about' />

      <Main content={
        <>
          {content}
          {socials &&
            <FollowMe socials={socials} />}
          <Link href='/'>
            <a style={{fontSize: '.9rem'}}>
              &lt;&lt;&nbsp;ブログに戻る
            </a>
          </Link>
        </>
      }>
          
      </Main>

      <Footer />
    </div>
  )
}