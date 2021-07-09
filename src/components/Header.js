import React, { Component } from 'react'
import HRCLogo from '../assets/logo.svg'
import mainLogo from '../assets/abc.svg'
import './Header.css'
import { Grid } from '@material-ui/core'

class Header extends Component {
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                    <img src = {mainLogo} className = "CustLogo" style={{marginLeft:'3rem'}}/></Grid>
                    <Grid item xs={7}>
                    <img src = {HRCLogo} className = "HRCLogo" style={{marginLeft:'1.5rem'}}/></Grid>
                    </Grid>
                <div className = 'Header'><h1>Invoice List</h1></div>
            </div>
        )
    }
}

export default Header
