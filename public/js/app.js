$(function() {
    let pokemonSearch;
    let defaultPokemon = "1";
    let defaultPokemonData;
    let allPokemon = [];

    let initFunc = function() {

        //https://pokerapi.co/api/v2/pokemon/?limit=811
        defaultPokemonData = $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + defaultPokemon,
            method: "GET"
        });

        defaultPokemonData.done(function(data) {
            $('.loading-container').removeClass('active');
            $('.pokedex h3').text(data.name.toUpperCase());
            $('.poke-img img').attr('src', data.sprites.front_default)

        })

        defaultPokemonData.fail(function(jqXHR, textStatus, error) {
            alert("request failed: " + textStatus + ' ' + error);
        })
    }
    //--------------- Runs function, loading screen, and main pic to first pokemon-----------------//
    initFunc();

    // Search Button - AJAX call that grabs the search input and submits it
    $('.btn').on('click', function() {
        // Gets the Value of the search field
        pokemonSearch = $('.pokedex input[type="text"]').val()
        // Makes request to the pokemon API
        let request = $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
            method: "GET"
        });
        // If API call is successful, it will change the pic and name of the pokemon accordingly
        request.done(function(data) {
            $('.pokedex h3').text(data.name.toUpperCase());
            $('.poke-img img').attr('src', data.sprites.front_default)
            console.log(data)
        })
        // If API call is not successful, it will return the error
        request.fail(function(jqXHR, textStatus, error) {
            alert("request failed: " + textStatus + ' ' + error);
        })
    });

    // Shows a modal popup showing a list of ALL pokemons
    $('.btn2').on('click', function() {
        let request2 = $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/?limit=803",
            method: "GET"
        });

        // API successful
        request2.done(function(data) {
            // adds a class that has a greater index than everything, showing the list of pokemons
            $('.third').addClass('active2');
            // loop through the results
            for (let i = 0; i < data.results.length; i++) {
                let $name = data.results[i].name;
                // grabs the name of the pokemon
                let $url = data.results[i].url.split('/');
                //grabs the url of the pokemon and splits it into an array seperated by the '/'
                // Example :  www.test1/test2/test3  , will be [test1, test2, test3]
                $url = $url[$url.length - 2]
                // gets the last number I need ( if url is testing/1/).. it will grab the '1'
                console.log($url)
                // If the pokemon index is greater than 100 , adding '00' etc is not nessary
                if ($url >= 100) {
                    $('.third').append(('<div class = "current-pokemons">' + '<a href = "' +
                        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' +
                        $url + '.png">' + $name + '</a></div>'));

                    //If the pokemon is lower than 100 index, the url will be 00x
                } else if ($url < 100 & $url>9) {
                    $('.third').append(('<div class = "current-pokemons">' + '<a href = "' +
                        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0' +
                        $url + '.png">' + $name + '</a></div>'));

                }
                else if ($url <10) {
                   $('.third').append(('<div class = "current-pokemons">' + '<a href = "' +
                       'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00' +
                       $url + '.png">' + $name + '</a></div>'));

               }

            }

            $('.current-pokemons').click(function(event) {
                event.preventDefault();
                let $hello = $(this)[0].childNodes[0].href
                let $currentPokemonPicked = $(this)[0].childNodes[0].innerHTML

                $('.poke-img img').attr('src', $hello)
                $('.pokedex h3').text($currentPokemonPicked.toUpperCase());
                $('.third').removeClass('active2');

            })

        })
        request2.fail(function(jqXHR, textStatus, error) {
            alert("request failed: " + textStatus + ' ' + error);

        })


    })

});
