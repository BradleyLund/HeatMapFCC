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
        .ticks(20)

    


    let yearArr = []
    for (let i =0;i<data.monthlyVariance.length;i+=12) {
        yearArr.push(data.monthlyVariance[i].year)
    }





    xAxisScale.domain(d3.extent(yearArr));

    let rectWidth = (width-padding-padding)/(d3.max(yearArr)-d3.min(yearArr));

  

    var z = d3.scaleTime()
      .domain([new Date(2000,0,1),new Date(2000,11,31)])
      .range([10,height-padding]);

      let rectHeight = (height-padding-10)/12;

    var zAxis = d3.axisLeft(z)
      // .ticks(d3.time.months)
      .tickFormat(d3.timeFormat("%B"));

    var gZ = svg.append("g")
      .attr('id','y-axis')
      .attr('transform','translate(100,0)')
      .call(zAxis)
      .selectAll("text")	
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "translate(10,15)");



    var gX = svg.append("g")
    .attr('id','x-axis')
    .attr('transform','translate(0,'+(height-padding)+')')
    .call(xAxis)	
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

    console.log(data)




    // we need to get the x coordinate from the year and the y coordinates from the month,
    //lets just try with the first one

    
   

    function colorPicker(temp) {
        if (temp < 3.9) {return "#4575B4"}
        else if(temp<5) {return "#74ADD1"}
        else if(temp<6.1) {return "#ABD9E9"}
        else if(temp<7.2) {return "#E0F3F8"}
        else if(temp<8.3) return "#FFFFBF"
        else if(temp<9.5) return "#FEE090"
        else if(temp<10.6) return "#FDAE61"
        else if(temp<11.7) return "#F46D43"
        else {return "#D73027"}

    }

    console.log(colorPicker(3))

    svg.append('g')
      .selectAll("rect")
      .data(data.monthlyVariance)
      .enter()
      .append("rect")
      .attr('class','cell')
      .attr('data-month',d =>d.month-1)
      .attr('data-year',d=>d.year)
      .attr('data-temp',d=>8.66+d.variance)
      .attr('x',d=>{return xAxisScale(d.year)})
      .attr('y',d=>{return z(new Date(2000,d.month-1,01))})
      .attr('fill',d=>{return colorPicker(8.66+d.variance)})
      .attr('height',rectHeight)
      .attr('width',rectWidth)
      

    let dataLegend = [{temp:3},{temp:4.5},{temp:5.5},{temp:6.6},{temp:7.7},{temp:8.8},{temp:9.9},{temp:11.1},{temp:12}]



    svg.append('g')
      .attr('id','legend')
      .selectAll('rect')
      .data(dataLegend)
      .enter()
      .append("rect")
      .attr('x',(d,i)=>100+(i*30))
      .attr('y',height-50)
      .attr('fill',d=>{return colorPicker(d.temp)})
      .attr('height',30)
      .attr('width',30)
      .attr('stroke','black')




  })



