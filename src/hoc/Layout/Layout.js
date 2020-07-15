import React,{Component} from "react";
import Aux from '../Auxx/Aux';
import classes from './Layout.css';
import Toolbar from '../../componenets/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../componenets/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state={
        showSideDrawer:true
    }
    sideDrawerClosedHandler=()=>{
        this.setState({
            showSideDrawer:false
        });
    }
    toggleHandler=()=>{
        const ourValue=this.state.showSideDrawer;
        this.setState({
            showSideDrawer:!ourValue
        });
    }

    render(){

        return(
            <Aux>
                <Toolbar toggle={this.toggleHandler}/>
                <SideDrawer toggle={this.toggleHandler} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout ;