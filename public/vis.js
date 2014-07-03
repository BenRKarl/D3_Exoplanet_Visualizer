function buildSvg(data){
  var margin = {top: 100, right: 100, bottom: 100, left: 100},
      width = 1500 - margin.right - margin.left,
      height = 1000 - margin.top - margin.bottom;

  var newestPlanet = d3.max(data, function(year){
    return year
  });

  var oldestPlanet = d3.min(data, function(year){
    return year
  });

  window.xAxisScale = d3.scale.linear().domain([newestPlanet, oldestPlanet]).range([width, 0]);
  window.yAxisScale = d3.scale.linear().domain([0, 150]).range([height, 0]);

  window.svg = d3.select('body')
      .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('height', height)
        .attr('width', width)
        .attr('class', 'timeline')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  var xAxis = d3.svg.axis()
      .scale(window.xAxisScale)
      .orient('bottom');

  var yAxis = d3.svg.axis()
      .scale(window.yAxisScale)
      .orient('left');

  window.svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + height + ')' )
      .call(xAxis);

  window.svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
} //End SVG function

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
      buildSvg(yearArray);
    }
  })
})
