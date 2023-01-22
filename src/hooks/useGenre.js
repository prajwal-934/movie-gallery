const useGenre = (selectedGenres) => {
    if(selectedGenres.length<1) return ""
    const genreIds = selectedGenres.map((g)=>{
        return g.id
    })
    return genreIds.reduce((acc,current)=>{
        return acc + ',' + current
    })
}

export default useGenre