import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import Search from '@mui/icons-material/Search';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  

  useEffect(() => {
    if(value===0) navigate('/')
    else if (value===1) navigate('/movies')
    else if (value===2) navigate('/series')
    else  navigate('/search')
  }, [value]);
  
  return (
    <BottomNavigation sx={
      {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        bgcolor: '#6b6961',
        color: 'white',
        zIndex: 100
      }
    } value={value} onChange={handleChange}>
      <BottomNavigationAction 
        style={{ color: 'white' }}
        label="Treding"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Movies" 
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="TV Shows"       
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Search"
        icon={<Search />} />
    </BottomNavigation>
  );
}