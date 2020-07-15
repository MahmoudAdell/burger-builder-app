import React from 'react';
import classes from './BuildControl.css';

const buildControl =(props)=>{
    return(
    <div className={classes.BuildControl}> 
        <div className={classes.Label}> {props.label}</div>
        <button  onClick={props.substracted} className={classes.Less} disabled={props.disable}>Less</button>
        <button  onClick={props.Added} className={classes.More}>More</button>
    </div>
    );
};

export default buildControl;