import { CircularProgress } from '@mui/material'
import React from 'react'

const CircularLoading = () => {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'90vh'

    }}>
        <CircularProgress color='warning' />
    </div>
  )
}

export default CircularLoading