if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

        $.ajax({
            url: "libs/php/latlng.php",
            type: 'POST',
            datatype: 'json',
            data: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            success: function (result) {
               console.log(result); 


            if(result.status.name = 'ok') {

                $('#country').html(result['countryName']);
                $('#countryCode').html(result['countryCode']);
            }

        }, 
        error: function(jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }

        });

        

    });
} else {
    alert("Geo Location not supported by this device.");
}

$(document).ready(function () {
    $.ajax({
        url: "libs/php/countryCode.php",
        type: 'POST',
        datatype: 'json',
        data: {
            countryCode: $('#countryCode').val()
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#capitalCity').html(result['data'][0]['captial']);
                $('#population').html(result['data'][0]['population']);
                $('#continent').html(result['data'][0]['continentName']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: "libs/php/restCountriesApi.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: $('#countryCode').val()
        },
        success: function (result) {
            console.log(result);

            if (result.status.name == 'ok') {

                $('#callingCode').html(result['callingCode'][0]);
                $('.currencyName').html(result['currencies'][0]['name']);
                $('.currencySymbol').html(result['currencies'][0]['symbol']);
                $('#currencyCode').html(result['currencies'][0]['code']);
                $('#languageSpoken').html(result['languages'][0]['name']);
                $('#countryFlag').attr('src', result['flagSRC']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: "libs/php/currentWeather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            captial: $('#capitalCity').val().replace(/ /g, '+')
        },
        success: function (result) {
            console.log(result);

            if (result.status.name == 'ok') {

                $('#currentWeatherType').html(result['weather'][0]['description']);
                $('#currentTemp').html(result['main']['temp']);
                $('#currentMaxTemp').html(result['main']['temp_min']);
                $('#currentMinTemp').html(result['main']['temp_max']);

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: "libs/php/forecast.php",
        type: 'POST',
        dataType: 'json',
        data: {
            captial: $('#capitalCity').val().replace(/ /g, '+')
        },
        success: function (result) {
            console.log(result);

            if (result.status.name == 'ok') {

                $('#weatherType0').html(result['list'][0]['weather'][0]['descrption']);
                $('#forecastTemp0').html(result['list'][0]['main']['temp']);
                $('#forecastMin0').html(result['list'][0]['main']['temp_min']);
                $('#forecastMax0').html(result['list'][0]['main']['temp_max']);

                $('#weatherType1').html(result['list'][2]['weather'][0]['descrption']);
                $('#forecastTemp1').html(result['list'][2]['main']['temp']);
                $('#forecastMin1').html(result['list'][2]['main']['temp_min']);
                $('#forecastMax1').html(result['list'][2]['main']['temp_max']);

                $('#weatherType2').html(result['list'][4]['weather'][0]['descrption']);
                $('#forecastTemp2').html(result['list'][4]['main']['temp']);
                $('#forecastMin2').html(result['list'][4]['main']['temp_min']);
                $('#forecastMax2').html(result['list'][4]['main']['temp_max']);

                $('#weatherType3').html(result['list'][6]['weather'][0]['descrption']);
                $('#forecastTemp3').html(result['list'][6]['main']['temp']);
                $('#forecastMin3').html(result['list'][6]['main']['temp_min']);
                $('#forecastMax3').html(result['list'][6]['main']['temp_max']);

                $('#weatherType4').html(result['list'][8]['weather'][0]['descrption']);
                $('#forecastTemp4').html(result['list'][8]['main']['temp']);
                $('#forecastMin4').html(result['list'][8]['main']['temp_min']);
                $('#forecastMax4').html(result['list'][8]['main']['temp_max']);

                $('#weatherType5').html(result['list'][10]['weather'][0]['descrption']);
                $('#forecastTemp5').html(result['list'][10]['main']['temp']);
                $('#forecastMin5').html(result['list'][10]['main']['temp_min']);
                $('#forecastMax5').html(result['list'][10]['main']['temp_max']);

                $('#weatherType6').html(result['list'][12]['weather'][0]['descrption']);
                $('#forecastTemp6').html(result['list'][12]['main']['temp']);
                $('#forecastMin6').html(result['list'][12]['main']['temp_min']);
                $('#forecastMax6').html(result['list'][12]['main']['temp_max']);

                $('#weatherType7').html(result['list'][14]['weather'][0]['descrption']);
                $('#forecastTemp7').html(result['list'][14]['main']['temp']);
                $('#forecastMin7').html(result['list'][14]['main']['temp_min']);
                $('#forecastMax7').html(result['list'][14]['main']['temp_max']);

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: 'libs/php/exchangeRate.php',
        type: 'POST',
        dataType: 'json',
        data: {
            currencyCode: $('.currencyCode').val()
        },
        success: function (result) {
            console.log(result);

            if (result.status.name == 'ok') {

                $('#usdRate').html(result['rates']['USD']);
                $('#gbpRate').html(result['rates']['GBP']);
                $('#eurRate').html(result['rates']['EUR']);
                $('#jpyRate').html(result['rates']['JPY']);

                /*
                 Use an if statement to initiate a switch statement
                 switch statement gets rid of an entry of the rate if the country 
                 uses one of the four currencies above.
                 Once correct info is being returned - have the below statements
                 incorporated so that it doesnt throw up an error when it cannot
                 pull the information about an exchange rate that is not available
                 e.g. GBP to GBP.

                if ($('.currencyCode').val() == 'USD' || 'GBP' || 'EUR' || 'JPY') {
                    
                    switch ($('.currencyCode').val()){
                        case 'USD':
                           $('#usdExchangeRate').style.display = "none";
                           *Input exchnage rate info on the other currencies below
                           break;
                        
                        case 'GBP':
                           $('#usdExchangeRate').style.display = "none";
                           *Input exchnage rate info on the other currencies below
                           break;

                        case 'EUR':
                            $('#usdExchangeRate').style.display = "none";
                           *Input exchnage rate info on the other currencies below
                           break;

                        case 'JPY':
                            $('#usdExchangeRate').style.display = "none";
                           *Input exchnage rate info on the other currencies below
                           break;

                        default:
                            *Input the exchanage rate information about all four
                            * currencies below.
                    }
                }

                 */

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: "libs/php/newsCountry.php",
        type: 'POST',
        datatype: 'json',
        data: {
            countryCode: $('#countryCode').val()
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#countryNewsTitle').html(result['article'][0]['title']);
                $('#countryNewsContent').html(result['article'][0]['content']);
                $('#countryNewsPublisher').html(result['article'][0]['source']['name']);
                $('#countryNewsLink').attr('href', result[0]['url']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: "libs/php/newsCapital.php",
        type: 'POST',
        datatype: 'json',
        data: {
            capital: $('#capitalCity').val().replace(/ /g, '+')
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#capitalNewsTitle').html(result['article'][0]['title']);
                $('#capitalNewsContent').html(result['article'][0]['content']);
                $('#capitalNewsPublisher').html(result['article'][0]['source']['name']);
                $('#capitalNewsLink').attr('href', result[0]['url']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: "libs/php/newsCovid.php",
        type: 'POST',
        datatype: 'json',
        data: {
            countryCode: $('#countryCode').val()
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#covidNewsTitle').html(result['article'][0]['title']);
                $('#covidNewsContent').html(result['article'][0]['content']);
                $('#covidNewsPublisher').html(result['article'][0]['source']['name']);
                $('#covidNewsLink').attr('href', result[0]['url']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: "libs/php/wikiSearchCountry.php",
        type: 'POST',
        datatype: 'json',
        data: {
            country: $('#country').val().replace(/ /g, '+')
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#wikiSummaryCountry').html(result['data'][0]['summary']);
                $('#wikiCapitalLink').attr('href', result['data'][0]['wikipediaUrl']);

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: "libs/php/wikiSearchCapital.php",
        type: 'POST',
        datatype: 'json',
        data: {
            capital: $('#capitalCity').val().replace(/ /g, '+')
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#wikiSummaryCapital').html(result['data'][0]['summary']);
                $('#wikiCapitalLink').attr('href', result['data'][0]['wikipediaUrl']);

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });
});



var map = document.getElementById("map");
var mymap = L.map('map').setView([51.509, -0.118], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
