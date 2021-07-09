import React from "react";
import axios from "axios";
import "./Table.css";
import { CircularProgress, Table, TableCell, TableContainer, TableRow, TableHead, TableBody,Paper } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useSelector } from 'react-redux';
import { Snackbar,IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Mytheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root:{
        borderBottom:'0px'
      },
      body:{
        color: 'rgb(241 231 231 / 87%)',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '30px'
      },
      head:{
        color:'#97A1A9'
      },
      stickyHeader:{
        color:'#97A1A9',
        backgroundColor:'#2A3E4C'
      }
    },
    MuiTableHead:{
      root:{
        borderBottom: '3px solid #283A46'
      }

    },
    MuiTableRow: {
      root:{
        '&:nth-of-type(even)':{
          backgroundColor:'#283A46'
        }
      }
    },
    MuiCheckbox: {
      colorSecondary:{
        MuiChecked: {
          color: '#14AFF1'
        }
      }

    }
  }
  });
  
export default function MyTable({setselect}) {

  const [responseData, setResponseData] = React.useState([]);
  const [isNext, setNext] = React.useState(false);
  const [pageCount, setCount] = React.useState(0);
  const search = useSelector(state => state.searchedField);
  const [zero,setzero]= React.useState(0);
  const [showNoData,setshowNoData]= React.useState(false);


  const fetchMoreData= () => {
    setCount(pageCount + 1);
  };

  const functionTosetPage0 = () => {
    setCount(0); 
  };

  React.useEffect( ()=> {                        
    fetchMoreData()
  },[]);

  React.useEffect( ()=> {                                          
      setselect(
        responseData.map(d => {
          return {
            select: false,
            id: d.invoice_id,
          };
        })
      );
  },[]);

  React.useEffect( ()=> {
    if(pageCount !== 0){
      setNext(true);
      axios.get(`http://localhost:8080/1805455/DataFetch?page=${pageCount}`)
    .then((response) => { 
      console.log(pageCount);
      const isDataAvailable = response.data && response.data.length;
      if(!isDataAvailable)
      setNext(false);
      setResponseData((prev) => [...prev, ...response.data]);
      console.log("data")
    })
    .catch((error) => {
      console.log(error);
    });
  }
  },[pageCount]);

  const scrollThresh = 1;
   React.useEffect( () => {
    setNext(true);
     if(search !==''){
     axios.get(`http://localhost:8080/1805455/DataSearch.do?invoice=${search}`)
    .then((response) => { 
      setNext(false);
      setResponseData([...response.data]);
    })
    .catch((error) => {
      console.log(error);
    });

    if(responseData==''){
      setshowNoData(true)
      }
  }else{
    setResponseData([]);
    functionTosetPage0(); 
    fetchMoreData() 
  }
   },[search]);
  
   const handleSnack = () => {
     setshowNoData(false);
   }

  return (
    <div>
  <ThemeProvider theme={Mytheme}>
     <TableContainer id='myTableData' style={{height:'65vh',width:'90vw',borderBottom:'0px',borderTop:'0px'}}>
      <Table stickyHeader>  
        <TableHead>
        <TableRow>
        <TableCell>
          <input type="checkbox"  
                onChange={e => {
                  let checked = e.target.checked;
                  setselect(
                    responseData.map( d => {
                      d.select = checked;
                      return d;
                    })
                  );
                }}
              ></input>
          </TableCell>
          <TableCell>Customer Name</TableCell>
           <TableCell>Customer #</TableCell>
           <TableCell>Sales_Order_Id</TableCell>
           <TableCell>Invoice Amount</TableCell>
           <TableCell>Due Date</TableCell>
           <TableCell>Predicted Payment Date</TableCell>
           <TableCell>Predicted Aging Bucket</TableCell>
           <TableCell>Notes</TableCell>
           </TableRow>
        </TableHead>
        
        <TableBody>
          {responseData.map((data, myIndex) => ( 
            <TableRow key={data.myIndex}>
            <TableCell>
            <input
                  onChange={event => {
                    let checked = event.target.checked;
                    setselect(
                      responseData.map(d => {
                        if (data.invoice_id === d.invoice_id) {
                          data.select = checked;
                          console.log("checking", data.invoice_id === d.invoice_id );
                        }
                        return d;
                      })
                    );
                  }}
                  type="checkbox"
                  checked={data.select}
                ></input>
          </TableCell>
          <TableCell>{data.name_customer}</TableCell>
           <TableCell>{data.cust_number}</TableCell>
           <TableCell>{data.invoice_id}</TableCell>
           <TableCell>{data.total_open_amount}</TableCell>
           <TableCell>{data.due_in_date}</TableCell>
           <TableCell><center>---</center></TableCell>
           <TableCell><center>---</center></TableCell>
           <TableCell>{data.notes}</TableCell>
           </TableRow>
          ))}
          </TableBody>
          </Table>
            
          <InfiniteScroll
        scrollableTarget='myTableData'
        dataLength={responseData.length}
        next={fetchMoreData}
        scrollThreshold={scrollThresh}
        hasMore={isNext}
        loader={
        <div style={{ height: "80%", paddingLeft: "45%", overflow: "hidden",
         color: "#ffffff",display:'flex' ,flexDirection:'column', marginTop:'50px', marginBottom:'150px'}}>
        <CircularProgress />&nbsp;Loading...
        </div>}>
        </InfiniteScroll>
        <div>
        <Snackbar
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal:'center',
                    }}
                    open={showNoData}
                    autoHideDuration={300}
                    message="No such Sales_Order_Id Exist."
                    action={
                      <React.Fragment>
                        <IconButton size='large' aria-label='close' color='inherit' onClick={handleSnack}>
                        </IconButton>
                      </React.Fragment>
                    }
                    />
        </div>
      </TableContainer>  
  </ThemeProvider>  
  </div>
  );
}

