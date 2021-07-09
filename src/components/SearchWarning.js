import React from 'react'
import ErrorOutlineTwoToneIcon from '@material-ui/icons/ErrorOutlineTwoTone';
import { Button, TableCell } from '@material-ui/core';

function SearchWarning() {
    return (
        <div>
            <div>
               < ErrorOutlineTwoToneIcon />
               <p> <font color='white'>No results found </font></p>
            </div>
            <div>
                <p> <font color='#C0C6CA'>No results found </font> </p>
            </div>
            <div>
                <Button color="primary">Clear Search</Button>
            </div>
        </div>
    )
}

export default SearchWarning
