$(window).on('load', function () {
  if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="modal"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


  $('#noCountryImageStatement').css('display', 'none');
  $('#noCapitalImageStatement').css('display', 'none');

  var capitalMarkerIcon = L.ExtraMarkers.icon({
      icon: 'bi bi-star-fill',
      markerColor: 'yellow',
      shape: 'star',
      prefix: 'bi'
  });

  var markerIcon= L.ExtraMarkers.icon({
      icon: 'bi bi-question-lg',
      markerColor: 'cyan',
      shape: 'star',
      prefix: 'bi'
  });

  var WSM = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
  });

  var EWTM = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

  var OSM = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


  var map = document.getElementById("map");
  var mymap = L.map('map',{
      layers: [WSM]
  });

  var baseLayers = {
      "World Street Map": WSM,
      "Dutch": OSM,
      "Plain": EWTM
  };

  var borderCoords = [];
  var markers = L.markerClusterGroup({maxClusterRadius: 45});

  var overlays = {
      "Markers": markers,
  };

  layerControl = L.control.layers(baseLayers, overlays, {position:'bottomright'}).addTo(mymap);

  mymap.setMaxBounds([[-90,-180],[90,180]]);
  mymap.setMinZoom(3);



  function twoDecimals(n) {
  var log10 = n ? Math.floor(Math.log10(n)) : 0,
      div = log10 < 0 ? Math.pow(10, 1 - log10) : 100;

  return Math.round(n * div) / div;
}


function population(n){
    if (n  < 1000000000){
        return (n/1000000).toPrecision(3) + ' Million';
    } else {
        return (n/1000000000).toPrecision(3) + ' Billion';
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

                    $('.country').html(result['results'][0]['components']['country']);
                    $('#countryCode').html(result['results'][0]['components']['ISO_3166-1_alpha-2']);

                    var iso = result['results'][0]['components']['ISO_3166-1_alpha-2'];
                    var sel = document.getElementById('countryList');

                    for (var i=0; i< sel.options.length; i++) {
                        if (sel.options[i].value == iso) {
                            sel.options[i].selected = true;

                            break;
                        }
                    }

                    step1(result['results'][0]['components']['country'],result['results'][0]['components']['ISO_3166-1_alpha-2']);

                    $('#time').val("current").change();
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

    mymap.removeLayer(markers);
    markers = L.markerClusterGroup({maxClusterRadius: 45});
    mymap.removeLayer(border);
    borderCoords.length = 0;
    layerControl.removeLayer(capM);



    var country = $('#countryList option:selected').text();
    var code = $('#countryList option:selected').val();

    $('.country').html(country);
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

              borderCoords.push(L.geoJSON(result['data']['border'],{style: myStyle}));

              border = L.featureGroup(borderCoords);
              border.addTo(mymap);

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
              $('.capitalCity').html(result['capitalCity']);
              $('#population').html(population(parseInt(result['population'])));
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

                  $('#countryNewsTitle').css('display', '');
                  $('#countryNewsLink').html('<b>News articles for ' + $('#countryList option:selected').text() + ' could not be found.</b>');

              } else {
                  for(var i = 0; i< $('.countryNews').length; i++) {
                    if ($('.countryNews')[i].style.display == "none") {
                            $('.countryNews')[i].style.display = "";
                      };
                  }

                  var sumStr = result['article'][0]['content'];
                  var title = result['article'][0]['title'];
                  var newsLink = result['article'][0]['url'];


                  if(sumStr) {
                    var elip = sumStr.indexOf('…');
                    $('#countryNewsContent').html(sumStr.substring(0,elip+1));
                    $('#countryNewsLink').attr('href', result['article'][0]['url']);
                  } else {
                    $('#countryNewsContent').html('A summary of the article is not available.');
                    $('#countryNewsLink').attr('href', result['article'][0]['url']);
                  }

                  if (title) {
                      $('#countryNewsLink').html('<b>' + title + '</b>');
                  } else {
                      $('#countryNewsLink').html('Title unavailable')
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
                $('#covidNewsLink').html('<b>News articles for covid in ' + $('#countryList option:selected').text() + ' could not be found.</b>');

            } else {
                for(var i = 0; i< $('.covidNews').length; i++) {
                  if ($('.covidNews')[i].style.display == "none") {
                          $('.covidNews')[i].style.display = "";
                    };
                }

                var sumStr = result['article'][0]['content'];
                var title = result['article'][0]['title'];
                var newsLink = result['article'][0]['url'];


                if(sumStr) {
                  var elip = sumStr.indexOf('…');
                  $('#covidNewsContent').html(sumStr.substring(0,elip+1));
                  $('#covidNewsLink').attr('href', result['article'][0]['url']);
                } else {
                  $('#covidNewsContent').html('A summary of the article is not available.');
                  $('#covidNewsLink').attr('href', result['article'][0]['url']);
                }

                if (title) {
                    $('#covidNewsLink').html('<b>' + title + '</b>');
                } else {
                    $('#covidNewsLink').html('Title unavailable')
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
          $('#noCountryImageStatement').html('<b>No images could be found for ' + country + '</b>');
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
            country: (country).replace(/ /g, '+'),
            code: code
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#countryWikiSummary').html((result['data'][0]['summary']).replace("(...)", ""));
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
        url: 'libs/php/exchangeRate.php',
        type: 'POST',
        dataType: 'json',
        data: {
            currencyCode: currency
        },
        success: function (result) {
            console.log(result);

            if (result.status.name == 'ok') {

                $('.exchangeRateData').remove();

                switch(currency) {
                    case "USD":

                        $('<tr class="exchangeRateData" ><td> JPY  &#165;' + twoDecimals(parseFloat(result['response']['rates']['JPY'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> EUR  €' + twoDecimals(parseFloat(result['response']['rates']['EUR'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> GBP  £' + twoDecimals(parseFloat(result['response']['rates']['GBP'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                            break;
                    case "GBP":

                        $('<tr class="exchangeRateData" ><td> JPY  &#165;' + twoDecimals(parseFloat(result['response']['rates']['JPY'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> EUR  €' + twoDecimals(parseFloat(result['response']['rates']['EUR'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> USD  $' + twoDecimals(parseFloat(result['response']['rates']['USD'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        break;
                    case "EUR":

                        $('<tr class="exchangeRateData" ><td> JPY  &#165;' + twoDecimals(parseFloat(result['response']['rates']['JPY'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> GBP  £' + twoDecimals(parseFloat(result['response']['rates']['GBP'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> USD  $' + twoDecimals(parseFloat(result['response']['rates']['USD'])) + '</td></tr>').insertAfter($('#baseCurrency'));
                        break;

                    case "JPY":

                        $('<tr class="exchangeRateData" ><td> EUR  €' + twoDecimals(parseFloat(result['response']['rates']['EUR'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> GBP  £' + twoDecimals(parseFloat(result['response']['rates']['GBP'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> USD  $' + twoDecimals(parseFloat(result['response']['rates']['USD'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        break;
                    default:
                        $('<tr class="exchangeRateData" ><td> JPY  &#165;' + twoDecimals(parseFloat(result['response']['rates']['JPY'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> EUR  €' + twoDecimals(parseFloat(result['response']['rates']['EUR'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> GBP  £' + twoDecimals(parseFloat(result['response']['rates']['GBP'])) + '</td></tr>').insertAfter($('#baseCurrency'));

                        $('<tr class="exchangeRateData" ><td> USD  $' + twoDecimals(parseFloat(result['response']['rates']['USD'])) + '</td></tr>').insertAfter($('#baseCurrency'));

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
                  $('#capitalNewsLink').html('<b>News articles for ' + capital + ' could not be found.</b>');

              } else {
                  for(var i = 0; i< $('.capitalNews').length; i++) {
                    if ($('.capitalNews')[i].style.display == "none") {
                            $('.capitalNews')[i].style.display = "";
                      };
                  }

                  var sumStr = result['article'][0]['content'];
                  var title = result['article'][0]['title'];
                  var newsLink = result['article'][0]['url'];


                  if(sumStr) {
                    var elip = sumStr.indexOf('…');
                    $('#capitalNewsContent').html(sumStr.substring(0,elip+1));
                    $('#capitalNewsLink').attr('href', result['article'][0]['url']);
                  } else {
                    $('#capitalNewsContent').html('A summary of the article is not available.');
                    $('#capitalNewsLink').attr('href', result['article'][0]['url']);
                  }

                  if (title) {
                      $('#capitalNewsTitle').html('<b>' + title + '</b>');
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
            $('#noCapitalImageStatement').html('<b>No images could be found for ' + capital + '</b>');
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

                var capLat = result['data'][0]['lat'];
                var capLng = result['data'][0]['lng'];

                 capM = L.marker(new L.LatLng(capLat, capLng), {icon: capitalMarkerIcon}).bindPopup('<h6>' + result['data'][0]['title'] + '</h6><p>'+ result['data'][0]['summary'].substring(0, 200) +'... <a target="_blank" href="https://' + result['data'][0]['wikipediaUrl'] +'">read more</a></p>');

                 markers.addLayer(capM);
                 mymap.addLayer(markers);
                 layerControl.addOverlay(capM, "Capital City");

                 weatherRequest(capLat, capLng);
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

                        var marker = L.marker(new L.LatLng(result['data'][i]['lat'], result['data'][i]['lng']), {icon: markerIcon}).bindPopup('<h6>' + result['data'][i]['title'] + '</h6><p>'+ result['data'][i]['summary'].substring(0, 200) +'... <a target="_blank" href="https://' + result['data'][i]['wikipediaUrl'] +'">read more</a></p>');

                        markers.addLayer(marker);
                        mymap.addLayer(markers);
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

function weatherRequest(lat, lng) {
    $.ajax({
        url: 'libs/php/fiveDayForecast.php',
        type: 'POST',
        datatype: 'json',
        data: {
            lat: lat,
            lng: lng
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == 'ok') {

                $('#weatherDescription').html(result['daily'][0]['weather'][0]['description']);
                $('#highTemp0').html(Math.round(parseFloat(result['daily'][0]['temp']['max'])-273.15) + '&#8451;');
                $('#lowTemp0').html(Math.round(parseFloat(result['daily'][0]['temp']['min'])-273.15) + '&#8451;');
                $('#weatherIcon0').attr('src', 'http://openweathermap.org/img/wn/'+ result['daily'][0]['weather'][0]['icon'] +'@2x.png');

                $('#day1').html(new Date( result['daily'][1]['dt'] * 1000).toLocaleDateString('en-GB', { weekday: 'long' }));
                $('#highTemp1').html(Math.round(parseFloat(result['daily'][1]['temp']['max'])-273.15) + '&#8451;');
                $('#lowTemp1').html(Math.round(parseFloat(result['daily'][1]['temp']['min'])-273.15) + '&#8451;');
                $('#weatherIcon1').attr('src', 'http://openweathermap.org/img/wn/'+ result['daily'][1]['weather'][0]['icon'] +'@2x.png');


                $('#day2').html(new Date( result['daily'][2]['dt'] * 1000).toLocaleDateString('en-GB', { weekday: 'long' }));
                $('#highTemp2').html(Math.round(parseFloat(result['daily'][2]['temp']['max'])-273.15) + '&#8451;');
                $('#lowTemp2').html(Math.round(parseFloat(result['daily'][2]['temp']['min'])-273.15) + '&#8451;');
                $('#weatherIcon2').attr('src', 'http://openweathermap.org/img/wn/'+ result['daily'][2]['weather'][0]['icon'] +'@2x.png');


                $('#day3').html(new Date( result['daily'][3]['dt'] * 1000).toLocaleDateString('en-GB', { weekday: 'long' }));
                $('#highTemp3').html(Math.round(parseFloat(result['daily'][3]['temp']['max'])-273.15) + '&#8451;');
                $('#lowTemp3').html(Math.round(parseFloat(result['daily'][3]['temp']['min'])-273.15) + '&#8451;');
                $('#weatherIcon3').attr('src', 'http://openweathermap.org/img/wn/'+ result['daily'][3]['weather'][0]['icon'] +'@2x.png');


                $('#day4').html(new Date( result['daily'][4]['dt'] * 1000).toLocaleDateString('en-GB', { weekday: 'long' }));
                $('#highTemp4').html(Math.round(parseFloat(result['daily'][4]['temp']['max'])-273.15) + '&#8451;');
                $('#lowTemp4').html(Math.round(parseFloat(result['daily'][4]['temp']['min'])-273.15) + '&#8451;');
                $('#weatherIcon4').attr('src', 'http://openweathermap.org/img/wn/'+ result['daily'][4]['weather'][0]['icon'] +'@2x.png');


            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMessage = jqXHR.status + ': ' + jqXHR.statusText;
            alert('Error - ' + errorMessage);
        }
    });
};
