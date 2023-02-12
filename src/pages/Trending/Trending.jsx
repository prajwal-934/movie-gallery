import React from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import './Trending.css'
import CustomNavigation from '../../components/CustomNavigation/CustomNavigation'
import useTrending from '../../hooks/useTrending'
import CircularLoading from '../../components/CircularLoading'
import ErrorFetching from '../../components/ErrorFetching'


const Trending = () => {

  const [content,loading,error,numOfPages,setPage,page] = useTrending()
  



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
          loading ? <CircularLoading/> : 
            (content && content.map((item) => {
  
              return <CardComponent
                key={item.id}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                release_date={item.release_date || item.first_air_date}
                rating={item.vote_average}
                type={item.media_type}
              />
            }))
          
        }
      </div>
      {
        numOfPages > 1 &&
        <CustomNavigation page={page} setPage={setPage} numOfPages={numOfPages} />
      }
    </>
  )
}

export default Trending