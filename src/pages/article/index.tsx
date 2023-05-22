import React from 'react'
import fs, { read } from 'fs'
import Link from 'next/link'
import matter from 'gray-matter'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
// import { getStaticProps } from './[slug]'

interface ArticleProps {
  articles: any
}

function Index({ articles }: ArticleProps) {
  return (
    <div className="container mx-auto">
        <h1 className="text-3xl leading-8 font-bold my-10">Découvrez nos articles écrits par les membres passionnés de notre équipe ! 🤖</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
        {articles.map(({ slug, frontMatter }: any) => (
          <div
            key={slug}
            className="border border-slate-300 m-2 rounded-md shadow-lg overflow-hidden"
          >
            <Link href={`/article/${slug}`}>
              <Image
                width={650}
                height={340}
                alt={frontMatter.title}
                src={frontMatter.socialImage ?? '/jinx.jpg'}
              />
            <div className="p-4 ">
            <h3 className="leading-7 font-bold text-2xl">
              {frontMatter.title}
            </h3>
            <p className="mt-1 text-slate-900 text-sm">Ecrit par {frontMatter.author}</p>
            <p className="mt-1 text-slate-900 text-xs">{frontMatter.date}</p>
            </div>
            </Link>
           
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index

export async function getStaticProps() {
  const files = fs.readdirSync('articles')
  const articles = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(`articles/${fileName}`, 'utf-8')
    const { data: frontMatter } = matter(readFile)

    return {
      slug,
      frontMatter,
    }
  })
  return {
    props: {
      articles,
    },
  }
}
