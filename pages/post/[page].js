import Head from 'next/head'
import path from 'path'
import fs from 'fs'

import { getAllPosts } from '../../lib/md2html'

import Header from '../../components/header'
import Footer from '../../components/footer'
import Main from '../../components/main'
import Card from '../../components/partial/card'
import ShortBio from '../../components/partial/shortbio'
import FollowMe from '../../components/partial/followme'
import Categories from '../../components/partial/categories'
import Tags from '../../components/partial/tags'
import Paginater from '../../components/partial/paginager'

import {bio, author, socials, siteName, postPerPage} from '../../global.d'

export async function getStaticProps({ params }) {
  const dirName = path.join(process.cwd(), 'pages', 'docs')
  const rawPostData = await getAllPosts(dirName)
  const allPostData = rawPostData.sort((a, b) => {
    if (a.content.Date < b.content.Date) return 1
    else return -1
  })
  const page = Number.parseInt(params.page)

  return {
    props: {
      allPostData,
      page
    }
  }
}

export async function getStaticPaths() {
    const dirName = path.join(process.cwd(), 'pages', 'docs')
    const available = fs.readdirSync(dirName)
    const pages = Math.ceil(available.length / postPerPage)
    const paths = [...Array(pages)].map((v, k) => {
        return {
            params: {
                page: `${k + 1}`
            }
        }
    })

    return { paths: paths, fallback: false }
  }

export default function Home({ allPostData, page }) {
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

  const pages = Math.ceil(allPostData.length / postPerPage)

  return (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>

      <Header categories={categories} index="index" />

      <Main 
        content={
          <>
          {allPostData.slice(postPerPage * (page-1), postPerPage * page).map(data => {
            let {slug, content} = data
            return <Card slug={slug} content={content} />
          })}
          {allPostData.length - postPerPage*(page - 1) % 2 == 1 &&
            <div></div>
          }
          <Paginater top='/post' pages={pages} page={page} minPage={1} />
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
