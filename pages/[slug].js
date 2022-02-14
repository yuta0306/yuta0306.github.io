import fs from 'fs'
import Head from 'next/head'
import path from 'path'
import AdSense from 'react-adsense'
import Footer from '../components/footer'
import Header from '../components/header'
import Main from '../components/main'
import Categories from '../components/partial/categories'
import FollowMe from '../components/partial/followme'
import ShortBio from '../components/partial/shortbio'
import SocialShare from '../components/partial/socialshare'
import Tags from '../components/partial/tags'
import { author, bio, shareSNS, siteName, siteUrl, socials } from '../global.d'
import { getMd2Html } from '../lib/md2html'
import styles from '../styles/Home.module.css'




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
    } else if (typeof (tag) == 'string') {
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
  const thumbnail = postData.Thumbnail ? postData.Thumbnail : '/images/default.png'
  const content = (
    <div itemScope={true} itemType='http://schema.org/BlogPosting'>
      <div style={{
        background: `url(${thumbnail})`,
        overflow: 'hidden'
      }}>
        <div className={styles.thumbnail} itemScope={true} itemProp='image' itemType='https://schema.org/ImageObject'>
          <img src={thumbnail} alt={postData.Title} loading='lazy'
            style={{ height: '100%', width: 'auto', margin: '0 auto', display: 'block' }} />
        </div>
      </div>

      <time dateTime={postData.Date} style={{ color: 'rgb(144, 144, 144)' }}>{postData.Date}</time>
      <h1>{postData.Title}</h1>

      <div id='TOC__mobile'>

      </div>

      <article dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        style={{ marginTop: '4rem' }} itemScope={true} itemProp='text' />
      <SocialShare socials={shareSNS} url={baseUrl + postData.Slug} />
    </div>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.Title} | {siteName}</title>
        {postData.Description &&
          <>
            <meta name="description" content={postData.Description} />
            <meta name="og:description" content={postData.Description} />
          </>
        }
        {postData.Author &&
          <meta name="author" content={postData.Author} />
        }

        <meta property="og:title" content={postData.Title} />
        {postData.Thumbnail &&
          <meta property="og:image" content={`${siteUrl}${postData.Thumbnail}`} />
        }
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
            <AdSense.Google
              client='ca-pub-4998278830587376'
              slot='8978700883'
              style={{ display: 'block' }}
              format='auto'
              responsive='true'
            />
            {categories &&
              <Categories categories={categories} />
            }
            {tags &&
              <Tags tags={tags} />
            }
            <AdSense.Google
              client='ca-pub-4998278830587376'
              slot='8978700883'
              style={{ display: 'block' }}
              format='auto'
              responsive='true'
            />
          </>
        }
      >

      </Main>

      <Footer />
    </div>
  )
}