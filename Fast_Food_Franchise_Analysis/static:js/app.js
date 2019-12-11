
//using async as recommended by Manny. the catch callback will be executied when the promise is rejected
// async function buildDensity() {

  //set up data
  
  
  // var bothData = [
  //   {
  //     "category": "Burger",
  //     "region": "Midwest",
  //     "number": "1038"
  //   },
  //   {
  //     "category": "Burger",
  //     "region": "Northeast",
  //     "number": "579"
  //   },
  //   {
  //     "category": "Burger",
  //     "region": "South",
  //     "number": "1887"
  //   },
  //   {
  //     "category": "Burger",
  //     "region": "West",
  //     "number": "1209"
  //   },
  //   {
  //     "category": "Chicken",
  //     "region": "Midwest",
  //     "number": "81"
  //   },
  //   {
  //     "category": "Chicken",
  //     "region": "Northeast",
  //     "number": "83"
  //   },
  //   {
  //     "category": "Chicken",
  //     "region": "South",
  //     "number": "383"
  //   },
  //   {
  //     "category": "Chicken",
  //     "region": "West",
  //     "number": "105"
  //   },
  //   {
  //     "category": "Ethnic",
  //     "region": "Midwest",
  //     "number": "375"
  //   },
  //   {
  //     "category": "Ethnic",
  //     "region": "Northeast",
  //     "number": "105"
  //   },
  //   {
  //     "category": "Ethnic",
  //     "region": "South",
  //     "number": "485"
  //   },
  //   {
  //     "category": "Ethnic",
  //     "region": "West",
  //     "number": "491"
  //   },
  //   {
  //     "category": "Pizza",
  //     "region": "Midwest",
  //     "number": "137"
  //   },
  //   {
  //     "category": "Pizza",
  //     "region": "Northeast",
  //     "number": "81"
  //   },
  //   {
  //     "category": "Pizza",
  //     "region": "South",
  //     "number": "205"
  //   },
  //   {
  //     "category": "Pizza",
  //     "region": "West",
  //     "number": "165"
  //   },
  //   {
  //     "category": "Sandwich",
  //     "region": "Midwest",
  //     "number": "605"
  //   },
  //   {
  //     "category": "Sandwich",
  //     "region": "Northeast",
  //     "number": "221"
  //   },
  //   {
  //     "category": "Sandwich",
  //     "region": "South",
  //     "number": "677"
  //   },
  //   {
  //     "category": "Sandwich",
  //     "region": "West",
  //     "number": "341"
  //   },
  //   {
  //     "category": "Seafood",
  //     "region": "Midwest",
  //     "number": "19"
  //   },
  //   {
  //     "category": "Seafood",
  //     "region": "Northeast",
  //     "number": "7"
  //   },
  //   {
  //     "category": "Seafood",
  //     "region": "South",
  //     "number": "34"
  //   },
  //   {
  //     "category": "Seafood",
  //     "region": "West",
  //     "number": "9"
  //   },
  //   {
  //     "category": "Snack",
  //     "region": "Midwest",
  //     "number": "97"
  //   },
  //   {
  //     "category": "Snack",
  //     "region": "Northeast",
  //     "number": "93"
  //   },
  //   {
  //     "category": "Snack",
  //     "region": "South",
  //     "number": "150"
  //   },
  //   {
  //     "category": "Snack",
  //     "region": "West",
  //     "number": "108"
  //   }
  // ];
  
//   var url = '/density'
//   var bothData = await d3.json(url).catch(e => e.console.warn(e));
  

//   var burgerData = [];
//   var chickenData = [];
//   var ethnicData = [];
//   var pizzaData = [];
//   var sandwichData = [];
//   var seafoodData = [];
//   var snackData = [];
  
//   for(var i = 0; i < bothData.length; i++){
//     if(bothData[i]["category"] === "Burger"){
//       burgerData.push(bothData[i]);
//     }else if (bothData[i]["category"] === "Chicken"){
//       chickenData.push(bothData[i]);
//     }else if (bothData[i]["category"] === "Ethnic"){
//       ethnicData.push(bothData[i]);
//     }else if (bothData[i]["category"] === "Pizza"){
//       pizzaData.push(bothData[i]);
//     }else if (bothData[i]["category"] === "Sandwich"){
//       sandwichData.push(bothData[i]);
//     }else if (bothData[i]["category"] === "Seafood"){
//       seafoodData.push(bothData[i]);
//     }else
//       snackData.push(bothData[i]);
//     }
  
  
//   //functions for toggling between data
//   function change(value){
  
//     if(value === 'burger'){
//       update(burgerData);
//     }else if(value === 'chicken'){
//       update(chickenData);
//     }else if(value === 'ethnic'){
//       update(ethnicData);
//     }else if(value === 'pizza'){
//       update(pizzaData);
//     }else if(value === 'sandwich'){
//       update(sandwichData);
//     }else if(value === 'seafood'){
//       update(seafoodData);
//     }else{
//       update(snackData);
//     }
//   }
  
//   function update(data){
//     //set domain for the x axis
//     xChart.domain(data.map(function(d){ return d.region; }) );
//     //set domain for y axis
//     yChart.domain( [0, d3.max(data, function(d){ return +d.number; })] );
    
//     //get the width of each bar 
//     var barWidth = width / data.length;
    
//     //select all bars on the graph, take them out, and exit the previous data set. 
//     //then you can add/enter the new data set
//     var bars = chart.selectAll(".bar")
//             .remove()
//             .exit()
//             .data(data)		
//     //now actually give each rectangle the corresponding data
//     bars.enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", function(d, i){ return i * barWidth + 1 })
//       .attr("y", function(d){ return yChart( d.number); })
//       .attr("height", function(d){ return height - yChart(d.number); })
//       .attr("width", barWidth - 1)
//       .attr("fill", function(d){ 
//         if(d.region === "Northeast"){
//           return "rgb(135,206,235)";
//         }else if(d.region === "West"){
//           return "rgb(100,149,237)"
//         }else if(d.region === "South"){
//           return "rgb(70,130,180)"
//         }
//         else{
//           return "rgb(179,205,227)";
//         }
//       });
//     //left axis
//     chart.select('.y')
//         .call(yAxis)
//     //bottom axis
//     chart.select('.xAxis')
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis)
//       .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", ".15em")
//         .attr("transform", function(d){
//           return "rotate(-65)";
//         });
        
//   }//end update
  
//   //set up chart

//   var margin = {top: 20, right: 20, bottom: 95, left: 50};
//   var width = 800;
//   var height = 500;
  
//   var chart = d3.select(".chart")
//           .attr("width", width + margin.left + margin.right)
//           .attr("height", height + margin.top + margin.bottom)
//           .append("g")
//           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
//   var xChart = d3.scaleBand()
//           .range([0, width]);
          
//   var yChart = d3.scaleLinear()
//           .range([height, 0]);
  
//   var xAxis = d3.axisBottom(xChart);
//   var yAxis = d3.axisLeft(yChart);
  
//   //set up axes
//   //left axis
//     chart.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
        
//     //bottom axis
//     chart.append("g")
//       .attr("class", "xAxis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis)
//       .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", ".15em")
//         .attr("transform", function(d){
//           return "rotate(-65)";
//         });
  
//   //add labels
//   chart
//     .append("text")
//     .attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
//     .text("Number of Restaurants");
      
//   chart
//     .append("text")
//     .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")")
//     .text("Region");
  
//   //use bothData to begin with
//   update(bothData);

// }

    
  