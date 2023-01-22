import './CardComponent.css'
import { img_300, unavailable } from '../../config'
import { Badge } from '@mui/material'
const CardComponent = ({ poster, title, release_date, type , rating }) => {
  return (
    
      <div className='card'>
        <Badge badgeContent={rating} color={rating>7?'primary':'warning'}/>
        <img className='poster' src={poster ? `${img_300}/${poster}` :unavailable } alt="" />
        <b className='card-title'>{title}</b>
        <div className='subtitle'>
          <p>{type}</p>
          <p>{release_date}</p>
        </div>
       
      </div>
    
  )
}

export default CardComponent