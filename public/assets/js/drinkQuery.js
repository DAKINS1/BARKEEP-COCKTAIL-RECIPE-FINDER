$(document).ready(function(){

    function searchDrinks(drink) {

        var queryURL = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            for (var obj in response.drinks) {
                $('#main').append('<div class="card" div class="col-md-4" id=' + obj + '>');

                if (response.drinks[obj].strDrinkThumb) $('#' + obj).append('<img class="card-img-top" src="' + response.drinks[obj].strDrinkThumb + '">')
                if (response.drinks[obj].strDrink) $('#' + obj).append('<div class="card-block" div class="card-title"><h3>' + response.drinks[obj].strDrink + '</h3>');
                var keysArray = Object.keys(response.drinks[obj]);
                var counter = 1;

                for (var i = 0; i < keysArray.length; i++) {
                    var index = keysArray[i];
                    var meas = 'strMeasure' + counter;
                    var name = 'strIngredient' + counter;
                    if ( keysArray[i] === name && response.drinks[obj][index] !== null && response.drinks[obj][index] !== '' ) {
                        $('#' + obj).append(
                            '<p class="card-text">' + response.drinks[obj][name] + ' ' + response.drinks[obj][meas] +
                            '</p>'
                        );

                        counter++;
                    }
                    // $('#main').append('</div>');
                }

                $('#' + obj).append('<p class="card-text">' + response.drinks[obj]['strInstructions'] + '</p></div>');
            }
            // $('.col-md-3').matchHeight();
        });
    }


    $("#select-drink").on("click", function (event) {

        event.preventDefault();
        $('#main').empty();

        var drink = $("#drink-input").val().trim();

        searchDrinks(drink);

        // $('.col-md-3').matchHeight();

    });

});