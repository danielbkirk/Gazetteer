  var buttons = document.getElementsByClassName('navButton');
  var temp = document.getElementsByClassName('temp');


$('#countryInfoNav').click(function() {
  if (document.getElementById("information").style.display == "none") {
    document.getElementById("information").style.display = "block"
  };

    document.getElementById("countryInfoDiv").style.display = "block";
    document.getElementById("newsDiv").style.display = "none";
    document.getElementById("exchangeRateDiv").style.display = "none";
    document.getElementById("weatherDiv").style.display = "none";
    document.getElementById("wikiDiv").style.display = "none";
    document.getElementById("images").style.display = "none";

    for (var i = 0; i<buttons.length; i++){
      buttons[i].style.backgroundColor = "";
    };
    document.getElementById("countryInfoNav").style.backgroundColor = "LightSkyBlue";
});

$('#newsNav').click(function() {
  if (document.getElementById("information").style.display == "none") {
    document.getElementById("information").style.display = "block"
  };

  document.getElementById("countryInfoDiv").style.display = "none";
  document.getElementById("newsDiv").style.display = "block";
  document.getElementById("exchangeRateDiv").style.display = "none";
  document.getElementById("weatherDiv").style.display = "none";
  document.getElementById("wikiDiv").style.display = "none";
  document.getElementById("images").style.display = "none";

  for (var i = 0; i<buttons.length; i++){
    buttons[i].style.backgroundColor = "";
  };
  document.getElementById("newsNav").style.backgroundColor = "LightSkyBlue";
});

$('#exchangeRatesNav').click(function() {
  if (document.getElementById("information").style.display == "none") {
    document.getElementById("information").style.display = "block"
  };
  switch (document.getElementById("currencyCode").innerHTML) {
      case "GBP":
        document.getElementById("gbpExchangeRate").style.display = "none";
        break;

      case "USD":
        document.getElementById("usdExchangeRate").style.display = "none";
        break;

      case "EUR":
        document.getElementById("eurExchangeRate").style.display = "none";
        break;

      case "JPY":
        document.getElementById("jpyExchangeRate").style.display = "none";
        break;

      default:
        break;
  };

  document.getElementById("countryInfoDiv").style.display = "none";
  document.getElementById("newsDiv").style.display = "none";
  document.getElementById("exchangeRateDiv").style.display = "block";
  document.getElementById("weatherDiv").style.display = "none";
  document.getElementById("wikiDiv").style.display = "none";
  document.getElementById("images").style.display = "none";

  for (var i = 0; i<buttons.length; i++){
    buttons[i].style.backgroundColor = "";
  };
  document.getElementById("exchangeRatesNav").style.backgroundColor = "LightSkyBlue";
});

$('#weatherNav').click(function() {
  if (document.getElementById("information").style.display == "none") {
    document.getElementById("information").style.display = "block"
  };

  document.getElementById("countryInfoDiv").style.display = "none";
  document.getElementById("newsDiv").style.display = "none";
  document.getElementById("exchangeRateDiv").style.display = "none";
  document.getElementById("weatherDiv").style.display = "block";
  document.getElementById("wikiDiv").style.display = "none";
  document.getElementById("images").style.display = "none";

  for (var i = 0; i<buttons.length; i++){
    buttons[i].style.backgroundColor = "";
  };
  document.getElementById("weatherNav").style.backgroundColor = "LightSkyBlue";
});

$('#imageNav').click(function() {
  if (document.getElementById("information").style.display == "none") {
    document.getElementById("information").style.display = "block"
  };

  document.getElementById("countryInfoDiv").style.display = "none";
  document.getElementById("newsDiv").style.display = "none";
  document.getElementById("exchangeRateDiv").style.display = "none";
  document.getElementById("weatherDiv").style.display = "none";
  document.getElementById("wikiDiv").style.display = "none";
  document.getElementById("images").style.display = "block";

  for (var i = 0; i<buttons.length; i++){
    buttons[i].style.backgroundColor = "";
  };
  document.getElementById("imageNav").style.backgroundColor = "LightSkyBlue";
});

$('#close').click(function() {
  document.getElementById("information").style.display = 'none';
  for (var i = 0; i<buttons.length; i++){
    buttons[i].style.backgroundColor = "";
  };
});

$('#wikiNav').click(function() {
  if (document.getElementById("information").style.display == "none") {
    document.getElementById("information").style.display = "block"
  };

    document.getElementById("countryInfoDiv").style.display = "none";
    document.getElementById("newsDiv").style.display = "none";
    document.getElementById("exchangeRateDiv").style.display = "none";
    document.getElementById("weatherDiv").style.display = "none";
    document.getElementById("wikiDiv").style.display = "block";
    document.getElementById("images").style.display = "none";

    for (var i = 0; i<buttons.length; i++){
      buttons[i].style.backgroundColor = "";
    };
    document.getElementById("wikiNav").style.backgroundColor = "LightSkyBlue";
});

var map = document.getElementById("map");
var mymap = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


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


            if(result.status.name == 'ok') {

                $('#country').html(result['results'][0]['components']['country']);
                $('#countryCode').html(result['results'][0]['components']['ISO_3166-1_alpha-2']);
                $('#iso3Code').html(result['results'][0]['components']['ISO_3166-1_alpha-3']);
                $('#continent').html(result['results'][0]['components']['continent']);

                mymap.setView([position.coords.latitude, position.coords.longitude], 12);

                step1(result['results'][0]['components']['country'],result['results'][0]['components']['ISO_3166-1_alpha-2']);
             };

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

function step1(country, code){
  document.getElementById("countryInfoNav").click();

  $.ajax({
      url: "libs/php/countryBorder.php",
      type: 'POST',
      datatype: 'json',
      data: {
          countryCode: code
      },
      success: function(result) {
          console.log(result);

          if (result.status.name == 'ok') {


              var myStyle ={
                  'color': 'red',
                  'weight': 3,
                  'opacity': 0.5,
                  'fillOpacity': 0
              };

              L.geoJSON(result['data']['border'],{
                  style: myStyle
              }).addTo(mymap);

              var bounds = L.geoJSON(result['data']['border']);

              mymap.fitBounds(bounds.getBounds());
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
          countryCode: code
      },
      success: function (result) {
          console.log(result);

          if (result.status.name == 'ok') {

              $('#callingCode').html(result['callingCode'][0]);
              $('.currencyName').html(result['currency'][0]['name']);
              $('.currencySymbol').html(result['currency'][0]['symbol']);
              $('#currencyCode').html(result['currency'][0]['code']);
              $('#languageSpoken').html(result['languages'][0]['name']);
              $('#countryFlag').attr('src', result['flagSRC']);
              $('#capitalCity').html(result['capitalCity']);
              $('#population').html(result['population']);

              step2(result['capitalCity'], result['currency'][0]['code'], code);

          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
          alert('Error - ' + errorMessage);
      }
  });

  $.ajax({
      url: 'libs/php/newsCountry.php',
      type: 'POST',
      datatype: 'json',
      data: {
          countryCode: code
      },
      success: function (result) {

          console.log(result);

          if (result.status.name == 'ok') {

              $('#countryNewsTitle').html(result['article'][0]['title']);
              $('#countryNewsContent').html(result['article'][0]['content']);
              $('#countryNewsPublisher').html(result['article'][0]['source']['name']);
              $('#countryNewsLink').attr('href', result['article'][0]['url']);
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
          alert('Error - ' + errorMessage);
      }
  });

  $.ajax({
      url: 'libs/php/newsCovid.php',
      type: 'POST',
      datatype: 'json',
      data: {
          countryCode: code
      },
      success: function (result) {

          console.log(result);

          if (result.status.name == 'ok') {

              $('#covidNewsTitle').html(result['article'][0]['title']);
              $('#covidNewsContent').html(result['article'][0]['content']);
              $('#covidNewsPublisher').html(result['article'][0]['source']['name']);
              $('#covidNewsLink').attr('href', result['article'][0]['url']);
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
          alert('Error - ' + errorMessage);
      }
  });

    $.ajax({
    url: 'libs/php/countryImages.php',
    type: 'POST',
    datatype: 'json',
    data: {
      country: (country).replace(/ /g, '+')
    },
    success: function (result) {

      console.log(result);

      if (result.status.name == 'ok') {

          $('#countryImage1').attr('src', result['data'][0]['webformatURL']);
          $('#countryImage2').attr('src', result['data'][1]['webformatURL']);
          $('#countryImage3').attr('src', result['data'][2]['webformatURL']);
          $('#countryImage4').attr('src', result['data'][3]['webformatURL']);
          $('#countryImage5').attr('src', result['data'][4]['webformatURL']);

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
      alert('Error - ' + errorMessage);
    }
    });

    $.ajax({
        url: 'libs/php/wikiCountry.php',
        type: 'POST',
        datatype: 'json',
        data: {
            country: (country).replace(/ /g, '%20')
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#countryWikiTitle').html(result['data'][0]['title']);
                $('#countryWikiSummary').html(result['data'][0]['summary']);
                $('#countryWikiLink').attr('href','https://' +  result['data'][0]['wikipediaUrl']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

};

function step2(capital, currency, code) {
    $.ajax({
        url: "libs/php/currentWeather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            capital: (capital).replace(/ /g, '+')
        },
        success: function (result) {
            console.log(result);

            if (result.status.name == 'ok') {

                $('#currentWeatherType').html(result['weather'][0]['description']);
                $('#currentTemp').html(Math.round(parseFloat(result['main']['temp'])-273.15));
                $('#currentMaxTemp').html(Math.round(parseFloat(result['main']['temp_min'])-273.15));
                $('#currentMinTemp').html(Math.round(parseFloat(result['main']['temp_max'])-273.15));

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
            capital: (capital).replace(/ /g, '+')
        },
        success: function (result) {
            console.log(result);

            if (result.status.name == 'ok') {

                $('#weatherType0').html(result['list'][0]['weather'][0]['description']);
                $('#forecastTemp0').html(Math.round(parseFloat(result['list'][0]['main']['temp'])-273.15));
                $('#forecastMin0').html(Math.round(parseFloat(result['list'][0]['main']['temp_min'])-273.15));
                $('#forecastMax0').html(Math.round(parseFloat(result['list'][0]['main']['temp_max'])-273.15));

                $('#weatherType1').html(result['list'][2]['weather'][0]['description']);
                $('#forecastTemp1').html(Math.round(parseFloat(result['list'][2]['main']['temp'])-273.15));
                $('#forecastMin1').html(Math.round(parseFloat(result['list'][2]['main']['temp_min'])-273.15));
                $('#forecastMax1').html(Math.round(parseFloat(result['list'][2]['main']['temp_max'])-273.15));

                $('#weatherType2').html(result['list'][4]['weather'][0]['description']);
                $('#forecastTemp2').html(Math.round(parseFloat(result['list'][4]['main']['temp'])-273.15));
                $('#forecastMin2').html(Math.round(parseFloat(result['list'][4]['main']['temp_min'])-273.15));
                $('#forecastMax2').html(Math.round(parseFloat(result['list'][4]['main']['temp_max'])-273.15));

                $('#weatherType3').html(result['list'][6]['weather'][0]['description']);
                $('#forecastTemp3').html(Math.round(parseFloat(result['list'][6]['main']['temp'])-273.15));
                $('#forecastMin3').html(Math.round(parseFloat(result['list'][6]['main']['temp_min'])-273.15));
                $('#forecastMax3').html(Math.round(parseFloat(result['list'][6]['main']['temp_max'])-273.15));

                $('#weatherType4').html(result['list'][8]['weather'][0]['description']);
                $('#forecastTemp4').html(Math.round(parseFloat(result['list'][8]['main']['temp'])-273.15));
                $('#forecastMin4').html(Math.round(parseFloat(result['list'][8]['main']['temp_min'])-273.15));
                $('#forecastMax4').html(Math.round(parseFloat(result['list'][8]['main']['temp_max'])-273.15));

                $('#weatherType5').html(result['list'][10]['weather'][0]['description']);
                $('#forecastTemp5').html(Math.round(parseFloat(result['list'][10]['main']['temp'])-273.15));
                $('#forecastMin5').html(Math.round(parseFloat(result['list'][10]['main']['temp_min'])-273.15));
                $('#forecastMax5').html(Math.round(parseFloat(result['list'][10]['main']['temp_max'])-273.15));

                $('#weatherType6').html(result['list'][12]['weather'][0]['description']);
                $('#forecastTemp6').html(Math.round(parseFloat(result['list'][12]['main']['temp'])-273.15));
                $('#forecastMin6').html(Math.round(parseFloat(result['list'][12]['main']['temp_min'])-273.15));
                $('#forecastMax6').html(Math.round(parseFloat(result['list'][12]['main']['temp_max'])-273.15));

                $('#weatherType7').html(result['list'][14]['weather'][0]['description']);
                $('#forecastTemp7').html(Math.round(parseFloat(result['list'][14]['main']['temp'])-273.15));
                $('#forecastMin7').html(Math.round(parseFloat(result['list'][14]['main']['temp_min'])-273.15));
                $('#forecastMax7').html(Math.round(parseFloat(result['list'][14]['main']['temp_max'])-273.15));

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
            currencyCode: currency
        },
        success: function (result) {
            console.log(result);

            if (result.status.name == 'ok') {

                $('#usdRate').html(parseFloat(result['rates']['USD']).toFixed(2));
                $('#gbpRate').html(parseFloat(result['rates']['GBP']).toFixed(2));
                $('#eurRate').html(parseFloat(result['rates']['EUR']).toFixed(2));
                $('#jpyRate').html(parseFloat(result['rates']['JPY']).toFixed(2));

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: 'libs/php/newsCapital.php',
        type: 'POST',
        datatype: 'json',
        data: {
            capital: (capital).replace(/ /g, '+')
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#capitalNewsTitle').html(result['article'][0]['title']);
                $('#capitalNewsContent').html(result['article'][0]['content']);
                $('#capitalNewsPublisher').html(result['article'][0]['source']['name']);
                $('#capitalNewsLink').attr('href', result['article'][0]['url']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
    url: 'libs/php/capitalImages.php',
    type: 'POST',
    datatype: 'json',
    data: {
      capital: (capital).replace(/ /g, '+')
    },
    success: function (result) {

      console.log(result);

      if (result.status.name == 'ok') {

          $('#capitalImage1').attr('src', result['data'][0]['webformatURL']);
          $('#capitalImage2').attr('src', result['data'][1]['webformatURL']);
          $('#capitalImage3').attr('src', result['data'][2]['webformatURL']);
          $('#capitalImage4').attr('src', result['data'][3]['webformatURL']);
          $('#capitalImage5').attr('src', result['data'][4]['webformatURL']);

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
      alert('Error - ' + errorMessage);
    }
    });

    $.ajax({
        url: 'libs/php/wikiCapital.php',
        type: 'POST',
        datatype: 'json',
        data: {
            capital: (capital).replace(/ /g, '+'),
            code: code
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#capitalWikiTitle').html(result['data'][0]['title']);
                $('#capitalWikiSummary').html(result['data'][0]['summary']);
                $('#capitalWikiLink').attr('href','https://' + result['data'][0]['wikipediaUrl']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });
};
