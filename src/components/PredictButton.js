// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// export default function PredictButton() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Button variant="contained" color="primary">
//         Predict
//       </Button>
     
//     </div>
//   );
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function PredictButton({select}) {
  const classes = useStyles();
  const [btnDisable, setBtnDisable] = React.useState( true );

  React.useEffect( () => {
     let arrayids = [];
      console.log("inside buttondisable")
     select.forEach(d => {
        if (d.select) {
          arrayids.push(d.invoice_id);
        }
     } );
    if ( arrayids != '' )
      setBtnDisable( false )
    else
      setBtnDisable(true)
      
      
  },[select]);

  return (
    <div className={classes.root}>
      <Button variant="contained" disabled={btnDisable} color="primary">
        Predict
      </Button>
     
    </div>
  );
}