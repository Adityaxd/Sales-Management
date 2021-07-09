import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import jspdf from 'jspdf';

export default function ResponsiveDialog({select}) {
  const [open, setOpen] = React.useState( false );
  const [btnDisable, setBtnDisable] = React.useState( true );
  const [btnColor, setBtnColor] = React.useState( "#97A1A9" );
  const [details, setDetails] = React.useState( [] );

  const theme = useTheme();
  const fullScreen = useMediaQuery( theme.breakpoints.down( 'sm' ) );
 
  React.useEffect( () => {
     let arrayids = [];
      console.log("inside button disable")
     select.forEach(d => {
        if (d.select) {
          arrayids.push( d.invoice_id );
          setDetails( d );
        }
     } );
    if ( arrayids != '' ) {
      setBtnColor( "#FFFFFF" )
      setBtnDisable( false )
    }
    else {
      setBtnColor("#97A1A9")
      setBtnDisable( true )
    }
  }, [select] );
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  var invoice ="";
  var name="";
  var amount="";
  var date="";
  var custNum="";
  var table=[];

  const jsPdfGenerator = () => {
    select.forEach(d => {
      if (d.select) {
        // table=d;
        invoice=d.invoice_id;
        name=d.name_customer;
        amount=d.total_open_amount;
        date=d.due_in_date;
        custNum=d.custNumInput;
      }
    });

    var doc = new jspdf('p','pt');
    doc.text(`Subject: Invoice Details - ${name}`,20,20);
    doc.text('Dear Sir/Madam, Greetings! This is to remind you that there are one or more',20,50);
    doc.text('open invoices on your account.',20,80);
    doc.text('Please provide at your earliest convenience an update on the payment details',20,110); 
    doc.text('or clarify the reason for the delay.',20,140)
    doc.text('If you have any specific issue with the invoice(s), please let us know so that',20,170);
    doc.text('we can address it to the correct Department.',20,200);
    doc.text('Please find the details of the invoices below:',20,230);
    doc.text(' Invoice_Num ---  PO_Num     ---  Date    --- Currency ---  Amount    ',20,290);
    doc.text(`${invoice}   --- ${invoice}  --- ${date}  ---  USD      --- ${amount}  `,20,320);
    doc.text(`Total Amount to be Paid: ${amount}`,20,380);
    doc.text(`In case you have already made a payment for the above items, `,20,410);
    doc.text(`please send us the details to ensure the payment is posted.`,20,440);
    doc.text(`Let us know if we can be of any further assistance.`,20,470); 
    doc.text(`Looking forward to hearing from you.`,20,500);
    doc.text(`Kind Regards, Aditya Chaudhary`,20,560);
    doc.text(`Phone : +91-8820558112`,20,590);
    doc.text(`Fax : +91-8820558112, Email : 1805455@kiit.ac.in`,20,620); 
    doc.text(`Company Name: ABC Products`,20,650);
    doc.save("InvoiceOrder_details.pdf");

  }

  const dataFetch = () => {
    select.forEach(d => {
      if (d.select) {
        table=d;
        invoice=d.invoice_id;
        name=d.name_customer;
        amount=d.total_open_amount;
        date=d.due_in_date;
        custNum=d.custNumInput;
        console.log("Updating invoice here in function",invoice);
      }
    });
  }

  return (
    <div style={{marginTop: '0.5rem' , marginLeft: '0.7rem'}}>
      <Button variant="outlined" color="primary" disabled={btnDisable} onClick = {() => {handleClickOpen(); 
      dataFetch();
      
      }}>
        View Correspondence
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg" 
      >
        <DialogTitle style={{ backgroundColor: "#2A3E4C" }} id="responsive-dialog-title" ><font color='white'>View Correspondence</font>
          <hr></hr>
        </DialogTitle>
        
        
        <DialogContent style={{backgroundColor:"#2A3E4C"}} >
        <DialogContentText style={{backgroundColor:"#2A3E4C"}} >
            
    <div>
     <p>
     <font color='#97a1a9'>Subject: </font > Invoice Details - {details.name_customer}
     </p>
     </div>
     <div>
     <p>
     Dear Sir/Madam, Greetings! This is to remind you that there are one or more open invoices on your account. 
     Please provide at your earliest convenience an update on the payment details or clarify the reason for the delay.
     If you have any specific issue with the invoice(s), please let us know so that we can address it to the correct Department. 
     </p>
     </div>
     <div>
        <p>Please find the details of the invoices below:</p>
     </div>

            <table style={{ border: '2px solid white', margin: "auto", textAlign: 'Left', width: '100%'}}>
              <tr style={{color: 'white'}}>
                <th>Sales_Order_Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th>Po Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th>Sales_Order_Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th>Due Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th>Currency &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th>Open Amount($)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
              </tr>
              <tr style={{color: 'white'}}>
                <td>{details.cust_number}</td>
                <td>{details.cust_number}</td>
                <td>{details.due_in_date}</td>
                <td>{details.due_in_date}</td>
                <td>USD</td>
                <td>{details.total_open_amount}</td>
                </tr>
            </table><br>
            </br>

    <div>
        <p styles={{color: '#C0C6CA'}}>Total Amount to be Paid: ${details.total_open_amount} </p>
        <p> In case you have already made a payment for the above items, please send us the details to ensure the payment is posted. 
            Let us know if we can be of any further assistance. 
            Looking forward to hearing from you. </p>
            <p>Kind Regards, Aditya Chaudhary </p>
            <p>Phone : +91-8820558112 </p>
            <p> Fax : +91-8820558112 </p>
            <p> Email : 1805455@kiit.ac.in </p>
              <p>Company Name: ABC Products</p>
              <hr></hr>
    </div>
            

          </DialogContentText>
        </DialogContent >
        <DialogActions style={{backgroundColor:"#2A3E4C"}} >
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={jsPdfGenerator} color="primary" variant="contained" autoFocus>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}