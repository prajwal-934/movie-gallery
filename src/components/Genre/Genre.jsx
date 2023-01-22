import React, { useEffect } from 'react'
import axios from 'axios'
import { Chip } from '@mui/material'
const Genre = (
    {
        genres,
        setGenres,
        setSelectedGenres,
        selectedGenres,
        type,
        setPage,
    }
) => {

    const handleAddGenre = (genre) => {
        setSelectedGenres([...selectedGenres,genre])
        setGenres(genres.filter((g)=> {
            return g.id !== genre.id
        }))
    }

    const removeSelectedGenre = (genreSelected) =>{
        setSelectedGenres(selectedGenres.filter((selected)=> selected.id !== genreSelected.id))
        setGenres([...genres , genreSelected])
    }


    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}`)
        setGenres(data.genres)

    }

    useEffect(() => {
        fetchGenres()
    },[])



    return (
        <>
            {
                selectedGenres && selectedGenres.map((selectedGenre)=>{
                    return <Chip
                        sx={{
                            bgcolor: '#5a7aad',
                            color :'white',
                            m: '5px'
                        }}
                        key={selectedGenre.id} label={selectedGenre.name} onDelete={()=>{removeSelectedGenre(selectedGenre)}} clickable />
                })
            }


            {
                genres && genres.map((genre) => {
                    return <Chip
                        sx={{
                            bgcolor: 'whitesmoke',
                            m: '5px'
                        }}
                        key={genre.id} label={genre.name} onClick={()=>{handleAddGenre(genre)}} clickable />
                })
            }
        </>
    )
}

export default Genre