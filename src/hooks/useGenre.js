import React, { useState } from 'react'

const useGenre = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    let selectedString = ""
    if (selectedGenres.length < 1) {
        selectedString = ""
    } else {
        const genreIds = selectedGenres.map((g) => {
            return g.id
        })
        selectedString = genreIds.reduce((acc, current) => {
            return acc + ',' + current
        })
    }

    return [genres, setGenres, selectedGenres, setSelectedGenres, selectedString]
}

export default useGenre