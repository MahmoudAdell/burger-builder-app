import React from 'react';
import burgerLogo from '../../assets/images/28.1 burger-logo.png.png';
import classes from './Logo.css';
const logo =()=>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='My Burger' />
    </div>
);

export default logo;