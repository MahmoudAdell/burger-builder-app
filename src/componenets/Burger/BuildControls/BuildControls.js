import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const buildControls =(props)=>{
    const controls=[
        {'label':'Salad','type':'salad'},
        {'label':'Bacon','type':'bacon'},
        {'label':'Cheese','type':'cheese'},
        {'label':'Meat','type':'Meat'},
    ];
    return(
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(arr=>{
            return <BuildControl 
                    substracted={()=>props.ingredientSubstraction(arr.type)}
                    Added={()=>props.ingredientAdded(arr.type)} 
                    key={arr.label} label={arr.label}
                    disable={props.disabled[arr.type]} />;
        })}
        <button className={classes.OrderButton} 
                disabled={!props.purchaseable}
                onClick={props.ordered}>ORDER NOW</button>

    </div>
    );
};
export default buildControls;   