import CardComponent from '../../components/CardComponent/CardComponent';
import CircularLoading from '../../components/CircularLoading';
import CustomNavigation from '../../components/CustomNavigation/CustomNavigation';
import ErrorFetching from '../../components/ErrorFetching';
import Genre from '../../components/Genre/Genre';
import useGenre from '../../hooks/useGenre';
import useMovies from '../../hooks/useMovies';
import './Movie.css'

const Movies = () => {
 
  const [genres,setGenres,selectedGenres,setSelectedGenres,genreIdsForUrl] = useGenre()
  const [movies,  numOfPages,loading,error, setPage] = useMovies(genreIdsForUrl)
  if(error){
    return(
      <ErrorFetching/>
    )
  }

  return (
    <>
      <div className='page-title'>Movies</div>
      <Genre
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        selectedGenres={selectedGenres}
        type={'movie'}
        setPage={setPage}
      />
      <div className="movie-page">
        {
          loading ? <CircularLoading/> : (movies && movies.map((item) => {

            return <CardComponent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              release_date={item.release_date || item.first_air_date}
              rating={item.vote_average}
              type='movie'
            />
          })
          )
        }
      </div>
      {
        numOfPages > 1 &&
        <CustomNavigation setPage={setPage} numOfPages={numOfPages} />
      }
    </>
  )

}

export default Movies