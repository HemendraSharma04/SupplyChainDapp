import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TimelineDot from '@mui/lab/TimelineDot';
import CircularProgress from '@mui/material/CircularProgress';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function StatusModal({statusData}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(statusData);

    function convertTimestamp(t) {
        var intTimestamp = parseInt(t, 16);
        // console.log(intTimestamp)
        var s = new Date(intTimestamp*1000);
        return String(s).substring(0, 24);
    }
  return (
    <div>
    <TimelineDot color="secondary" onClick={handleOpen}/>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {statusData!=null? (
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {statusData[0]}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Temperature recorded: {statusData[2]}°C <br/>
            Timestamp: {convertTimestamp(statusData.timestamp._hex)} <br/>
            Humidity: {statusData.humidity}%<br/>
            Heat Index: {statusData.heatindex}°C<br/>
            Product Id: {parseInt(statusData.p_id._hex)}<br/>
            Total Quantity: {parseInt(statusData.total_quantity._hex)} Units<br/>
            
            </Typography>
            </Box>
        ) : (
            <Box sx={{ color: 'grey.500' }}>
                <CircularProgress color="inherit"/>
            </Box>
        )}
      </Modal>

    </div>
  );
}
