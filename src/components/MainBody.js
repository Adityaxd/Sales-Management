import React, { Component,useState } from 'react';
import './MainBody.css';
import { makeStyles } from '@material-ui/core/styles';
import AddButton from './AddButton.js';
import EditButton from './EditButton.js';
import DeleteButton from './DeleteButton.js';
import PredictButton from './PredictButton.js';
import ViewCorrespondenceButton from './ViewCorrespondenceButton.js'
import SearchBarField from './SearchBarField.js';
import MyTable from './MyTable.js';


export default function MainBody() {

    const [select,setselect]=useState([]);

    return (
        <div class="outer">
            <div class="inner">
            <div class="buttons">
            <div style={{display:'flex'}}>
             <PredictButton select={select}/>
             <ViewCorrespondenceButton select={select}/>
             </div>
             <div style={{display:'flex'}}>
             <AddButton/>
             <EditButton    select={select}/>
             <DeleteButton  select ={select}/>
            <SearchBarField/>
            </div>
            </div>        
             <MyTable setselect={setselect}/> 
            </div>
        </div>
    )
}
