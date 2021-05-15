import Head from 'next/head'
import path from 'path'
import fs from 'fs'

import { getMd2Html } from '../../../lib/md2html'

import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Main from '../../../components/main'
import Card from '../../../components/partial/card'
import ShortBio from '../../../components/partial/shortbio'
import FollowMe from '../../../components/partial/followme'
import Categories from '../../../components/partial/categories'
import Tags from '../../../components/partial/tags'
import Paginager from '../../../components/partial/paginager'

import {bio, author, socials, siteName, postPerPage} from '../../../global.d'

export async function getStaticProps({ params }) {
    const dirName = path.join(process.cwd(), 'pages', 'docs')
    const available = fs.readdirSync(dirName)
    const allPost = await Promise.all(available.map(async (fileName) => {
        const fullPath = path.join(dirName, fileName)
        const postData = await getMd2Html(fullPath)
        const category = postData.Category
        
        return {category, postData}
    }))
    const filteredPost = allPost.map(({category, postData}) => {
      if (category == params.category) {
        return postData
      } else {
        return null
      }
    }).filter(v => v)
    let categories = [], tags = []
    allPost.map((data) => {
      let {postData} = data
      categories.push(postData.Category)
      const tag = postData.Tags
      if (Array.isArray(tag)) {
        tags.push(...tag)
      } else if (typeof(tag) == 'string') {
        tags.push(tag)
      }
    })
    categories = [...new Set(categories)]
    tags = [...new Set(tags)]
  
    const CategoricalPostData =  filteredPost.sort((a, b) => {
      if (a.Date < b.Date) return 1
      else return -1
    })
    const page = Number.parseInt(params.page)
  
    return {
        props: {
            CategoricalPostData,
            category: params.category,
            categories,
            tags,
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
        const category = postData.Category
        
        return {category, postData}
    }))

    let categories = [], tags = []
    allPost.map((data) => {
      let {postData} = data
      categories.push(postData.Category)
      const tag = postData.Tags
      if (Array.isArray(tag)) {
        tags.push(...tag)
      } else if (typeof(tag) == 'string') {
        tags.push(tag)
      }
    })
    categories = [...new Set(categories)]
    tags = [...new Set(tags)]
    const categoricalPages = categories.map(category => {
        const filteredPost = allPost.filter(data => data.postData.Category == category)
        return Math.ceil(filteredPost.length / postPerPage)
    })

    let paths = []
    categoricalPages.map((pages, k) => {
        const tmp = [...Array(pages)].map((_, page) => {
            paths.push({
                params: {
                    category: categories[k],
                    page: `${page + 1}`
                }
            })
        })
    })

    return { paths: paths, fallback: false }
  }

export default function CategoryPage({ CategoricalPostData, category, categories, tags, page }) {
  const pages = Math.ceil(CategoricalPostData.length / postPerPage)

  return (
    <>
      <Head>
        <title>「{category}」{page}ページ目 | {siteName}</title>
      </Head>

      <Header categories={categories} index="index" />

      <Main 
        content={
          <>
          {CategoricalPostData.slice(postPerPage * (page-1), postPerPage * page).map(content => {
            return <Card slug={content.Slug} content={content} />
          })}
          {CategoricalPostData.length - postPerPage*(page - 1) % 2 == 1 &&
            <div></div>
          }
          <Paginager top={`/category/${category}`} pages={pages} page={page} minPage={1} />
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
