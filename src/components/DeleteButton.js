import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import RemoveIcon from '@material-ui/icons/Remove';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
    button:{
       float:'right' 
    },
    button2:{
        margin:theme.spacing.unit,
    },
    margin: {
      margin: theme.spacing(1),
    },
    required:{
      margin: theme.spacing(1),
      display:'inline-block',
      
  },
  blue:{
    margin: theme.spacing(1),
    color:"#FFFFFF",
    backgroundColor:"#14AFF1",
},
colour:{
  borderColor:"#14AFF1"
},
root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

    
}));


export default function DeleteButton({select}) {
    
  const [btDisable, setBtDisable] = React.useState( true );
  const [btColor, setBtColor] = React.useState( "#97A1A9" );
  
  const [open, setOpen] = React.useState(false);

  React.useEffect( () => {
    let arrayids = [];
    select.forEach(d => {
       if (d.select) {
         arrayids.push(d.invoice_id);
       }
    } );
   if ( arrayids != '' ) {
     setBtColor( "#FFFFFF" )
     setBtDisable( false )
   }
   else {
     setBtColor("#97A1A9")
     setBtDisable( true )
   }
 },[select]);



    const classes=useStyle();
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const deleteByIds = () => {
      let arrayids = [];
      
     select.forEach(d => {
        if (d.select) {
          arrayids.push(d.invoice_id);
        }
      });
      axios
        .get(`http://localhost:8080/1805455/DataDelete?invoice=${arrayids}`)
        .then(data => {
          console.log('error');
          console.log(data);
        })
        .catch(err => alert(err));
    };

    return (
        <div>
         <Button variant="outlined" color="primary" disabled={btDisable} className={classes.button2} startIcon={<RemoveIcon />}onClick={handleClickOpen}>
          <font color={btColor}>Delete</font>
        </Button>
        <Dialog 
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open} 
        >
          <DialogTitle  style={{background: '#2A3F4D'}} id="customized-dialog-title" onClose={handleClose} >

          <font color='white'>Delete record(s)?</font>
          </DialogTitle>

          <DialogContent style={{background: '#2A3F4D'}}>
            <hr></hr> <br></br>

            <Typography gutterBottom>
             <font color='white'> You will lose your record(s) after this action. We can't recover them once you delete.</font>
            </Typography>
            <Typography gutterBottom>
            <font color='white'><p> Are you sure you want to<font color='#FF5E5E'> permanently delete</font> them? </p></font>
            <br></br>
            <hr></hr>
            </Typography>
          </DialogContent>
        

          <DialogActions style={{background: '#2A3F4D'}}>
          <Button onClick={handleClose} color="primary" variant="outlined">
          <font color='white'> Cancel </font>
            </Button>
            <Button  color="primary" variant="contained" onClick={() => {
                deleteByIds();
                window.location.reload();
              }}>
              Delete 
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    )
}
