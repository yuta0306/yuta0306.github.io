import Head from 'next/head'
import path from 'path'

import { getAllPosts } from '../lib/md2html'

import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/main'
import Card from '../components/partial/card'
import ShortBio from '../components/partial/shortbio'
import FollowMe from '../components/partial/followme'
import Categories from '../components/partial/categories'
import Tags from '../components/partial/tags'

import {bio, author, socials, siteName} from '../global.d'

export async function getStaticProps() {
  const dirName = path.join(process.cwd(), 'pages', 'docs')
  const allPostData = await getAllPosts(dirName)

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

  return (
    <>
      <Head>
        <title>{siteName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header categories={categories} index="index" />

      <Main 
        content={
          <>
          {allPostData.map(data => {
            let {slug, content} = data
            return <Card slug={slug} content={content} />
          })}
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
          {categories &&
            <Categories categories={categories} />
          }
          {tags &&
            <Tags tags={tags} />
          }
          </>
        }
        grid_layout={true}
      />

      <Footer />
    </>
  )
}
