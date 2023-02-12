import axios from 'axios'
import { useEffect, useState } from 'react'
import CardComponent from '../../components/CardComponent/CardComponent';
import CircularLoading from '../../components/CircularLoading';
import CustomNavigation from '../../components/CustomNavigation/CustomNavigation';
import Genre from '../../components/Genre/Genre';
import useGenre from '../../hooks/useGenre';
import useSeries from '../../hooks/useSeries';
import './Series.css'

const Series = () => {


  const [genres,setGenres,selectedGenres,setSelectedGenres,genreIdsForUrl] = useGenre()
  const [series, loading, error,setPage , numOfPages] = useSeries(genreIdsForUrl)
  return (
    <>
      <div className='page-title'>Sereis</div>
      <Genre
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        selectedGenres={selectedGenres}
        type={'tv'}
        setPage={setPage}
      />
      <div className="series-page">
        {
          loading ? <CircularLoading/> :  series && series.map((item) => {
            return <CardComponent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              release_date={item.release_date || item.first_air_date}
              rating={item.vote_average}
              type='tv'
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

export default Series