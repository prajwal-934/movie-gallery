import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import CardComponent from '../../components/CardComponent/CardComponent';
import CustomNavigation from '../../components/CustomNavigation/CustomNavigation';
import './Serach.css'
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})
const Search = () => {



  const [type, setType] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const [numOfPages,setNumberOfPages] = useState(0)

  const fetchQuery = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
    setContent(data?.results)
    setNumberOfPages(data.total_pages)
  }

  useEffect(() => {
    if(searchText){
      fetchQuery()
    }

    return ()=>{
      console.log('unmounted')
    }
  }, [type,page])

  const renderNoResults = type ? <h3>No Movies</h3> : <h3>No Series</h3>
  console.log(content)
  return (
    <>
      <div className='page-title'>Search</div>
      <ThemeProvider theme={darkTheme}>
        <div className='search-page'>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>

            <TextField style={{ flex: 1 }} id="standard-basic" value={searchText} label="Search..." variant="filled" onChange={(e) => { setSearchText(e.target.value) }} />

            <Button onClick={fetchQuery}>
              <SearchIcon />
            </Button>
          </div>
          <Tabs indicatorColor='primary' value={type} onChange={(event, newValue) => { setType(newValue) }}>
            <Tab style={{ width: '50%' }} label="Movies" />
            <Tab style={{ width: '50%' }} label="TV Shows" />
          </Tabs>
        </div>
      </ThemeProvider>
      <div className="search-page-card">
        {
          content && content.map((item) => {
            return <CardComponent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              release_date={item.release_date || item.first_air_date}
              rating={item.vote_average}
              type={type ? 'tv' : 'movie'}
            />
          })
        }
        
        {
          searchText && content.length===0 && type ? <h3>No Series Found </h3> : <h3>No Movies Found</h3>
         }
        {
          numOfPages > 1 &&
          <CustomNavigation setPage={setPage} numOfPages={numOfPages} />
        }
      </div>
    </>
  )
}

export default Search