import React,{ Component } from "react";
import Aux from '../../hoc/Auxx/Aux';
import Burger from '../../componenets/Burger/Burger';   
import BuildControls from '../..//componenets/Burger/BuildControls/BuildControls';
import Modal from '../../componenets/UI/Modal/Modal';
import OrderSummary from '../../componenets/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../componenets/UI/Spiner/Spiner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INDREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};
class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice:4,
        purshaseable:false,
        purshasing:false ,
        loading:false

    };

    componentDidMount(){
        axios.get('https://my-burger-react-fb4cd.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data}); 
        });

    }
    updataParshaseState(ingredients){
        const sum =Object.keys(ingredients).map((igkey)=>{
                return ingredients[igkey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);

        this.setState({
            purshaseable:sum>0
        });
    }

    addIngridientHandler=(type)=>{
       const oldCount = this.state.ingredients[type];
       const updatedCount =oldCount+1;
       const updatedIngredients ={
            ...this.state.ingredients
       };
       updatedIngredients[type]=updatedCount;

       const priceAddition=INDREDIENT_PRICES[type];
       const oldPrice=this.state.totalPrice;
       const newPrice=oldPrice+priceAddition;
       this.setState({
        ingredients:updatedIngredients,
        totalPrice:newPrice
   });

       this.updataParshaseState(updatedIngredients); 
 
    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount !==0){
            const updatedCount =oldCount-1;
            const updatedIngredients ={
                 ...this.state.ingredients
            };  
            updatedIngredients[type]=updatedCount;
            const priceSubstraction=INDREDIENT_PRICES[type];
            const oldPrice =this.state.totalPrice;
            const newPrice=oldPrice-priceSubstraction;
            this.setState({
                ingredients:updatedIngredients,
                totalPrice:newPrice
           });
           this.updataParshaseState(updatedIngredients);
        }
        
    }

    purshaseHandler=()=>{
        this.setState({
            purshasing:true
        });
    }

    purshaseCancledHandler=()=>{
        this.setState({
            purshasing:false
        });
    }
    purshaseContinueHandler=()=>{
        //alert('You continue!');
        this.setState({
            loading:true
        });
        const order ={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'mahmoud adel',
                address:{
                    street:'helwan',
                    zipcode:'5152',
                    country:'Egypt'
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
        .then(Response=>{
            this.setState({loading:false,purshasing:false});
        })
        .catch(error=>{
            this.setState({loading:false,purshasing:false});
        });

    }

    


    render(){
        const disabledInfo={
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;            
        }
        let orderSummary=null;
        
        let burger=<Spinner/>;
        if(this.state.ingredients){
            burger=(
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls  disabled={disabledInfo} 
                                    ingredientSubstraction={this.removeIngredientHandler} 
                                    ingredientAdded={this.addIngridientHandler}
                                    price={this.state.totalPrice}
                                    purchaseable={this.state.purshaseable}
                                    ordered={this.purshaseHandler}/>
                </Aux>
    
            );

            orderSummary=<OrderSummary ingredients={this.state.ingredients}
                            purshaseCanceled={this.purshaseCancledHandler}
                            purshaseContinued={this.purshaseContinueHandler}
                            price={this.state.totalPrice.toFixed(2)}/>
        }

        if(this.state.loading){
            orderSummary=<Spinner/>;
        }
        
        return(
                <Aux>
                    <Modal show={this.state.purshasing} modalClosed={this.purshaseCancledHandler}>
                        {orderSummary}
                    </Modal>
                     {burger}
                
                </Aux>
             );
         }
}


export default withErrorHandler(BurgerBuilder,axios);