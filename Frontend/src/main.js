/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();


});

function removeFromCart(cart_item) {
    var temp = [];
    var indexOfItem = Cart.indexOf(cart_item);
    for (var i=0; i<Cart.length; i++){
        if(i != indexOfItem){
            temp[i] = Cart[i];
        }
    }
    Cart = temp;
    updateCart();
}