import { Adsense } from '@ctrl/react-adsense'
import fs from 'fs'
import Head from 'next/head'
import path from 'path'
import { useEffect, useState } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Main from '../../components/main'
import Card from '../../components/partial/card'
import Categories from '../../components/partial/categories'
import FollowMe from '../../components/partial/followme'
import Paginater from '../../components/partial/paginager'
import ShortBio from '../../components/partial/shortbio'
import Tags from '../../components/partial/tags'
import { adsensePerPage, author, bio, postPerPage, siteName, socials } from '../../global.d'
import { getAllPosts } from '../../lib/md2html'




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
  const pages = Math.ceil(available.length / (postPerPage - adsensePerPage))
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
    let { content } = data
    return content.Category
  })
  let tags = []
  allPostData.map(data => {
    let { content } = data
    let tag = content.Tags
    if (Array.isArray(tag)) {
      tags.push(...tag)
    } else if (typeof (tag) == 'string') {
      tags.push(tag)
    }
  })
  categories = [...new Set(categories)]
  tags = [...new Set(tags)]

  const pages = Math.ceil(allPostData.length / (postPerPage - adsensePerPage))

  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return isMounted && (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>

      <Header categories={categories} index="index" />

      <Main
        content={
          <>
            {allPostData.slice((postPerPage - adsensePerPage) * (page - 1), (postPerPage - adsensePerPage) * page)
              .map((data, i) => {
                let { slug, content } = data
                if ((i + 1) % Math.floor(postPerPage / adsensePerPage) == Math.floor(postPerPage / adsensePerPage) - 1) {
                  return (
                    <>
                      <Card slug={slug} content={content} />
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
                  return <Card slug={slug} content={content} />
                }
              })}
            {(allPostData.length - postPerPage * (page - 1)) % 2 == 1 &&
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
