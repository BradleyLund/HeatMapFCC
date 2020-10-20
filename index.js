const svg = d3.select('svg');
svg.style('background-color','red');

const circle = svg.append('circle');

const height = +svg.attr('height');
const width = +svg.attr('width');

console.log(typeof width)

circle.attr('r',height / 2);

circle.attr('cx',width/2);

circle.attr('cy', height/2);