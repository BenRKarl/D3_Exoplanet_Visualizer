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

function project(data){
  var image = svg.selectAll('image').data(data);
  image.enter()
    .append('image')
    .attr('xlink:href', function(d){
      return 'http://fc00.deviantart.net/fs70/i/2011/140/f/4/desert_planet_resource_by_ziliran-d3gtwm1.png';
    })
    .attr('width', 25)
    .attr('height', 25)
    .attr('x', function(d){
      return xAxisScale(d);
    })
    .attr('y', 0)
    .attr('opacity', 0)
    .transition().duration(1000)
    .attr('y', 700)
    .attr('opacity', 0.75)
}

var data = [];
function selectData(){
  var year = window.yearArray.pop()
  data.push(year);
  project(data);
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
      window.yearArray = (getDiscYears(data.response.results)).sort();
      buildSvg(yearArray);
      window.timer = setInterval(selectData, 100);
    }
  })
})
