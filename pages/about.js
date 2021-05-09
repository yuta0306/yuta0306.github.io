import Head from 'next/head'
import path from 'path'

import {getMd2Html} from '../lib/md2html'
import { author } from '../global.d'

import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/main'
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
        content
      }>
          
      </Main>

      <Footer />
    </div>
  )
}