import Head from 'next/head'
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

import {bio, author, socials, shareSNS, siteUrl, siteName} from '../global.d'
import Categories from '../components/partial/categories'
import Tags from '../components/partial/tags'

export async function getStaticProps({ params }) {
  const dirName = path.join(process.cwd(), 'pages', 'docs')
  const fullPath = path.join(dirName, `${params.slug}.md`)
  const postData = await getMd2Html(fullPath)

  // Categories and Tags
  const files = fs.readdirSync(dirName)
  const fullPaths = files.map(file => {
    return path.join(dirName, file)
  })
  let categories = [], tags = []
  await Promise.all(fullPaths.map(async (file) => {
    const anyPostData = await getMd2Html(file)
    const category = anyPostData.Category
    const tag = anyPostData.Tags
    categories.push(category)
    if (Array.isArray(tag)) {
      tags.push(...tag)
    } else if (typeof(tag) == 'string') {
      tags.push(tag)
    }
  }))
  categories = [...new Set(categories)]
  tags = [...new Set(tags)]

  return {
      props: {
          postData,
          categories,
          tags
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

export default function Blog({ postData, categories, tags }) {
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
            <img src={postData.Thumbnail} alt={postData.Title} loading='lazy' 
              style={{height: '100%', width: 'auto', margin: '0 auto', display: 'block'}} />
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
        <title>{postData.Title} | {siteName}</title>
        {postData.Description &&
          <meta name="description" content={postData.Description} />
        }
        {postData.Author &&
          <meta name="author" content={postData.Author} />
        }

        <meta property="og:title" content={postData.Title} />
        <meta property="og:url" content={`${siteUrl}/${postData.Slug}`} />
        <script src='/js/toc.js'></script>

        {/* If Draft */}
        {!postData.Published &&
          <meta name="robots" content="noindex, nofollow" />
        }
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
          {categories &&
            <Categories categories={categories} />
          }
          {tags &&
            <Tags tags={tags} />
          }
          </>
        }
      >
          
      </Main>

      <Footer />
    </div>
  )
}