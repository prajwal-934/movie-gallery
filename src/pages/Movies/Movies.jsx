import { Chip } from '@mui/material';
import axios from 'axios'
import {useEffect, useState} from 'react'
import CardComponent from '../../components/CardComponent/CardComponent';
import CustomNavigation from '../../components/CustomNavigation/CustomNavigation';
import Genre from '../../components/Genre/Genre';
import useGenre from '../../hooks/useGenre';
import './Movie.css'

const Movies = () => {

  const [movies , setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages , setNumOfPages] = useState(1)
  const [genres,setGenres] = useState([]);
  const [selectedGenres,setSelectedGenres] = useState([]);
  const genreIdsForUrl = useGenre(selectedGenres)
  const fetchMovies = async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreIdsForUrl}`)
    setMovies(data.results)
    setNumOfPages(data.total_pages)
  }
  useEffect(()=>{
    fetchMovies()
  },[page,genreIdsForUrl])

  return (
    <>
      <div className='page-title'>Movies</div>
      <Genre 
        genres={genres}
        setGenres = {setGenres}
        setSelectedGenres = {setSelectedGenres}
        selectedGenres = {selectedGenres}
        type = {'movie'}
        setPage = {setPage}
      />
      <div className="movie-page">
      {
        movies && movies.map((item) => {
         
          return <CardComponent
            key={item.id}
            id = {item.id}
            poster={item.poster_path}
            title= {item.title || item.name}
            release_date = {item.release_date || item.first_air_date}
            rating = {item.vote_average}
            type='movie'
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

export default Movies