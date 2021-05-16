import Head from 'next/head'
import path from 'path'
import AdSense from 'react-adsense'

import { getAllPosts } from '../lib/md2html'

import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/main'
import Card from '../components/partial/card'
import ShortBio from '../components/partial/shortbio'
import FollowMe from '../components/partial/followme'
import Categories from '../components/partial/categories'
import Tags from '../components/partial/tags'
import Paginager from '../components/partial/paginager'

import {bio, author, socials, siteName, postPerPage, siteDescription, adsensePerPage} from '../global.d'

export async function getStaticProps() {
  const dirName = path.join(process.cwd(), 'pages', 'docs')
  const rawPostData = await getAllPosts(dirName)
  const allPostData = rawPostData.sort((a, b) => {
    if (a.content.Date < b.content.Date) return 1
    else return -1
  })

  return {
    props: {
      allPostData,
    }
  }
}

export default function Home({ allPostData }) {
  let categories = allPostData.map(data => {
    let {content} = data
    return content.Category
  })
  let tags = []
  allPostData.map(data => {
    let {content} = data
    let tag = content.Tags
    if (Array.isArray(tag)) {
      tags.push(...tag)
    } else if (typeof(tag) == 'string') {
      tags.push(tag)
    }
  })
  categories = [...new Set(categories)]
  tags = [...new Set(tags)]

  const pages = Math.ceil(allPostData.length / (postPerPage - adsensePerPage))

  return (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>

      <Header categories={categories} index="index" />

      <Main 
        content={
          <>
          {allPostData.slice(0, postPerPage - adsensePerPage).map((data, i) => {
            let {slug, content} = data
            console.log(i)
            if ( (i + 1) % Math.floor(postPerPage / adsensePerPage) == Math.floor(postPerPage / adsensePerPage) - 1 ) {
              return (
                <>
                <Card slug={slug} content={content} />
                <AdSense.Google
                  client='ca-pub-4998278830587376'
                  slot='3060159795'
                  style={{ display: 'block', borderBottom: '1px dashed rgba(240, 240, 240, 0.6)' }}
                  format='auto'
                  responsive='true'
                />
                </>
              )
            } else {
              return <Card slug={slug} content={content} />
            }
          })}
          {allPostData.length % 2 == 1 && allPostData.length < postPerPage &&
            <div></div>
          }
          <Paginager top='/post' pages={pages} page={1} />
          </>
        }
        sidebar={
          <>
          {bio &&
            <ShortBio bio={bio} author={author} />
          }
          {socials &&
            <FollowMe  socials={socials} />
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
        grid_layout={true}
      />

      <Footer />
    </>
  )
}
