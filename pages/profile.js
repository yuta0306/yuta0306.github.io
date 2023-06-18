import Head from 'next/head'
import path from 'path'

import { author, name, nameEng } from '../global.d'
import { getMd2Html } from '../lib/md2html'


import Main from '../components/main'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const dirName = path.join(process.cwd(), 'pages', 'excludes')
  const fileName = path.join(dirName, 'profile.md')
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
      <h1>{nameEng} ({name})</h1>
      <div dangerouslySetInnerHTML={{ __html: aboutData.contentHtml }} />
    </>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>About {author}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Header index='profile' /> */}

      <Main content={
        <>
          {content}
        </>
      }>

      </Main>

      {/* <Footer /> */}
    </div>
  )
}