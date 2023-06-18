import { Adsense } from '@ctrl/react-adsense'
import fs from 'fs'
import Head from 'next/head'
import path from 'path'

import { getMd2Html } from '../../../lib/md2html'

import Footer from '../../../components/footer'
import Header from '../../../components/header'
import Main from '../../../components/main'
import Card from '../../../components/partial/card'
import Categories from '../../../components/partial/categories'
import FollowMe from '../../../components/partial/followme'
import Paginager from '../../../components/partial/paginager'
import ShortBio from '../../../components/partial/shortbio'
import Tags from '../../../components/partial/tags'

import { adsensePerPage, author, bio, postPerPage, siteName, socials } from '../../../global.d'

export async function getStaticProps({ params }) {
  const dirName = path.join(process.cwd(), 'pages', 'docs')
  const available = fs.readdirSync(dirName)
  const allPost = await Promise.all(available.map(async (fileName) => {
    const fullPath = path.join(dirName, fileName)
    const postData = await getMd2Html(fullPath)
    const tags = postData.Tags

    return { tags, postData }
  }))
  const filteredPost = allPost.map(({ tags, postData }) => {
    if (tags == params.tag || tags.includes(params.tag)) {
      return postData
    } else {
      return null
    }
  }).filter(v => v)
  const pages = Math.ceil(filteredPost.length / (postPerPage - adsensePerPage))

  let categories = [], tags = []
  allPost.map((data) => {
    let { postData } = data
    categories.push(postData.Category)
    const tag = postData.Tags
    if (Array.isArray(tag)) {
      tags.push(...tag)
    } else if (typeof (tag) == 'string') {
      tags.push(tag)
    }
  })
  categories = [...new Set(categories)]
  tags = [...new Set(tags)]

  const TaggedPostData = filteredPost.sort((a, b) => {
    if (a.Date < b.Date) return 1
    else return -1
  })
  const page = Number.parseInt(params.page)

  return {
    props: {
      TaggedPostData,
      tag: params.tag,
      categories,
      tags,
      pages,
      page
    }
  }
}

export async function getStaticPaths() {
  const dirName = path.join(process.cwd(), 'pages', 'docs')
  const available = fs.readdirSync(dirName)
  const allPost = await Promise.all(available.map(async (fileName) => {
    const fullPath = path.join(dirName, fileName)
    const postData = await getMd2Html(fullPath)
    const tags = postData.Tags

    return { tags, postData }
  }))

  let categories = [], tags = []
  allPost.map((data) => {
    let { postData } = data
    categories.push(postData.Category)
    const tag = postData.Tags
    if (Array.isArray(tag)) {
      tags.push(...tag)
    } else if (typeof (tag) == 'string') {
      tags.push(tag)
    }
  })
  categories = [...new Set(categories)]
  tags = [...new Set(tags)]
  const taggedPages = tags.map(tag => {
    const filteredPost = allPost.filter(data => data.postData.Tags == tag || data.postData.Tags.includes(tag))
    return Math.ceil(filteredPost.length / (postPerPage - adsensePerPage))
  })

  let paths = []
  taggedPages.map((pages, k) => {
    const tmp = [...Array(pages)].map((_, page) => {
      paths.push({
        params: {
          tag: tags[k],
          page: `${page + 1}`
        }
      })
    })
  })

  return { paths: paths, fallback: false }
}

export default function TagPage({ TaggedPostData, tag, categories, tags, pages, page }) {
  return (
    <>
      <Head>
        <title>「{tag}」{page}ページ目 | {siteName}</title>
      </Head>

      <Header categories={categories} index="index" />

      <Main
        content={
          <>
            {TaggedPostData.slice((postPerPage - adsensePerPage) * (page - 1), (postPerPage - adsensePerPage) * page)
              .map((content, i) => {
                if ((i + 1) % Math.floor(postPerPage / adsensePerPage) == Math.floor(postPerPage / adsensePerPage) - 1) {
                  return (
                    <>
                      <Card slug={content.Slug} content={content} />
                      <Adsense
                        client='ca-pub-4998278830587376'
                        slot='3060159795'
                        style={{ display: 'block', borderBottom: '1px dashed rgba(240, 240, 240, 0.6)' }}
                        format='auto'
                        responsive='true'
                      />
                    </>
                  )
                } else {
                  return <Card slug={content.Slug} content={content} />
                }
              })}
            {(TaggedPostData.length - postPerPage * (page - 1)) % 2 == 1 &&
              <div></div>
            }
            <Paginager top={`/tag/${tag}`} pages={pages} page={page} minPage={1} />
          </>
        }
        sidebar={
          <>
            {bio &&
              <ShortBio bio={bio} author={author} />
            }
            {socials &&
              <FollowMe socials={socials} />
            }
            <Adsense
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
            <Adsense
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
