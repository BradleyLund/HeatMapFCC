fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
  .then(response => response.json())
  .then(data=> {


    const svg = d3.select('svg');

    const height = +svg.attr('height');
    const width = +svg.attr('width');

    const padding =     100;

    var xAxisScale = d3.scaleLinear() //could be issues with the type of scale
        .range([padding,width-padding]);

    const yScale = d3.scaleTime()
        .domain(['January','February'])
        .range([padding+50, height-padding]);

        const yAxis = d3.axisLeft(yScale)
          .tickFormat(d3.timeFormat("%B"));


    var xAxis = d3.axisBottom(xAxisScale)
        .tickFormat(d3.format("d"))

    


    let yearArr = []
    for (let i =0;i<data.monthlyVariance.length;i+=12) {
        yearArr.push(data.monthlyVariance[i].year)
    }

    console.log(d3.extent(yearArr))



    xAxisScale.domain(d3.extent(yearArr));


    var gX = svg.append("g")
    .attr('id','x-axis')
    .attr('transform','translate(0,'+(height-padding)+')')
    .call(xAxis)

    var gY = svg.append("g")
    .attr("transform","translate(100,0)")
    .attr('id','y-axis')
    .call(yAxis)


  })



