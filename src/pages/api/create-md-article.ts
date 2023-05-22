import { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs')
const path = require('path')

export default async function createMdArticle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Add security to allow only POST here
  const { name, content } = req.body
  console.log(name, content)

  const currentDate = new Date().toISOString().slice(0, 10)

  // Chemin du dossier "articles"
  const articlesDir = 'C:/Users/Aymane/Desktop/wardhunter/articles' // Remplacez par votre propre chemin

  // Vérifier si le dossier "articles" existe
  if (!fs.existsSync(articlesDir)) {
    // Créer le dossier "articles" s'il n'existe pas
    fs.mkdirSync(articlesDir)
  }

  // Chemin complet du fichier
  const fileName = path.join(articlesDir, `${name}-${currentDate}.md`)

  try {
    const title = "Titre de l'article"
    const author = req.body.name
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString("fr-FR") // Fonction pour formater la date selon vos besoins

    // Contenu du fichier
    const fileContent = `---
title: ${title}
author: ${author}
date: ${formattedDate}
output: html_document
---

${content}`
    // Écrire le contenu dans le fichier
    fs.writeFileSync(fileName, fileContent)
    console.log('Fichier Markdown créé avec succès')
  } catch (err) {
    console.error("Erreur lors de l'écriture du fichier", err)
    // Gérez l'erreur de manière appropriée
  }

  return res.send({ message: 'User created successfully' })
}
