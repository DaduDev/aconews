import "./App.css"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



const API_KEY = "81ecc6b3cab7ba28c51ccaba3588ff94"

interface Article {
  title: string
  description: string
  url: string
  image: string
  publishedAt: string
  source: {
    name: string
  }
}

export default function AcoNews() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en`)
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setArticles(data.articles)
        setLoading(false)
      } catch {
        setError('Failed to fetch news. Please try again later.')
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">AcoNews</h1>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {article.image && (
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover mb-4 rounded" />
              )}
              <p>{article.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}