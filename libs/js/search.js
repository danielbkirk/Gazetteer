  var buttons = document.getElementsByClassName('navButton');
  var temp = document.getElementsByClassName('temp');


  $('#noCountryImageStatement').css('display', 'none');
  $('#noCapitalImageStatement').css('display', 'none');

  $('#countryInfoNav').click(function() {
    if (document.getElementById("information").style.display == "none") {
      document.getElementById("information").style.display = ""
    };

      document.getElementById("countryInfoDiv").style.display = "";
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
      document.getElementById("information").style.display = ""
    };

    document.getElementById("countryInfoDiv").style.display = "none";
    document.getElementById("newsDiv").style.display = "";
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
      document.getElementById("information").style.display = ""
    };
    document.getElementById("countryInfoDiv").style.display = "none";
    document.getElementById("newsDiv").style.display = "none";
    document.getElementById("exchangeRateDiv").style.display = "";
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
      document.getElementById("information").style.display = ""
    };

    document.getElementById("countryInfoDiv").style.display = "none";
    document.getElementById("newsDiv").style.display = "none";
    document.getElementById("exchangeRateDiv").style.display = "none";
    document.getElementById("weatherDiv").style.display = "";
    document.getElementById("wikiDiv").style.display = "none";
    document.getElementById("images").style.display = "none";

    for (var i = 0; i<buttons.length; i++){
      buttons[i].style.backgroundColor = "";
    };
    document.getElementById("weatherNav").style.backgroundColor = "LightSkyBlue";
  });

  $('#imageNav').click(function() {
    if (document.getElementById("information").style.display == "none") {
      document.getElementById("information").style.display = ""
    };

    document.getElementById("countryInfoDiv").style.display = "none";
    document.getElementById("newsDiv").style.display = "none";
    document.getElementById("exchangeRateDiv").style.display = "none";
    document.getElementById("weatherDiv").style.display = "none";
    document.getElementById("wikiDiv").style.display = "none";
    document.getElementById("images").style.display = "";

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
      document.getElementById("information").style.display = ""
    };

      document.getElementById("countryInfoDiv").style.display = "none";
      document.getElementById("newsDiv").style.display = "none";
      document.getElementById("exchangeRateDiv").style.display = "none";
      document.getElementById("weatherDiv").style.display = "none";
      document.getElementById("wikiDiv").style.display = "";
      document.getElementById("images").style.display = "none";

      for (var i = 0; i<buttons.length; i++){
        buttons[i].style.backgroundColor = "";
      };
      document.getElementById("wikiNav").style.backgroundColor = "LightSkyBlue";
  });

  $('#close').click(function() {
        document.getElementById("information").style.display = "none"
  });

  var map = document.getElementById("map");
  var mymap = L.map('map');
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
  }).addTo(mymap);

  var clusterGroup = L.markerClusterGroup();
  var pois = [];

  var layerGroup = new L.layerGroup();
  var myLayer = L.geoJSON().addTo(mymap);

  function compass(angle){
    switch(true) {
      case angle >= 337.5 || angle < 22.5:
        return 'N';
        break;

      case angle >=22.5 && angle < 67.5:
        return 'NE';
        break;

      case angle >= 67.5 && angle < 112.5:
        return 'E';
        break;

      case angle >= 112.5 && angle < 157.5:
        return 'SE';
        break;

      case angle >= 157.5 && angle < 202.5:
        return 'S';
        break;

      case angle >= 202.5 && angle < 247.5:
        return 'SW';
        break;

      case angle >= 247.5 && angle < 292.5:
        return 'W';
        break;

      case angle >= 292.5 && angle < 337.5:
        return 'NW';
        break;

      default:
        return 'Angle could not be found';
        break;
    }
  }

//fill <option>'s in <select>
$.ajax({
    url: "libs/php/options.php",
    type: 'POST',
    datatype: 'json',
    data: {
    },
    success: function (result) {
       console.log(result);


       if(result.status.name == 'ok') {

           var select = document.getElementById('countryList');
           var orderedCountires = result['data'].sort((a, b) => {
               if (a.properties.name > b.properties.name) {
                   return 1
               } else {
                   return -1
               }
           });

           for (var i = 0; i<orderedCountires.length; i++) {
               var opt = document.createElement('option');
               opt.value = orderedCountires[i]['properties']['iso_a2'];
               opt.innerHTML = orderedCountires[i]['properties']['name'];
               select.appendChild(opt);
           }

        };

    },
    error: function(jqXHR, textStatus, errorThrown) {
        var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
        alert('Error - ' + errorMessage);
    }

});
//on document load get users location and run code using users location and also select the country the user is in from <select>

$(document).ready(function() {
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

                    var iso = result['results'][0]['components']['ISO_3166-1_alpha-2'];
                    var sel = document.getElementById('countryList');

                    for (var i=0; i< sel.options.length; i++) {
                        if (sel.options[i].value == iso) {
                            sel.options[i].selected = true;

                            break;
                        }
                    }

                    //mymap.setView([position.coords.latitude, position.coords.longitude], 12);

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

});

//when user selects an <option> it then runs the code for that country
$('#countryList').change(function() {

    $('.data').html('');
    $('.link').attr('href', '');
    $('.img').attr('src', '');
    pois.length = 0;

    var country = $('#countryList option:selected').text();
    var code = $('#countryList option:selected').val();

    $('#country').html(country);
    $('#countryCode').html(code);

    step1(country, code);
});

function step1(country, code){

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

              console.log(layerGroup);
              mymap.removeLayer(layerGroup);

              layerGroup.addTo(mymap);
              layerGroup.addLayer(L.geoJSON(result['data']['border'],{style: myStyle}));
/*
              L.geoJSON(result['data']['border'],{
                    style: myStyle
                }).addTo(mymap);
*/
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

              $('#callingCode').html('+' + result['callingCode'][0]);
              $('.currencyName').html(result['currency'][0]['name']);
              $('.currencySymbol').html(result['currency'][0]['symbol']);
              $('#currencyCode').html(result['currency'][0]['code']);
              $('#languageSpoken').html(result['languages'][0]['name']);
              $('#countryFlag').attr('src', result['flagSRC']);
              $('#capitalCity').html(result['capitalCity']);
              $('#population').html(result['population']);
              $('#continent').html(result['continent']);

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
          country: (country).replace(/ /g, '+')
      },
      success: function (result) {

          console.log(result);

          if (result.status.name == 'ok') {
              if(result['article'].length == 0){

                  for (var i = 0; i< $('.countryNews').length; i++){
                    $('.countryNews')[i].style.display = "none";
                  };

                  $('#countryNewsTitle').css ('display', '');
                  $('#countryNewsTitle').html('News articles for ' + $('#countryList option:selected').text() + ' could not be found.');

              } else {
                  for(var i = 0; i< $('.countryNews').length; i++) {
                    if ($('.countryNews')[i].style.display == "none") {
                            $('.countryNews')[i].style.display = "";
                      };
                  }

                  var sumStr = result['article'][0]['content'];
                  var title = result['article'][0]['title'];
                  var publisher = result['article'][0]['source']['name'];
                  var newsLink = result['article'][0]['url'];


                  if(sumStr) {
                    var elip = sumStr.indexOf('…');
                    $('#countryNewsContent').html(sumStr.substring(0,elip+1));
                    $('#countryNewsLink').attr('href', result['article'][0]['url']);
                  } else {
                    $('#countryNewsContent').html('A summary of the article is not available.');
                    $('#countryNewsLink').attr('href', result['article'][0]['url']);
                  }

                  if(publisher) {
                      $('#countryNewsPublisher').html(publisher);
                  } else {
                      $('#countryNewsPublisher').html('Publisher unavailable');
                  }

                  if (title) {
                      $('#countryNewsTitle').html(title);
                  } else {
                      $('#countryNewsTitle').html('Title unavailable')
                  }

            }
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
            if(result['article'].length == 0){

                for (var i = 0; i< $('.covidNews').length; i++){
                  $('.covidNews')[i].style.display = "none";
                };

                $('#covidNewsTitle').css ('display', '');
                $('#covidNewsTitle').html('News articles for covid in ' + $('#countryList option:selected').text() + ' could not be found.');

            } else {
                for(var i = 0; i< $('.covidNews').length; i++) {
                  if ($('.covidNews')[i].style.display == "none") {
                          $('.covidNews')[i].style.display = "";
                    };
                }

                var sumStr = result['article'][0]['content'];
                var title = result['article'][0]['title'];
                var publisher = result['article'][0]['source']['name'];
                var newsLink = result['article'][0]['url'];


                if(sumStr) {
                  var elip = sumStr.indexOf('…');
                  $('#covidNewsContent').html(sumStr.substring(0,elip+1));
                  $('#covidNewsLink').attr('href', result['article'][0]['url']);
                } else {
                  $('#covidNewsContent').html('A summary of the article is not available.');
                  $('#covidNewsLink').attr('href', result['article'][0]['url']);
                }

                if(publisher) {
                    $('#covidNewsPublisher').html(publisher);
                } else {
                    $('#covidNewsPublisher').html('Publisher unavailable');
                }

                if (title) {
                    $('#covidNewsTitle').html(title);
                } else {
                    $('#covidNewsTitle').html('Title unavailable')
                }

          }
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
        if('.countryImg') {
          $('.countryImg').remove();
        }

        if('.countryAuthor') {
          $('.countryAuthor').remove();
        }

        var len = result['data'].length;
        if (len >= 5){
          $('#noCountryImageStatement').css('display', 'none');
          for (var i = 0; i < 5; i++){
            $('#noCountryImageStatement').after(function(){
              return '<img src="' + result['data'][i]['webformatURL']+'" class="img countryImg"/> <p class="data countryAuthor">By ' +result['data'][i]['user']+'</p>';
            });
          }
        } else if(len > 0) {
          $('#noCountryImageStatement').css('display', 'none');
          for (var i = 0; i < len; i++){
            $('#noCountryImageStatement').after(function(){
              return '<img src="' + result['data'][i]['webformatURL']+'" class="img countryImg"/> <p class="data countryAuthor">By ' +result['data'][i]['user']+'</p>';
            });
          }
        } else {
          $('#noCountryImageStatement').css('display', '');
          $('#noCountryImageStatement').html('No images could be found for ' + country);
        }

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
            country: (country).replace(/ /g, '+')
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
                $('#currentTemp').html(Math.round(parseFloat(result['main']['temp'])-273.15) + '&#8451;');
                $('#currentMaxTemp').html(Math.round(parseFloat(result['main']['temp_max'])-273.15) + '&#8451;');
                $('#currentMinTemp').html(Math.round(parseFloat(result['main']['temp_min'])-273.15));
                $('#humidity').html(result['main']['humidity'] + '%');
                $('#pressure').html(result['main']['pressure'] + 'mb');
                $('#feelsTemp').html(Math.round(parseFloat(result['main']['feels_like'])-273.15) + '&#8451;');

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
                $('#forecastTemp0').html(Math.round(parseFloat(result['list'][0]['main']['temp'])-273.15) + '&#8451;');
                $('#forecastMin0').html(Math.round(parseFloat(result['list'][0]['main']['temp_min'])-273.15));
                $('#forecastMax0').html(Math.round(parseFloat(result['list'][0]['main']['temp_max'])-273.15) + '&#8451;');
                $('#date0').html(result['list'][0]['dt_txt'].substring(5, 16));
                $('#humidity0').html(result['list'][0]['main']['humidity'] + '%');
                $('#pressure0').html(result['list'][0]['main']['pressure'] + 'mb');
                $('#feelsTemp0').html(Math.round(parseFloat(result['list'][0]['main']['feels_like'])-273.15) + '&#8451;');
                $('#windSpeed0').html(result['list'][0]['wind']['speed'] + 'mph');
                $('#windDirection0').html(compass(result['list'][0]['wind']['deg']));


                $('#weatherType1').html(result['list'][2]['weather'][0]['description']);
                $('#forecastTemp1').html(Math.round(parseFloat(result['list'][2]['main']['temp'])-273.15) + '&#8451;');
                $('#forecastMin1').html(Math.round(parseFloat(result['list'][2]['main']['temp_min'])-273.15));
                $('#forecastMax1').html(Math.round(parseFloat(result['list'][2]['main']['temp_max'])-273.15) + '&#8451;');
                $('#date1').html(result['list'][2]['dt_txt'].substring(5, 16));
                $('#humidity1').html(result['list'][2]['main']['humidity'] + '%');
                $('#pressure1').html(result['list'][2]['main']['pressure'] + 'mb');
                $('#feelsTemp1').html(Math.round(parseFloat(result['list'][2]['main']['feels_like'])-273.15) + '&#8451;');
                $('#windSpeed1').html(result['list'][2]['wind']['speed'] + 'mph');
                $('#windDirection1').html(compass(result['list'][2]['wind']['deg']));


                $('#weatherType2').html(result['list'][4]['weather'][0]['description']);
                $('#forecastTemp2').html(Math.round(parseFloat(result['list'][4]['main']['temp'])-273.15) + '&#8451;');
                $('#forecastMin2').html(Math.round(parseFloat(result['list'][4]['main']['temp_min'])-273.15));
                $('#forecastMax2').html(Math.round(parseFloat(result['list'][4]['main']['temp_max'])-273.15) + '&#8451;');
                $('#date2').html(result['list'][4]['dt_txt'].substring(5, 16));
                $('#humidity2').html(result['list'][4]['main']['humidity'] + '%');
                $('#pressure2').html(result['list'][4]['main']['pressure'] + 'mb');
                $('#feelsTemp2').html(Math.round(parseFloat(result['list'][4]['main']['feels_like'])-273.15) + '&#8451;');
                $('#windSpeed2').html(result['list'][4]['wind']['speed'] + 'mph');
                $('#windDirection2').html(compass(result['list'][4]['wind']['deg']));

                $('#weatherType3').html(result['list'][6]['weather'][0]['description']);
                $('#forecastTemp3').html(Math.round(parseFloat(result['list'][6]['main']['temp'])-273.15) + '&#8451;');
                $('#forecastMin3').html(Math.round(parseFloat(result['list'][6]['main']['temp_min'])-273.15));
                $('#forecastMax3').html(Math.round(parseFloat(result['list'][6]['main']['temp_max'])-273.15) + '&#8451;');
                $('#date3').html(result['list'][6]['dt_txt'].substring(5, 16));
                $('#humidity3').html(result['list'][6]['main']['humidity'] + '%');
                $('#pressure3').html(result['list'][6]['main']['pressure'] + 'mb');
                $('#feelsTemp3').html(Math.round(parseFloat(result['list'][6]['main']['feels_like'])-273.15) + '&#8451;');
                $('#windSpeed3').html(result['list'][6]['wind']['speed'] + 'mph');
                $('#windDirection3').html(compass(result['list'][6]['wind']['deg']));

                $('#weatherType4').html(result['list'][8]['weather'][0]['description']);
                $('#forecastTemp4').html(Math.round(parseFloat(result['list'][8]['main']['temp'])-273.15) + '&#8451;');
                $('#forecastMin4').html(Math.round(parseFloat(result['list'][8]['main']['temp_min'])-273.15));
                $('#forecastMax4').html(Math.round(parseFloat(result['list'][8]['main']['temp_max'])-273.15) + '&#8451;');
                $('#date4').html(result['list'][8]['dt_txt'].substring(5, 16));
                $('#humidity4').html(result['list'][8]['main']['humidity'] + '%');
                $('#pressure4').html(result['list'][8]['main']['pressure'] + 'mb');
                $('#feelsTemp4').html(Math.round(parseFloat(result['list'][8]['main']['feels_like'])-273.15) + '&#8451;');
                $('#windSpeed4').html(result['list'][8]['wind']['speed'] + 'mph');
                $('#windDirection4').html(compass(result['list'][8]['wind']['deg']));


                $('#weatherType5').html(result['list'][10]['weather'][0]['description']);
                $('#forecastTemp5').html(Math.round(parseFloat(result['list'][10]['main']['temp'])-273.15) + '&#8451;');
                $('#forecastMin5').html(Math.round(parseFloat(result['list'][10]['main']['temp_min'])-273.15));
                $('#forecastMax5').html(Math.round(parseFloat(result['list'][10]['main']['temp_max'])-273.15) + '&#8451;');
                $('#date5').html(result['list'][10]['dt_txt'].substring(5, 16));
                $('#humidity5').html(result['list'][10]['main']['humidity'] + '%');
                $('#pressure5').html(result['list'][10]['main']['pressure'] + 'mb');
                $('#feelsTemp5').html(Math.round(parseFloat(result['list'][10]['main']['feels_like'])-273.15) + '&#8451;');
                $('#windSpeed5').html(result['list'][10]['wind']['speed'] + 'mph');
                $('#windDirection5').html(compass(result['list'][10]['wind']['deg']));

                $('#weatherType6').html(result['list'][12]['weather'][0]['description']);
                $('#forecastTemp6').html(Math.round(parseFloat(result['list'][12]['main']['temp'])-273.15) + '&#8451;');
                $('#forecastMin6').html(Math.round(parseFloat(result['list'][12]['main']['temp_min'])-273.15));
                $('#forecastMax6').html(Math.round(parseFloat(result['list'][12]['main']['temp_max'])-273.15) + '&#8451;');
                $('#date6').html(result['list'][12]['dt_txt'].substring(5, 16));
                $('#humidity6').html(result['list'][12]['main']['humidity'] + '%');
                $('#pressure6').html(result['list'][12]['main']['pressure'] + 'mb');
                $('#feelsTemp6').html(Math.round(parseFloat(result['list'][12]['main']['feels_like'])-273.15) + '&#8451;');
                $('#windSpeed6').html(result['list'][12]['wind']['speed'] + 'mph');
                $('#windDirection6').html(compass(result['list'][12]['wind']['deg']));


                $('#weatherType7').html(result['list'][14]['weather'][0]['description']);
                $('#forecastTemp7').html(Math.round(parseFloat(result['list'][14]['main']['temp'])-273.15) + '&#8451;');
                $('#forecastMin7').html(Math.round(parseFloat(result['list'][14]['main']['temp_min'])-273.15));
                $('#forecastMax7').html(Math.round(parseFloat(result['list'][14]['main']['temp_max'])-273.15) + '&#8451;');
                $('#date7').html(result['list'][14]['dt_txt'].substring(5, 16));
                $('#humidity7').html(result['list'][14]['main']['humidity'] + '%');
                $('#pressure7').html(result['list'][14]['main']['pressure'] + 'mb');
                $('#feelsTemp7').html(Math.round(parseFloat(result['list'][14]['main']['feels_like'])-273.15) + '&#8451;');
                $('#windSpeed7').html(result['list'][14]['wind']['speed'] + 'mph');
                $('#windDirection7').html(compass(result['list'][14]['wind']['deg']));

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

                switch(currency) {
                    case "USD":

                            $('#usdExchangeRate').css('display', 'none');
                            $('#gbpExchangeRate').css('display', '');
                            $('#eurExchangeRate').css('display', '');
                            $('#jpyExchangeRate').css('display', '');

                            $('#gbpRate').html(parseFloat(result['rates']['GBP']).toFixed(2));
                            $('#eurRate').html(parseFloat(result['rates']['EUR']).toFixed(2));
                            $('#jpyRate').html(parseFloat(result['rates']['JPY']).toFixed(2));

                            break;
                    case "GBP":

                        $('#usdExchangeRate').css('display', '');
                        $('#gbpExchangeRate').css('display', 'none');
                        $('#eurExchangeRate').css('display', '');
                        $('#jpyExchangeRate').css('display', '');

                        $('#usdRate').html(parseFloat(result['rates']['USD']).toFixed(2));
                        $('#eurRate').html(parseFloat(result['rates']['EUR']).toFixed(2));
                        $('#jpyRate').html(parseFloat(result['rates']['JPY']).toFixed(2));
                        break;
                    case "EUR":
                        $('#usdExchangeRate').css('display', '');
                        $('#gbpExchangeRate').css('display', '');
                        $('#eurExchangeRate').css('display', 'none');
                        $('#jpyExchangeRate').css('display', '');

                        $('#usdRate').html(parseFloat(result['rates']['USD']).toFixed(2));
                        $('#gbpRate').html(parseFloat(result['rates']['GBP']).toFixed(2));
                        $('#jpyRate').html(parseFloat(result['rates']['JPY']).toFixed(2));
                        break;

                    case "JPY":
                        $('#usdExchangeRate').css('display', '');
                        $('#gbpExchangeRate').css('display', '');
                        $('#eurExchangeRate').css('display', '');
                        $('#jpyExchangeRate').css('display', 'none');

                        $('#usdRate').html(parseFloat(result['rates']['USD']).toFixed(2));
                        $('#gbpRate').html(parseFloat(result['rates']['GBP']).toFixed(2));
                        $('#eurRate').html(parseFloat(result['rates']['EUR']).toFixed(2));
                        break;
                    default:
                        $('#usdExchangeRate').css('display', '');
                        $('#gbpExchangeRate').css('display', '');
                        $('#eurExchangeRate').css('display', '');
                        $('#jpyExchangeRate').css('display', '');

                        $('#usdRate').html(parseFloat(result['rates']['USD']).toFixed(2));
                        $('#gbpRate').html(parseFloat(result['rates']['GBP']).toFixed(2));
                        $('#eurRate').html(parseFloat(result['rates']['EUR']).toFixed(2));
                        $('#jpyRate').html(parseFloat(result['rates']['JPY']).toFixed(2));
                        break;
                }

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
            capital: (capital).replace(/ /g, '+'),
            countryCode: code
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {
              if(result['article'].length == 0){

                  for (var i = 0; i< $('.capitalNews').length; i++){
                    $('.capitalNews')[i].style.display = "none";
                  };

                  $('#capitalNewsTitle').css ('display', '');
                  $('#capitalNewsTitle').html('News articles for ' + capital + ' could not be found.');

              } else {
                  for(var i = 0; i< $('.capitalNews').length; i++) {
                    if ($('.capitalNews')[i].style.display == "none") {
                            $('.capitalNews')[i].style.display = "";
                      };
                  }

                  var sumStr = result['article'][0]['content'];
                  var title = result['article'][0]['title'];
                  var publisher = result['article'][0]['source']['name'];
                  var newsLink = result['article'][0]['url'];


                  if(sumStr) {
                    var elip = sumStr.indexOf('…');
                    $('#capitalNewsContent').html(sumStr.substring(0,elip+1));
                    $('#capitalNewsLink').attr('href', result['article'][0]['url']);
                  } else {
                    $('#capitalNewsContent').html('A summary of the article is not available.');
                    $('#capitalNewsLink').attr('href', result['article'][0]['url']);
                  }

                  if(publisher) {
                      $('#capitalNewsPublisher').html(publisher);
                  } else {
                      $('#capitalNewsPublisher').html('Publisher unavailable');
                  }

                  if (title) {
                      $('#capitalNewsTitle').html(title);
                  } else {
                      $('#capitalNewsTitle').html('Title unavailable')
                  }

              }
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
          if('.capitalImg') {
            $('.capitalImg').remove();
          }

          if('.capitalAuthor') {
            $('.capitalAuthor').remove();
          }

          var len = result['data'].length;
          if (len >= 5){
            $('#noCapitalImageStatement').css('display', 'none');
            for (var i = 0; i < 5; i++){
              $('#noCapitalImageStatement').after(function(){
                return '<img src="' + result['data'][i]['webformatURL'] + '" class="img capitalImg"/> <p class="data capitalAuthor">By ' + result['data'][i]['user'] + '</p>';
              });
            }
          } else if(len > 0) {
            $('#noCapitalImageStatement').css('display', 'none');
            for (var i = 0; i < len; i++){
              $('#noCapitalImageStatement').after(function(){
                return '<img src="' + result['data'][i]['webformatURL'] + '" class="img capitalImg"/> <p class="data capitalAuthor">By ' + result['data'][i]['user'] + '</p>';
              });
            }
          } else {
            $('#noCapitalImageStatement').css('display', '');
            $('#noCapitalImageStatement').html('No images could be found for ' + capital);
          }
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

                var capMarker = {
                        "type" : "Feature",
                        "properties" : {
                            "name" : capital,
                            "amenity" : "Capital City",
                            "popupContent": "This is the capital city of "

                        },
                        "geometry" : {
                            "type": "Point",
                            "coordinates": [result['data'][0]['lng'], result['data'][0]['lat']]
                        }
                };

                var myLayer = L.geoJson(undefined, {
                     style: function (feature) {
                         return feature.properties.style;
                     },
                     onEachFeature: function (feature, layer) {
                         layer.bindPopup(feature.properties.name);
                     }
                 })

                 markers.addLayer(myLayer);


                 myLayer.addData(capMarker);
                myLayer.addTo(mymap);

                //L.geoJSON(capMarker).addTo(mymap);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });

    $.ajax({
        url: 'libs/php/poiWiki.php',
        type: 'POST',
        datatype: 'json',
        data: {
            code: code
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                for(var i = 0; i < result['data'].length; i++){
                    if (result['data'][i]['title'] != capital) {
                        var marker = {
                                "type" : "Feature",
                                "properties" : {
                                    "name" : result['data'][i]['title'],
                                    "amenity" : "Point of Interest",
                                    "popupContent": result['data'][i]['summary']

                                },
                                "geometry" : {
                                    "type": "Point",
                                    "coordinates": [result['data'][i]['lng'], result['data'][i]['lat']]
                                }
                        };

                        var myLayer = L.geoJson(undefined, {
                             style: function (feature) {
                                 return feature.properties.style;
                             },
                             onEachFeature: function (feature, layer) {
                                 layer.bindPopup('<h6>' + feature.properties.name + '</h6><p>'+ feature.properties.popupContent.substring(0, 200) +'... <a target="_blank" href="https://' + result['data'][i]['wikipediaUrl'] +'">read more</a></p>');
                             }
                         })

                         myLayer.addData(marker);
                        myLayer.addTo(mymap);

                        //L.geoJSON(marker).addTo(mymap);
                    }
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });
};
