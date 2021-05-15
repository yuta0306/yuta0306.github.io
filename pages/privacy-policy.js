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
  const fileName = path.join(dirName, 'privacy-policy.md')
  const postData = await getMd2Html(fileName)
  return {
    props: {
      postData,
    }
  }
}

export default function About({ postData }) {
  const content = (
    <>
      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
    </>
  )
  
  return (
    <div className={styles.container}>
      <Head>
        <title>プライバシーポリシー</title>
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