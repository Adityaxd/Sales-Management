import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import { Fragment, useState } from "react";
import Grid from '@material-ui/core/Grid';
import './AddButton.css';
import DatePicker from  './datePicker';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { Paper,Snackbar,IconButton } from '@material-ui/core';

const formLabelsTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131'
        },
      }
    }
  }
})

const useStyle = makeStyles((theme) => ({
    button:{
      float:'right'
    },
    button3:{
      marginRight:'700px'
    },
    button2:{
      margin:theme.spacing.unit,
      color:"#97A1A9",
      borderBlockColor:"#97A1A9",
      borderColor:"#97A1A9"
  },
    margin: {
      margin: theme.spacing(1),
      color:"#97A1A9",
    },
    TextField:{
      border: "1px solid #356680",
      borderRadius: "10px",
      opacity: "1",
      backgroundColor:"#283A46",
      borderColor:"#356680",
    },
  
  blue:{
    margin: theme.spacing(1),
    color:"#FFFFFF",
    backgroundColor:"#14AFF1",
  },
  colour:{
   borderColor:"#14AFF1"
  },
    
    
}));
export default function AddButton() {

    const [snackBar,setsnackBar] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [date,setdate] = useState('01/01/2021');

    const [invoiceInput,setinvoiceInput]=React.useState("");
    const [custNumInput,setcustNumInput]=React.useState("");
    const [amountInput,setamountInput]=React.useState("");
    const [nameInput,setnameInput]=React.useState("");
    const [DateInput, setDate] = React.useState("01/01/2021");
    const [notesInput,setnotesInput]=React.useState("");
    const myvalue="";
    
    const checkforSnack = () => {
      if ( invoiceInput === '' || custNumInput === '' || amountInput === '' || nameInput === '' || DateInput === '' ) {
        setsnackBar(true);}
        else{
      functionToSendData();
        window.location.reload();}
      }
    

    const handleSnack = () => {
      setsnackBar(false);
    }

    const functionToSendData = () => {
      axios.get(`http://localhost:8080/1805455/DataAdd?name=${nameInput}&custNum=${custNumInput}&amount=${amountInput}
      &invoice=${invoiceInput}&date=${DateInput}&notes=${notesInput}`)
      .then((response)=>{})
      .catch((error) => {
        console.log(error);
      });
    }

    const classes=useStyle();
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const re =  (/^[0-9]+$/);
    const inputFunctionCustNum = event => {
    if (event.target.value === '' || re.test(event.target.value)) {
      setcustNumInput( event.target.value );
    }}

    const inputFunctioninv= event => {
      if (event.target.value === '' || re.test(event.target.value)) {
        setinvoiceInput( event.target.value );
      }}

    const inputFunctionamount= event => {
        if (event.target.value === '' || re.test(event.target.value)) {
          setamountInput( event.target.value );
        }}
  
    const handleClose = () => {
      setOpen(false);
    };

    React.useEffect( ()=> {
    setDate(date)
    },[date])

    const DialogContent = withStyles(theme => ({
      root: {
        backgroundColor:"#2A3E4C",
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
      },
    }))(MuiDialogContent);
    
    const DialogActions = withStyles(theme => ({
      root: {
        backgroundColor:"#2A3E4C",
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
      },
    }))(MuiDialogActions);
    return (
      <ThemeProvider theme={formLabelsTheme}>
        <div >
          <Button variant="outlined" color="#97A1A9" className={classes.button2} startIcon={<AddIcon />}onClick={handleClickOpen}>
          <font color='white'>Add</font>
          </Button>
          
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
                maxWidth="md">
                <DialogTitle id="form-dialog-title" style={{backgroundColor:"#2A3E4C"}}><font color='white'>Add Invoice</font>
                <Button aria-label="close" onClick={handleClose} endIcon={<CloseIcon />} className={classes.button}> </Button>
           
            
              <br></br>
              <hr></hr>

      <form>
      <Grid container spacing={2}>
      <Grid item xs>
      <Grid container spacing={1}>
         <Grid item xs={6}>
           <InputLabel  className={classes.margin} required><font color='white'>Customer name</font></InputLabel>
        </Grid>
        <Grid item xs={6}>
          <TextField  size='small'  type="text" value={nameInput} onChange={(event) => setnameInput(event.target.value)}  variant="outlined"  
         className={classes.margin}  />
        </Grid>

        <Grid item xs={6}>
          <InputLabel className={classes.margin}  required ><font color='white'>Customer No</font></InputLabel>
        </Grid>
        <Grid item xs={6}>

         <TextField size='small' type="text" value={custNumInput} onChange={inputFunctionCustNum}  variant="outlined"  
         className={classes.margin}  />
        </Grid>
      
      <Grid item xs={6}>
          <InputLabel 
          className={classes.margin} required ><font color='white'>Sales_Order_ID </font></InputLabel> 
        </Grid>
        <Grid item xs={6}>
         <TextField size='small' type="text" value={invoiceInput} onChange={inputFunctioninv}  variant="outlined"  
         className={classes.margin} />
        </Grid>

        <Grid item xs={6}>
          <InputLabel className={classes.margin}  required ><font color='white'>Invoice Amount</font></InputLabel>
        </Grid>
        <Grid item xs={6}>
          <TextField  size='small'
          type="text" value={amountInput} onChange={inputFunctionamount}  variant="outlined" 
          className={classes.margin} />
        </Grid>
      </Grid>
    
      </Grid>
      <Grid item xs>

    <Grid container spacing={1}>
      <Grid item xs={6}>
         <InputLabel className={classes.margin}  required > <font color='white'>Due Date </font> </InputLabel>
        </Grid>
        <Grid item xs={6}>
        <DatePicker setdate={setdate} onChange={(event) => setDate(event.target.value)} value={DateInput}/>
        </Grid>

        <Grid item xs={6}>
          <InputLabel size='small' className={classes.margin} ><font color='white'>Notes</font></InputLabel>
        </Grid>
        <Grid item xs={6}>
          <TextField type="text" value={notesInput} onChange={(event) => setnotesInput(event.target.value)}  
          variant="outlined"  id="outlined-multiline-static" multiline rows={8}/>
        </Grid>
      </Grid> 
      </Grid>
      </Grid>
       </form>
       </DialogTitle>
            <DialogActions>
              <div className="ButtonHeader">
              <Button onClick={handleClose} style={{color:"#14AFF1"}} className={classes.button3}>
                Cancel
              </Button>
              <div className="right">
              <Button onClick={()=> {setnameInput(''); setinvoiceInput(''); setcustNumInput(''); setamountInput(''); setnotesInput(''); }}
              variant="outlined" color="#2C404E" className={classes.colour}  color="#FFFFFF" style={{color:"#FFFFFF",borderBlockColor:"#14AFF1", borderColor:"#14AFF1"}} color="primary">
                Clear
              </Button>             
              <Button variant="contained" className={classes.blue} onClick={() => {
                checkforSnack();
              }}>
               Add
              </Button>
              <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal:'left',
                    }}
                    open={snackBar}
                    autoHideDuration={300}
                    message="Mandatory fields can't be empty."
                    action={
                      <React.Fragment>
                        <IconButton size='small' aria-label='close' color='inherit' onClick={handleSnack}>
                          <CloseIcon fontSize='small'/>
                        </IconButton>
                      </React.Fragment>
                    }
                    />
              </div>
              </div>
            </DialogActions>
          </Dialog>
        </div>
        </ThemeProvider>
      );
    }