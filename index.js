fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
  .then(response => response.json())
  .then(data=> {


    const svg = d3.select('svg');

    const height = +svg.attr('height');
    const width = +svg.attr('width');

    const padding =     100;

    var xAxisScale = d3.scaleLinear() //could be issues with the type of scale
        .range([padding,width-padding]);




    

    var xAxis = d3.axisBottom(xAxisScale)
        .tickFormat(d3.format("d"))

    


    let yearArr = []
    for (let i =0;i<data.monthlyVariance.length;i+=12) {
        yearArr.push(data.monthlyVariance[i].year)
    }





    xAxisScale.domain(d3.extent(yearArr));

    var z = d3.scaleTime()
      .domain([new Date(2000,0,1),new Date(2000,11,31)])
      .range([height-padding,10]);

    var zAxis = d3.axisLeft(z)
      // .ticks(d3.time.months)
      .tickFormat(d3.timeFormat("%B"));

    var gZ = svg.append("g")
      .attr('transform','translate(100,0)')
      .call(zAxis)
      .selectAll("text")	
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "translate(10,-15)");



    var gX = svg.append("g")
    .attr('id','x-axis')
    .attr('transform','translate(0,'+(height-padding)+')')
    .call(xAxis)




  })



