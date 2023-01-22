import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import './Trending.css'
import CustomNavigation from '../../components/CustomNavigation/CustomNavigation'


const Trending = () => {
  const [content, setContent] = useState([])
  const [numOfPages,setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const fetchTrendings = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
    setTotalPages(data.total_pages)
    setContent(data.results)
  }

  useEffect(() => {
    fetchTrendings()
  }, [page])

  return (
    <>
      <div className='page-title'>Trending</div>
      <div className="trending">
      {
        content && content.map((item) => {
         
          return <CardComponent
            key={item.id}
            poster={item.poster_path}
            title= {item.title || item.name}
            release_date = {item.release_date || item.first_air_date}
            rating = {item.vote_average}
            type = {item.media_type}
          />
        })
      }
      </div>
      {
        numOfPages > 1 &&
        <CustomNavigation setPage = {setPage} numOfPages={numOfPages}/>
      }
    </>
  )
}

export default Trending