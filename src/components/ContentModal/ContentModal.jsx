import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import './ContentModal.css'
import axios from 'axios'
import { img_300, img_500 } from '../../config';
const style = {
  position: 'absolute',
  width: '80%',
  height: '80%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#39445a',
  boxShadow: 24,
  p: 4,
};

function ContentModal({ children, id, type }) {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = useState({})
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchDetails = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setDetails(data)
  }
  useEffect(() => {
    id && fetchDetails()
  }, [])

  const { title, poster_path, original_name, overview } = details
  return (
    <>
      <div className='card' onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            details && <div className='modal-inner'>
              <div className='modal-img'>
                <img src={`${img_300}/${poster_path}`} alt={title} />
              </div>
              <div className='modal-desciption'>
                {console.log(details)}
                <h2>{title || original_name}</h2>
                <div className='item-description'>
                  {overview}
                </div>
                <button className='modal-btn'>WATCH THE TRAILER</button>
              </div>
            </div>
          }
        </Box>
      </Modal>
    </>
  );
}

export default ContentModal