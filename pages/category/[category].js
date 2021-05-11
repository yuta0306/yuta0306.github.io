import Head from 'next/head'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

import {getMd2Html} from '../../lib/md2html'

import Header from '../../components/header'
import Footer from '../../components/footer'
import Main from '../../components/main'
import ShortBio from '../../components/partial/shortbio'
import FollowMe from '../../components/partial/followme'
import Card from '../../components/partial/card'
import styles from '../../styles/Home.module.css'

import {bio, author, socials} from '../../global.d'
import { data } from 'remark'

export async function getStaticProps({ params }) {
  const dirName = path.join(process.cwd(), 'pages', 'docs')
  const available = fs.readdirSync(dirName)
  const allPost = await Promise.all(available.map(async (fileName) => {
      const fullPath = path.join(dirName, fileName)
      const postData = await getMd2Html(fullPath)
      const category = postData.Category
      
      return {category, postData}
  }))
  const CategoricalPostData = allPost.map(({category, postData}) => {
    if (category == params.category) {
      return postData
    }
  })
  let categories = allPost.map((data) => {
    let {postData} = data
    return postData.Category
  })
  categories = [...new Set(categories)]

  return {
      props: {
          CategoricalPostData,
          categories
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
      
      return {category, fullPath}
  }))
  const categories = allPost.map(({category}) => {
    return category
  })
  const paths = [...new Set(categories)].map(category => {
    return {
      params: {
        category: category
      }
    }
  })
  return { paths: paths, fallback: false }
}

export default function Category({ CategoricalPostData, categories }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header categories={categories} index="index" />

      <Main 
        content={
          <>
          {CategoricalPostData.map(data => {
            return <Card slug={`../${data.Slug}`} content={data} />
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
          </>
        }
        grid_layout={true}
      />
          

      <Footer />
    </>
  )
}