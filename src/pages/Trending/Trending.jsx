import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import './Trending.css'
import CustomNavigation from '../../components/CustomNavigation/CustomNavigation'
import { CircularProgress } from '@mui/material'
import CircularLoading from '../../components/CircularLoading'
import ErrorFetching from '../../components/ErrorFetching'


const Trending = () => {
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

  if(loading){
    return(
      <CircularLoading/>
    )
  }

  if(error){
    return(
      <ErrorFetching/>
    )
  }

  return (
    <>
      <div className='page-title'>Trending</div>
      <div className="trending">
        {
          content && content.map((item) => {

            return <CardComponent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              release_date={item.release_date || item.first_air_date}
              rating={item.vote_average}
              type={item.media_type}
            />
          })
        }
      </div>
      {
        numOfPages > 1 &&
        <CustomNavigation setPage={setPage} numOfPages={numOfPages} />
      }
    </>
  )
}

export default Trending