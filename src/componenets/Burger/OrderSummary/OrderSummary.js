import React,{Component} from 'react';
import Aux from '../../../hoc/Auxx/Aux';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {

    componentWillUpdate(){
        console.log('[ordersummaryWillUpdate]');
    }

    render(){

        const ingredientSummary=Object.keys(this.props.ingredients)
        .map((igkey)=>{
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span> : {this.props.ingredients[igkey]}</li>
        });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.price} $</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purshaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purshaseContinued}>CONTINOUS</Button>
            </Aux>
        );
    }
}

export default OrderSummary;