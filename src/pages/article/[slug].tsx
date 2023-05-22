import React from 'react'
import fs from 'fs'
import path from 'path'
const matter = require('gray-matter')
import md from 'markdown-it'
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'articles'))
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const fileName = fs.readFileSync(`C:/Users/Aymane/Desktop/wardhunter/articles/${params.slug}.md`, 'utf-8')
  console.log(fileName)
  const { data: frontMatter, content} = matter(fileName)
  return {
    props: {
        frontMatter,
        content
    }
  }
}

function Article({ frontMatter, content }: any) {
  return (
    <div className="prose mx-auto">
        <h1>{frontMatter.title}</h1>
        <div className="max-w-prose mx-auto" dangerouslySetInnerHTML={{__html: md().render(content)}} />

    </div>
        
  )
}

export default Article
