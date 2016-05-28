/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

var filterTitles = {
    meat:"М'ясні піцци",
    pineapple:"Піци з ананнасами",
    mushroom:"Піци з грибами",
    ocean:"Піци з морепродуктами",
    additional:"Вегетаріанські піци",
    nofilter:"Усі піцци"
}

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big, pizza.big_size.price);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small, pizza.small_size.price);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}


    function filterPizza() {
        $(".pizza-filter").click(function(){
        var pizza_shown = [];
        var temp=$(this).attr("id");
        if(temp == "nofilter"){
             showPizzaList(Pizza_List);
        } else{
        Pizza_List.forEach(function(pizza){
            if(pizza.content[temp]){
                if(temp == "additional"){
                    if(!pizza.content["ocean"] && !pizza.content["meat"]){
                        pizza_shown.push(pizza);
                    }
                } else pizza_shown.push(pizza);
                }
    
        });
        }
            showPizzaList(pizza_shown);
            $(".pizza-type-count").html(pizza_shown.length);
            redesign(temp);
        });
}

function redesign(filter){
    $(".pizza-type-title").html(filterTitles[filter]);
    $("#"+filter).attr("class", "active");
    $(".pizza-filter").removeClass("active");
}

function initialiseMenu() {
    //Показуємо усі піци
    filterPizza();
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;