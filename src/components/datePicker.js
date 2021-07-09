import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({setdate}) {
  const [selectedDate, setSelectedDate] = React.useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setdate(date);
    console.log("Current Date is ",selectedDate)
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          format="yyyy-MM-dd"
          margin="normal"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         </Grid>
    </MuiPickersUtilsProvider>
  );
}