import { prisma } from '@/server/db'
import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs')
const path = require('path')

export default async function createMdArticle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Add security to allow only POST here
  const { name, content, title, email } = req.body

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })
    console.log('User ' + user)
    if (!user) {
      return res.send({ message: 'User not found' })
    }

    // Chemin du dossier "articles"
    const articlesDir = 'C:/Users/Aymane/Desktop/wardhunter/articles' // Remplacez par votre propre chemin

    // Vérifier si le dossier "articles" existe
    if (!fs.existsSync(articlesDir)) {
      // Créer le dossier "articles" s'il n'existe pas
      fs.mkdirSync(articlesDir)
    }

    // Chemin complet du fichier
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString('fr-FR') // Fonction pour formater la date selon vos besoins
    const fileName = path.join(articlesDir, `${name}-${title}.md`)

    // Contenu du fichier
    const fileContent = `---
title: ${title}
author: ${name}
date: ${formattedDate}
output: html_document
---

${content}`

    // Écrire le contenu dans le fichier
    fs.writeFileSync(fileName, fileContent)
    console.log('Fichier Markdown créé avec succès')

    const create = await prisma.article.create({
      data: {
        userId: user.id,
        title: title,
      },
    })
    //
    console.log(create)

    return res.send({ message: 'Article created successfully' })
  } catch (err) {
    console.error("Erreur lors de l'écriture du fichier", err)
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}
