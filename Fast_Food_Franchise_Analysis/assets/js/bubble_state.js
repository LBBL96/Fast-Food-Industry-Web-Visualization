(async function() {
    const
        svgWidth = 960,
        svgHeight = 500;

    const margin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 100
    };

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    const svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Import Data
    const stateData = await d3.csv("assets/data/Count_by_State.csv")
    console.log(stateData);

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    stateData.forEach(function (data) {
        data.state = +data.state;
        data.number_of_restaurants = +data.number_of_restaurants;
        // data.Ethnic = +data.Ethnic;
        // data.Pizza = +data.Pizza;
        // data.Sandwich = +data.Sandwich;
        // data.Seafood = +data.Seafood;
        // data.Snack = +data.Snack
    });

    // Step 2: Create scale functions
    // ==============================
    const xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(stateData, d => d.state)])
        .range([0, width]);

    const yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.number_of_restaurants)])
        .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    const circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.state))
        .attr("cy", d => yLinearScale(d.number_of_restaurants))
        .attr("r", "15")
        .attr("fill", "pink")
        .attr("opacity", ".5");

    // Step 6: Initialize tool tip
    // ==============================
    const toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.state}<br>State: ${d.number_of_restaurants}`);
        });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
    })
    // onmouseout event
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
    });

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("States");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Restaurant Count");
})()
