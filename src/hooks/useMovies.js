import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useMovies = (genreIdsForUrl) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1)
    const fetchMovies = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreIdsForUrl}`)
            setLoading(false)
            setMovies(data.results)
            setNumOfPages(data.total_pages)
        } catch (e) {
            setLoading(false)
            setError(e)
            
        }    
    }
    useEffect(() => {
        fetchMovies()
    }, [page,genreIdsForUrl])

    return [movies, numOfPages,loading,error, setPage]
}

export default useMovies