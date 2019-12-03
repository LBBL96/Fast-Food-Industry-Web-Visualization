

const svgWidth = 960;
const svgHeight = 500;

const margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// create svg container
const svg = d3
   .select("body")
   .append("svg")
   .attr("height", svgHeight)
   .attr("width", svgWidth);

// shift everything over by the margins
const chartGroup = svg.append("g")
   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// chart area minus margins
const chartHeight = svgHeight - margin.top - margin.bottom;
const chartWidth = svgWidth - margin.left - margin.right;

const svgArea = d3.select("body").select("svg");

// Data
var dataCategories = ["Midwest", "Northeast", "South", "West"];
var burger = [1038,579,1887,1209];
var chicken = [81,83,383,105];
var ethnic = [375,105,485,491];
var pizza = [137,81,205,165];
var sandwich = [605,221,677,341];
var seafood = [19,7,34,9];
var snack = [97,93,150,108];

// Initial data values for y axis
const chosenXAxis = burger;

// scale y to chart height


// function renderAxes(newYScale, yAxis) {
//     const leftAxis = d3.axisLeft(newYScale);
  
//     yAxis.transition()
//       .duration(1000)
//       .call(leftAxis);
  
//     return yAxis;
//   }

function renderRectangles(rectanglesGroup, chosenXAxis){
    rectanglesGroup.transition()
    .duration(1000)
    .attr("height", d => chartHeight - yScale(d[chosenXAxis]));

  return rectanglesGroup;

}

function makeResponsive() {

    var yScale = d3.scaleLinear()
    .domain([0, d3.max(burger)])
    .range([chartHeight, 0]);

    // scale x to chart width
    const xScale = d3.scaleBand()
        .domain(dataCategories)
        .range([0, chartWidth])
        .padding(0.1);

    // const yScale = yScale(burger);

    // create axes
    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // set y to the y axis
    chartGroup.append("g")
        .call(yAxis);

    let rectanglesGroup = chartGroup.selectAll("rect")
        .data(chosenXAxis)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(dataCategories[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d))
        .attr("fill", "green")
        // event listener for mouseover
        .on("mouseover", function() {
          d3.select(this)
                .attr("fill", "red");
        })
        // event listener for mouseout
        .on("mouseout", function() {
          d3.select(this)
                .attr("fill", "green");
        });

    // append titles
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    var burgerLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", burger) // value to grab for event listener
        .classed("active", true)
        .text("Burgers");

    var chickenLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", chicken) // value to grab for event listener
        .classed("inactive", true)
        .text("Chicken");
    
    
    labelsGroup.selectAll("text")
        .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
            chosenXAxis = value;
            console.log(chosenXAxis)}

        });
         
}

makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
