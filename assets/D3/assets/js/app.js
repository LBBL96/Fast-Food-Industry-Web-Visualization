const svgWidth = 960;
const svgHeight = 500;

const margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
const svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params for when page is initially loaded
var chosenXAxis = "poverty";
var chosenYAxis = "obesity";

// function used for updating x-scale var upon click on axis label
function xScale(censusData, chosenXAxis) { 
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
      d3.max(censusData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

} // Create Y Scale
function yScale(censusData, chosenYAxis){
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d => d[chosenYAxis])
        ])
        .range([height, 0]);

    return yLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) { 
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used to update yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) { 
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }

// function used for updating circles group with a transition to
// new circles' x values
function renderXCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))

  return circlesGroup;
}

// function to update circles' y values
function renderYCircles(circlesGroup, newYScale, chosenYAxis){

    circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]))

  return circlesGroup;
}

// function to update labels' x value
function renderAbbrXLabels(abbrLabels, newXScale, chosenXAxis){

  abbrLabels.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]))

  return abbrLabels;
}

// function to update labels' y values
function renderAbbrYLabels(abbrLabels, newYScale, chosenYAxis){

  abbrLabels.transition()
    .duration(1000)
    .attr("y", d => newYScale(d[chosenYAxis]))

  return abbrLabels;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {
    let label  = "";
    let ylabel = "";
    if (chosenXAxis === "poverty") {
        label = "Percent in Poverty:"
        if(chosenYAxis === "obesity"){
            ylabel = "Percent Obese:"
        } 
        else if (chosenYAxis === "smokes"){
            ylabel = "Percent Who Smoke:"
        }
        else if (chosenYAxis === "healthcare"){
            ylabel = "Percent Lacking Healthcare:"
        }
    } 
    else if (chosenXAxis === "age") {
        label = "Age:";
        if(chosenYAxis === "obesity"){
            ylabel = "Percent Obese:"
        } 
        else if (chosenYAxis === "smokes"){
            ylabel = "Percent Who Smoke:"
        }
        else if (chosenYAxis === "healthcare"){
            ylabel = "Percent Lacking Healthcare:"
        }
    } 
    else if (chosenXAxis === "income"){
        label = "Household Income:";
        if(chosenYAxis === "obesity"){
            ylabel = "Percent Obese:"
        } 
        else if (chosenYAxis === "smokes"){
            ylabel = "Percent Who Smoke:"
        }
        else if (chosenYAxis === "healthcare"){
            ylabel = "Percent Lacking Healthcare:"
        }
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([180, 60])
        .style("background-color", "lightgray")
        .html(function(d) {
            return (`${d.state}<hr>${label} ${d[chosenXAxis]}<hr>${ylabel} ${d[chosenYAxis]}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
    // onmouseout event
    .on("mouseout", function(data) {
        toolTip.hide(data, this);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
(async function(){
    const censusData = await d3.csv("assets/data/data.csv");

    // parse data
    censusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.income = +data.income;
    });

    // xLinearScale function above csv import
    var xLinearScale = xScale(censusData, chosenXAxis);

    // Calling yScale function
    var yLinearScale = yScale(censusData, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        // .attr(height, 0)
        .call(leftAxis); 

    // Create a group to hold circles and their labels

    let dotGroup = chartGroup.selectAll("g.dot")
        .data(censusData)
        .enter()
        .append("g")

    // append initial circles
    let circlesGroup = dotGroup
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 13)
        .attr("fill", "blue")
        .attr("opacity", ".5");
   
    // // append initial state abbr text to circles   
    let abbrLabels = dotGroup
        .append("text")
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .text(d => d.abbr);

    // Create group for  3 x- axis labels
    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var povertyLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty") // value to grab for event listener
        .classed("active", true)
        .text("In Poverty (%)");

    var ageLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "age") // value to grab for event listener
        .classed("inactive", true)
        .text("Age (Median)");

    var incomeLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "income") // value to grab for event listener
        .classed("inactive", true)
        .text("Household Income (Median)");

    // Create labels group for 3 y-axis labels
    
    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)");

    var obesityLabel = yLabelsGroup.append("text")
        .attr("x", 0 - (height / 2))
        .attr("y", 20 - margin.left)
        .attr("value", "obesity")
        .classed("active", true)
        .text("Obesity (%)")
       
    var smokesLabel = yLabelsGroup.append("text")
        .attr("x", 0 - (height / 2))
        .attr("y", 40 - margin.left)
        .attr("value", "smokes")
        .classed("inactive", true)
        .text("Smokes (%)");

    
    var healthcareLabel = yLabelsGroup.append("text")
        .attr("x", 0 - (height / 2))
        .attr("y", 60 - margin.left)
        .attr("value", "healthcare")
        .classed("inactive", true)
        .text("Lacks Healthcare (%)");


    // updateToolTip function above csv import
    circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
    
    // x axis labels event listener
    xLabelsGroup.selectAll("text")
        .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

            // replaces chosenXAxis with value
            chosenXAxis = value;

            console.log(chosenXAxis)

            // updates x scale for new data
            xLinearScale = xScale(censusData, chosenXAxis);

            // updates x axis with transition
            xAxis = renderXAxes(xLinearScale, xAxis);

            // updates circles with new x values
            circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

            // update x values for labels
            abbrLabels = renderAbbrXLabels(abbrLabels, xLinearScale, chosenXAxis)

            // updates tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

            // changes classes to change bold text
            if (chosenXAxis === "poverty") {
                 povertyLabel
                    .classed("active", true) // bolds the active axis label
                    .classed("inactive", false);
                ageLabel
                    .classed("active", false)
                    .classed("inactive", true);
                incomeLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenXAxis === "age") {
                povertyLabel
                    .classed("active", false) // bolds the active axis label
                    .classed("inactive", true);
                ageLabel
                    .classed("active", true)
                    .classed("inactive", false);
                incomeLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                povertyLabel
                    .classed("active", false) 
                    .classed("inactive", true);
                ageLabel
                    .classed("active", false)
                    .classed("inactive", true);
                incomeLabel
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }
    })

    yLabelsGroup.selectAll("text")
        .on("click", function() {
        // get value of selection
        var yValue = d3.select(this).attr("value");
        if (yValue !== chosenYAxis) {

            // replaces chosenYAxis with yValue
            chosenYAxis = yValue;

            console.log(chosenYAxis)
            // updates y scale for new data
            yLinearScale = yScale(censusData, chosenYAxis);

            // updates y axis with transition
            yAxis = renderYAxes(yLinearScale, yAxis);

            // updates circles with new y values
            circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

            // update y values for labels
            abbrLabels = renderAbbrYLabels(abbrLabels, yLinearScale, chosenYAxis)

            // updates tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
        
            // Changes y-axis to bold depending on chosen axis
            if (chosenYAxis === "obesity") {
                obesityLabel
                    .classed("active", true) 
                    .classed("inactive", false);
                smokesLabel
                    .classed("active", false)
                    .classed("inactive", true);
                healthcareLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else if (chosenYAxis === "smokes") {
                obesityLabel
                    .classed("active", false) 
                    .classed("inactive", true);
                smokesLabel
                    .classed("active", true)
                    .classed("inactive", false);
                healthcareLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                obesityLabel
                    .classed("active", false) 
                    .classed("inactive", true);
                smokesLabel
                    .classed("active", false)
                    .classed("inactive", true);
                healthcareLabel
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }
    }
    );
})()
