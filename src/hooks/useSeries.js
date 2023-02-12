import axios from 'axios';
import React, { useState, useEffect } from 'react'

const useSeries = (genreIdsForUrl) => {
    const [series, setSeries] = useState([]);
    const [loading ,setLoading] = useState(false);
    const [error , setError] = useState() 
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1)
    const fetchSeries = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreIdsForUrl}`)
            setLoading(false)
            setSeries(data.results)
            setNumOfPages(data.total_pages)
        }catch(e){
            setError(e)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchSeries()
    }, [page, genreIdsForUrl])

    return [series, loading, error,setPage , numOfPages]
}

export default useSeries