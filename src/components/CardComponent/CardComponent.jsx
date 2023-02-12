import './CardComponent.css'
import { img_300, unavailable } from '../../config'
import { Badge } from '@mui/material'

import Rating from 'react-rating'

const CardComponent = ({ poster, title, release_date, type, rating, id }) => {

  return (

    <div className='card' >
      <Badge badgeContent={rating} color={rating > 7 ? 'primary' : 'warning'} />
      <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt="" />
      <b className='card-title'>{title}</b>
      <div className='subtitle'>
        <p>{type}</p>
        <p>{release_date}</p>
      </div>
      <div className='rating'>
        <p>Rating :</p>
        <Rating readonly initialRating={rating / 2} />
      </div>
    </div>

  )
}

export default CardComponent