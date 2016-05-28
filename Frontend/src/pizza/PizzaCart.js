/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../Storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

var sumPrice = 0;

function addToCart(pizza, size, price) {
        var inCart =  false;
        Cart.forEach(function(e){
        if(e.pizza == pizza && e.size == size) {
            inCart = true;
            e.quantity++;
        }
    });
    //Додавання однієї піци в кошик покупок
    //Приклад реалізації, можна робити будь-яким іншим способом
    if(!inCart){
        Cart.push({
        pizza: pizza,
        size: size,
        price: price,
        quantity: 1,
        });
    }
    $(".orders-count-cart").html(parseInt($(".orders-count-cart").html())+1);
    sumPrice+=price;
    $(".sum").html(sumPrice+" грн");
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    var temp = [];
    var indexOfItem = Cart.indexOf(cart_item);
    for (var i=0; i<Cart.length; i++){
        if(i != indexOfItem){
            temp.push(Cart[i]);
        }
    }
    Cart = temp;
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    Cart = Storage.get("cart");
    var count=0;
    Cart.forEach(function(e){
        sumPrice+=parseInt(e.price*e.quantity);
        count+=parseInt(e.quantity);
    })
    $(".sum").html(sumPrice+" грн");
    $(".orders-count-cart").html(count);
    clearCart();
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function clearCart(){
    $(".clear-cart").click(function(){
        while(Cart.pop());
        $(".orders-count-cart").html(0);
        updateCart();
    });
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    if(Cart.length == 0){
            $(".title-bottom-cart").css({"display": "none"});
            $(".sum").css({"display": "none"});
            $(".do-order").attr("disabled", true);
            $("#cart").css({"height": "75%"});
        } else{
             $(".title-bottom-cart").css({"display": "inline"});
            $(".sum").css({"display": "inline"});
            $(".do-order").removeAttr("disabled");
            $("#cart").css({"height": "71%"});
        }

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            $(".orders-count-cart").html(parseInt($(".orders-count-cart").html())+1);
            sumPrice+=cart_item.price;
            $(".sum").html(sumPrice+" грн");
            //Оновлюємо відображення
            updateCart();
        });
        
        $node.find(".minus").click(function(){
            if(cart_item.quantity == 1){
                removeFromCart(cart_item);
            } else{
                cart_item.quantity--;
            }
            $(".orders-count-cart").html(parseInt($(".orders-count-cart").html())-1);
            sumPrice-=cart_item.price;
            $(".sum").html(sumPrice+" грн");
            updateCart();
        });
        
        $node.find(".delete").click(function(){
            sumPrice-=(cart_item.quantity*cart_item.price);
            $(".sum").html(sumPrice+" грн");
            removeFromCart(cart_item);
            $(".orders-count-cart").html(parseInt($(".orders-count-cart").html())-cart_item.quantity);
            updateCart();
         });
        
        $cart.append($node);
    
    }
        
    Cart.forEach(showOnePizzaInCart);
    Storage.set("cart", Cart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;