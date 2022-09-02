import { useState } from "react"
import axios from 'axios'

interface TData {
    title: string
}

const defaultUrl = 'https://techcrunch.com/2022/09/01/apple-settles-lawsuit-with-developer-over-app-store-rejections-and-scams/'

export const useFetchArticleData = (url: string | null | undefined = defaultUrl) => {
    const [data, setData] = useState<TData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const fetchArticle = (url: string) => {
        return axios.get(url).then((response) => {
            setIsLoading(false)
            console.log(response.data)
        })
    }
    
    useEffect(() => {
        if (url) {
            setIsLoading(true)
            fetchArticle(url)
        }
    }, [url])
}

