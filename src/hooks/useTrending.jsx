import React, { useState ,useEffect } from 'react'
import axios from 'axios'

const useTrending = () => {
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [numOfPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)

    const fetchTrendings = async () => {
        setLoading(true)
        try {
          const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
          setLoading(false)
          setTotalPages(data.total_pages)
          setContent(data.results)
        } catch (e) {
          setError(e)
          setLoading(false)
        }
      }
    
      useEffect(() => {
        fetchTrendings()
      }, [page])
  return [content,loading,error,numOfPages,page]
}

export default useTrending