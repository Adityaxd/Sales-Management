import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import action from '../actions/action.js'
import { useDispatch} from 'react-redux';

let debounceTimer = null; 
  const debounce = (func) => {
  return function() { 
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);  
      debounceTimer = setTimeout(() => func.apply(context, args), 500) 
  } 
} 

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    outlineStyle: 'solid', 
    outlineColor: '#356680',
    outlineWidth: 'thin',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '250px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    height: "70%"
  },
  searchIcon: {
    padding: theme.spacing(0.75, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'inline',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '22ch',
      '&:focus':{
        width: '26ch'
      },
    },
  },
}));

export default function PrimarySearchAppBar() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [data,setdata] = React.useState('');
  const handleChange = (event) => { 
    setdata(event.target.value);
 }

 React.useEffect( ()=> {
  changeStoreValue();
},[data]); 

const changeStoreValue = () => {
dispatch(action(data));
}


  return (
          <div className={classes.search} style={{color:'#FFFFFF', backgroundColor:"#2A3E4C", marginTop:"6px"}}>
              <div style={{color:'#FFFFFF'}}  className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase style={{color:'#FFFFFF'}} placeholder="Search by Sales Order ID" classes={{root: classes.inputRoot,input: classes.inputInput}}
              inputProps={{ 'aria-label': 'search'}} onChange={debounce(handleChange)}
            />
            
          </div>
  );
}
