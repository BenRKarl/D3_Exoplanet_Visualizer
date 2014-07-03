function buildSvg(data){
  var margin = {top: 100, right: 100, bottom: 100, left: 100},
      width = 1500 - margin.right - margin.left,
      height = 1000 - margin.top - margin.bottom;

  var newestPlanet = d3.max(data, function(planet){
    return planet.disc_year
  });

  var oldestPlanet = d3.min(data, function(planet){
    return planet.disc_year
  });
}

function getDiscYears(array){
  var yearArray = [];
  for (i = 0; i < array.length; i++){
    var year = array[i].disc_year;
    if(Number.isInteger( year )){
      yearArray.push( year );
    }
  }
  return yearArray;
}

$(function(){
  $.ajax({
    url: '/planets',
    method: 'GET',
    dataType: 'json',
    success: function(data){
      $('body').empty();
      window.yearArray = getDiscYears(data.response.results);
      // buildSvg(planetData);
    }
  })
})
