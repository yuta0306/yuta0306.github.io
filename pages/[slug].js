import Head from 'next/head'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

import {getMd2Html} from '../lib/md2html'

import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/main'
import styles from '../styles/Home.module.css'

export async function getStaticProps({ params }) {
  const dirName = path.join(process.cwd(), 'pages', 'docs')
  const fullPath = path.join(dirName, `${params.slug}.md`)
  const postData = await getMd2Html(fullPath)

  return {
      props: {
          postData
      }
  }
}

export async function getStaticPaths() {
    const dirName = path.join(process.cwd(), 'pages', 'docs')
    const available = fs.readdirSync(dirName)
    const paths = available.map(fileName => {
        const slug = fileName.replace(/\.md$/, '')

        return {
            params: {
                slug: slug
            }
        }
    })
  
    return { paths: paths, fallback: false }
  }

export default function Blog({ postData }) {
  const content = (
    <>
      <div style={{
        background: 'rgb(40, 40, 40)',
      }}>
        <div style={{
          margin: 'auto',
          maxWidth: '500px',
          maxHeight: '250px'
        }}>
          {postData.Thumbnail &&
            <Image src={postData.Thumbnail} alt={postData.Title}
              layout='fill' quality={50} loading='lazy' objectFit='contain' />
          }
        </div>
      </div>
      
      <h1>{postData.Title}</h1>
      <time dateTime={postData.Date}>{postData.Date}</time>

      <article dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
    </>
  )
  
  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.Title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Main content={
        content
      }
        sidebar={
            <>
            <p>ここにもサイドバー</p>
            </>
        }
      >
          
      </Main>

      <Footer />
    </div>
  )
}