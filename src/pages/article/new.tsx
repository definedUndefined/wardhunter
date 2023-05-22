import React, { DragEvent, useState } from 'react'
import MarkdownIt from 'markdown-it'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { User } from '@prisma/client'
import Button from '@/components/ui/Button'

interface ArticleProps {
  user: User
}

function article({ user }: ArticleProps) {
  const mdParser = new MarkdownIt()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    console.log(user.email)
    try {
      const response = await fetch('/api/create-md-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name:user.name,
          content: form.get('content'),
          title: form.get('title'),
          email: user.email
        }),
      })

      console.log(await response.json())

      if (!response.ok) {
        const data = await response.json()
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
  })

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-1 lg:py-12">
            <div className="flex flex-col gap-2">
              <h3 className="leading-7 font-bold text-3xl">Petits tips</h3>
              <div className="text-start px-4 py-4 bg-slate-50 rounded-md p-4 border text-slate-800 leading-7">
                <p>
                ✍️ Pensez à un sujet qui vous intéresse et
                  qui est pertinent pour votre public cible.
                </p>
              </div>
              <div className="text-start px-4 py-4 bg-slate-50 rounded-md p-4 border text-slate-800 leading-7">
                <p>
                  Avant d'écrire, prenez le temps de
                  faire des recherches approfondies sur votre sujet. 😉 
                </p>
              </div>
              <div className="text-start px-4 py-4 leading-5 bg-slate-50 rounded-md p-4 border">
                <p>
                  Sur la partie gauche de l'éditeur de texte vous avez un apercu du rendu final !
                </p>
              </div>
              <div className="text-start px-4 py-4 bg-slate-50 rounded-md p-4 border text-slate-800 leading-7">
                <p>
                  Pour les images cliquer le le boutton Image.
                  Mettre une description de l'image entre crochet et l'url de l'image entre les parenthèses.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <div className="text-start">
                  <label className="font-bold leading-8 text-sm lg:text-3xl">Nom de l'auteur</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder={user.name as string}
                    type="text"
                    name="name"
                    value={user.name as string}
                    disabled
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Titre de l'article"
                    type="text"
                    name="title"
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>

                <MdEditor
                  style={{ height: '500px' }}
                  renderHTML={(text) => mdParser.render(text)}
                  name="content"
                />
              </div>

              <div className="mt-4">
                <Button
                  type="submit"
                  variant={"ghost"}
                >
                  Envoyer
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default article

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const user = session.user as User

  console.log(user)

  return {
    props: { user },
  }
}
