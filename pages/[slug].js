import Head from 'next/head'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

import {getMd2Html} from '../lib/md2html'

import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/main'
import ShortBio from '../components/partial/shortbio'
import FollowMe from '../components/partial/followme'
import SocialShare from '../components/partial/socialshare'
import styles from '../styles/Home.module.css'

import {bio, author, socials, shareSNS, siteUrl} from '../global.d'

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
  let baseUrl
  if (!(siteUrl[-1] == '/')) baseUrl = siteUrl + '/'
  else baseUrl = siteUrl
  const content = (
    <div itemScope={true} itemType='http://schema.org/BlogPosting'>
      <div style={{
        background: `url(${postData.Thumbnail})`,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '40vh',
          maxHeight: '280px',
          backdropFilter: 'blur(3rem)'
        }} itemScope={true} itemProp='image' itemType='https://schema.org/ImageObject'>
          {postData.Thumbnail &&
            <Image src={postData.Thumbnail} alt={postData.Title}
              layout='fill' quality={50} loading='lazy' objectFit='contain'
              objectPosition='50% 50%' />
          }
        </div>
      </div>
      
      <time dateTime={postData.Date} style={{color: 'rgb(144, 144, 144)'}}>{postData.Date}</time>
      <h1>{postData.Title}</h1>

      <div id='TOC__mobile'>

      </div>
      
      <article dangerouslySetInnerHTML={{__html: postData.contentHtml}}
        style={{marginTop: '4rem'}} itemScope={true} itemProp='text' />
      <SocialShare socials={shareSNS} url={baseUrl + postData.Slug} />
    </div>
  )
  
  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.Title}</title>
        <link rel="icon" href="/favicon.ico" />
        <script src='/js/toc.js'></script>
      </Head>

      <Header index='blog' />

      <Main
        content={
          content
        }
        sidebar={
          <>
          {bio &&
            <ShortBio bio={bio} author={author} />
          }
          {socials &&
            <FollowMe socials={socials} />
          }
          </>
        }
      >
          
      </Main>

      <Footer />
    </div>
  )
}