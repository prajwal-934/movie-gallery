import { createTheme, Pagination, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import './CustomNavigation'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})
const CustomNavigation = ({ setPage, numOfPages = 10 ,page}) => {



  const handlePageChange = (page) => {
   
    window.scroll(0,0)
    setPage(page)
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <Pagination
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '15px',
          letterSpacing : '40px'
        }}
        count={numOfPages}
        color='primary'
        hideNextButton
        hidePrevButton
        onChange={(e) => { handlePageChange(e.target.innerText) }} />
    </ThemeProvider>
  )
}

export default CustomNavigation