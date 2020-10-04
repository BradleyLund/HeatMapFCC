
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json') //put in the address for fetching the data and then put it in here
.then(response => response.json())
.then(data => console.log(data));