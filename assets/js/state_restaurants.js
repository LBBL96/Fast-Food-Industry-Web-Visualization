var chart = bubbleChart();
var Widthsvg = 960;
var Heightsvg = 620;

var margin = {
    top: 20,
    right: 40,
    bottom: 200,
    left: 100
};

var width = Widthsvg - margin.right - margin.left;
var height = Heightsvg - margin.top - margin.bottom;

var chart = d3.select("#scatter").append("div").classed("chart", true);

var Chartsvg = chart.append("svg")
    .attr("width", Widthsvg)
    .attr("height", Heightsvg);

var chartGroup = Chartsvg.append("g")
    .attr("transform", `translate($ { margin.left }, $ { margin.top })
        `);

var XAxis = "state";
var YAxis = "number of restaurants";

function xScale(stateData, XAxis) {

    var LinearScaleX = d3.scaleLinear()
        .domain([d3.min(stateData, d => d[XAxis]) * 0.8,
            d3.max(stateData, d => d[XAxis]) * 1.2
        ])
        
        .range([0, width]);
    }

    return LinearScaleX;


function yScale(stateData, YAxis) {

    var LinearScaleY = d3.scaleLinear()
        .domain([d3.min(stateData, d => d[YAxis]) * 0.8,
            d3.max(stateData, d => d[YAxis]) * 1.2
        ])
        .range([height, 0]);

    return LinearScaleY;
}

function renderAxesX(newXScale, xAxis) {
    var Axis_bottom = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(Axis_bottom);

    return xAxis;
}

function renderAxesY(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

function renderCircles(GroupCircles, newXScale, XAxis, newYScale, YAxis) {

    GroupCircles.transition()
        .duration(1000)
        .attr("cx", data => newXScale(data[XAxis]))
        .attr("cy", data => newYScale(data[YAxis]));

    return GroupCircles;
}

function renderText(textGroup, newXScale, XAxis, newYScale, YAxis) {

    textGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[XAxis]))
        .attr("y", d => newYScale(d[YAxis]));

    return textGroup;
}

function Xstyle(value, XAxis) {

    if (XAxis === 'state') {
        return `
        $ { value } % `;
    } else if (XAxis === 'income') {
        return `
        $$ { value }
        `;
    } else {
        return `
        $ { value }
        `;
    }
}

function ToolTipUpdate(XAxis, YAxis, GroupCircles) {

    // if (XAxis === 'poverty') {
    //     var xLabel = "Poverty:";
    // } else if (XAxis === 'income') {
    //     var xLabel = "Median Income:";
    // } else {
    //     var xLabel = "Age:";
    // }

    // if (YAxis === 'healthcare') {
    //     var yLabel = "No Healthcare:"
    // } else if (YAxis === 'obesity') {
    //     var yLabel = "Obesity:"
    // } else {
    //     var yLabel = "Smokers:"
    // }

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) {
            return (`
        $ { d.state } < br > $ { xLabel }
        $ { Xstyle(d[XAxis], XAxis) } < br > $ { yLabel }
        $ { d[YAxis] } % `);
        });

    GroupCircles.call(toolTip);

    GroupCircles.on("mouseover", toolTip.show)
        .on("mouseout", toolTip.hide);

    return GroupCircles;
}


d3.csv("./assets/data/Count_by_State.csv", function(error, data) {
            if (error) {
                console.error('Error getting or parsing the data.');
                throw error;


                stateData.forEach(function(data) {
                    data.state = +data.state;
                    data.number_of_restaurants = +data.number_of_restaurants;

                });
                var LinearScaleX = xScale(stateData, XAxis);
                var LinearScaleY = yScale(stateData, YAxis);

                //initial axis functions
                var Axis_bottom = d3.axisBottom(LinearScaleX);
                var leftAxis = d3.axisLeft(LinearScaleY);

                //append x axis
                var xAxis = chartGroup.append("g")
                    .classed("x-axis", true)
                    .attr("transform", `
        translate(0, $ { height })
        `)
                    .call(Axis_bottom);

                //append y axis
                var yAxis = chartGroup.append("g")
                    .classed("y-axis", true)
                    .call(leftAxis);

                //append initial circles
                var GroupCircles = chartGroup.selectAll("circle")
                    .data(stateData)
                    .enter()
                    .append("circle")
                    .classed("stateCircle", true)
                    .attr("cx", d => LinearScaleX(d[XAxis]))
                    .attr("cy", d => LinearScaleY(d[YAxis]))
                    .attr("r", 12)
                    .attr("opacity", ".5");

                //append initial text
                var textGroup = chartGroup.selectAll(".stateText")
                    .data(censusData)
                    .enter()
                    .append("text")
                    .classed("stateText", true)
                    .attr("x", d => LinearScaleX(d[XAxis]))
                    .attr("y", d => LinearScaleY(d[YAxis]))
                    .attr("dy", 3)
                    .attr("font-size", "10px")
                    .text(function(d) {
                        return d.state
                    });

                //group for 3 x-axis labels
                var xLabelsGroup = chartGroup.append("g")
                    .attr("transform", `
        translate($ { width / 2 }, $ { height + 20 + margin.top })
        `);

                // var Label_poverty = xLabelsGroup.append("text")
                //     .classed("aText", true)
                //     .classed("active", true)
                //     .attr("x", 0)
                //     .attr("y", 20)
                //     .attr("value", "poverty")
                //     .text("In Poverty (%)");

                // var Label_age = xLabelsGroup.append("text")
                //     .classed("aText", true)
                //     .classed("inactive", true)
                //     .attr("x", 0)
                //     .attr("y", 40)
                //     .attr("value", "age")
                //     .text("Age (Median)")

                // var Label_income = xLabelsGroup.append("text")
                //     .classed("aText", true)
                //     .classed("inactive", true)
                //     .attr("x", 0)
                //     .attr("y", 60)
                //     .attr("value", "income")
                //     .text("Household Income (Median)")

                // //group for 3 y-axis labels
                // var yLabelsGroup = chartGroup.append("g")
                //     .attr("transform", `
                //     translate($ { 0 - margin.left / 4 }, $ {
                //         (height / 2) })
                //     `);

                // var healthcareLabel = yLabelsGroup.append("text")
                //     .classed("aText", true)
                //     .classed("active", true)
                //     .attr("x", 0)
                //     .attr("y", 0 - 20)
                //     .attr("dy", "1em")
                //     .attr("transform", "rotate(-90)")
                //     .attr("value", "healthcare")
                //     .text("Lacks Healthcare (%)");

                // var smokesLabel = yLabelsGroup.append("text")
                //     .classed("aText", true)
                //     .classed("inactive", true)
                //     .attr("x", 0)
                //     .attr("y", 0 - 40)
                //     .attr("dy", "1em")
                //     .attr("transform", "rotate(-90)")
                //     .attr("value", "smokes")
                //     .text("Smokes (%)");

                // var obesityLabel = yLabelsGroup.append("text")
                //     .classed("aText", true)
                //     .classed("inactive", true)
                //     .attr("x", 0)
                //     .attr("y", 0 - 60)
                //     .attr("dy", "1em")
                //     .attr("transform", "rotate(-90)")
                //     .attr("value", "obesity")
                //     .text("Obese (%)");

                //ToolTipUpdate function with data
                // var GroupCircles = ToolTipUpdate(XAxis, YAxis, GroupCircles);

                // //x axis labels event listener
                // xLabelsGroup.selectAll("text")
                //     .on("click", function() {
                //             //get value of selection
                //             var value = d3.select(this).attr("value");

                //             //check if value is same as current axis
                //             if (value != XAxis) {

                //                 //replace XAxis with value
                //                 XAxis = value;

                //                 //update x scale for new data
                //                 LinearScaleX = xScale(stateData, XAxis);

                //                 //update x axis with transition
                //                 xAxis = renderAxesX(LinearScaleX, xAxis);

                //                 //update circles with new x values
                //                 GroupCircles = renderCircles(GroupCircles, LinearScaleX, XAxis, LinearScaleY, YAxis);

                //                 //update text with new x values
                //                 textGroup = renderText(textGroup, LinearScaleX, XAxis, LinearScaleY, YAxis);

                //                 //update tooltips with new info
                //                 GroupCircles = ToolTipUpdate(XAxis, YAxis, GroupCircles);

                //                 //change classes to change bold text
                //                 //         if (XAxis === "poverty") {
                //                 //             Label_poverty.classed("active", true).classed("inactive", false);
                //                 //             Label_age.classed("active", false).classed("inactive", true);
                //                 //             Label_income.classed("active", false).classed("inactive", true);
                //                 //         } else if (XAxis === "age") {
                //                 //             Label_poverty.classed("active", false).classed("inactive", true);
                //                 //             Label_age.classed("active", true).classed("inactive", false);
                //                 //             Label_income.classed("active", false).classed("inactive", true);
                //                 //         } else {
                //                 //             Label_poverty.classed("active", false).classed("inactive", true);
                //                 //             Label_age.classed("active", false).classed("inactive", true);
                //                 //             Label_income.classed("active", true).classed("inactive", false);
                //                 //         }
                //                 //     }
                //                 // });

                //                 // //y axis labels event listener
                //                 // yLabelsGroup.selectAll("text")
                //                 //     .on("click", function() {
                //                 //         //get value of selection
                //                 //         var value = d3.select(this).attr("value");

                //                 //         //check if value is same as current axis
                //                 //         if (value != YAxis) {

                //                 //             //replace YAxis with value
                //                 //             YAxis = value;

                //                 //             //update y scale for new data
                //                 //             LinearScaleY = yScale(censusData, YAxis);

                //                 //             //update x axis with transition
                //                 //             yAxis = renderAxesY(LinearScaleY, yAxis);

                //                 //             //update circles with new y values
                //                 //             GroupCircles = renderCircles(GroupCircles, LinearScaleX, XAxis, LinearScaleY, YAxis);

                //                 //             //update text with new y values
                //                 //             textGroup = renderText(textGroup, LinearScaleX, XAxis, LinearScaleY, YAxis)

                //                 //             //update tooltips with new info
                //                 //             GroupCircles = ToolTipUpdate(XAxis, YAxis, GroupCircles);

                //                 //             //change classes to change bold text
                //                 //             if (YAxis === "obesity") {
                //                 //                 obesityLabel.classed("active", true).classed("inactive", false);
                //                 //                 smokesLabel.classed("active", false).classed("inactive", true);
                //                 //                 healthcareLabel.classed("active", false).classed("inactive", true);
                //                 //             } else if (YAxis === "smokes") {
                //                 //                 obesityLabel.classed("active", false).classed("inactive", true);
                //                 //                 smokesLabel.classed("active", true).classed("inactive", false);
                //                 //                 healthcareLabel.classed("active", false).classed("inactive", true);
                //                 //             } else {
                //                 //                 obesityLabel.classed("active", false).classed("inactive", true);
                //                 //                 smokesLabel.classed("active", false).classed("inactive", true);
                //                 //                 healthcareLabel.classed("active", true).classed("inactive", false);
                //                 //         //             }
                //                 //     }
                //                 // });





                //             }