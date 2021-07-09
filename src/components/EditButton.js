import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
    button:{
       float:'right' 
    },
    button2:{
        margin:theme.spacing.unit,
        color:"#97A1A9",
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


export default function EditButton({select}) {

  const [btDisable, setBtDisable] = React.useState( true );
  const [btColor, setBtColor] = React.useState( "#97A1A9" );

    const [open, setOpen] = React.useState(false);
    const [notesInput,setnotesInput]=React.useState("");
    const [amountInput,setamountInput]=React.useState("");

    React.useEffect( () => {
      let arrayids = [];
      select.forEach(d => {
         if (d.select) {
           arrayids.push(d.invoice_id);
         }
      } );
     if ( arrayids.length == 1 ) {
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
    
    const re =  (/^[0-9]+$/);
    const inputFunctionamount= event => {
      if (event.target.value === '' || re.test(event.target.value)) {
        setamountInput( event.target.value );
      }}
    
    


    const handleClose = () => {
      setOpen(false);
    };

    const resetValues = () => {
      setnotesInput("");
      setamountInput("");
    }


    const EditById = () => {
      let arrayids = [];
      
     select.forEach(d => {
        if (d.select) {
          arrayids.push(d.invoice_id);
        }
      });
      axios
        .get(`http://localhost:8080/1805455/DataEdit?invoice=${arrayids}&amount=${amountInput}&notes=${notesInput}`)
        .then(data => {
          console.log(data);
          
        })
        .catch(err => alert(err));
    };
    
    return (
        <div className={classes.root}>

          <Button variant="outlined" disabled={btDisable} color="primary" className={classes.button2} startIcon={<EditIcon color={btColor} />}onClick={handleClickOpen}>
          <font color={btColor}>Edit</font>
          </Button>
            
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                
                <DialogTitle id="form-dialog-title" style={{backgroundColor:"#2A3E4C"}}><font color='white'>Edit Invoice</font>
                <Button aria-label="close" onClick={handleClose} endIcon={<CloseIcon />} className={classes.button}> </Button>
                <hr></hr>
                </DialogTitle>
               
            
            <DialogContent style={{backgroundColor:"#2A3E4C"}}>
              
                <Grid container spacing={1}>
            <Grid item sm={5}>
              <InputLabel className={classes.margin} display="inline-block" ><font color= '#97A1A9'>Invoice amount</font></InputLabel>
              </Grid>
              <Grid item sm={7}>
              <TextField  size='small'
          type="text" value={amountInput} onChange={inputFunctionamount}  variant="outlined" 
          className={classes.margin} style={{marginLeft:'48px'}} />
              </Grid>
              </Grid>
              <Grid container spacing={1}>
              <Grid item xs={6}>
             <InputLabel className={classes.margin}  ><font color='#97A1A9'>Notes</font></InputLabel>
             </Grid>
             <Grid item xs={6}>
             <TextField type="text" value={notesInput} onChange={(event) => setnotesInput(event.target.value)}  
          variant="outlined"  id="outlined-multiline-static" size='small' multiline rows={8}/>
            </Grid>
            </Grid>
            

            </DialogContent>
            <DialogActions style={{backgroundColor:"#2A3E4C"}}>
              <div className="ButtonHeader">
              <Button onClick={handleClose} style={{color:"#14AFF1",marginRight:"333px"}} className={classes.button3}>
                Cancel
              </Button>
              <div className="right">
              <Button variant="outlined" color="#2C404E" className={classes.colour}  color="#FFFFFF" style={{color:"#FFFFFF",
          borderBlockColor:"#14AFF1",
          borderColor:"#14AFF1"}} onClick={resetValues} color="primary">
                Reset
              </Button>
              <Button variant="contained" className={classes.blue} onClick={() => {
                EditById();
                window.location.reload();
              }}>
               Save
              </Button>
              </div>
              </div>
            </DialogActions>
          </Dialog> 
          
        </div>
      );
    }