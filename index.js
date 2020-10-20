fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
  .then(response => response.json())
  .then(data=> {

    console.log(data)

    const svg = d3.select('svg');

    const height = +svg.attr('height');
    const width = +svg.attr('width');

    const padding = 50;

    var xAxisScale = d3.scaleLinear() //could be issues with the type of scale
        .range([padding,width-padding]);

    var yAxisScale = d3.scaleLinear()
        .range([0,height-padding]);

    var xAxis = d3.axisBottom(xAxisScale)
        .tickFormat(d3.format("d"))

   

    xAxisScale.domain(d3.extent(data,d=>{
        return d.Year
    }))

    var gX = svg.append("g")
    .attr('id','x-axis')
    .attr('transform','translate(0,'+(height-padding)+')')
    .call(xAxis)


  })



