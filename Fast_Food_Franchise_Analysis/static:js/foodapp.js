
//using async as recommended by Manny. the catch callback will be executied when the promise is rejected
async function buildRestaurantData(company) {

    // @TODO: Complete the following function that builds the fast food  restaurant  panel
    const companyUrl = "/Fast_Food_Sales/" + company;
    const response = await d3.csv(companyUrl)
    console.log(response);
  
  // Use d3 to select the panel with id of `#sample-metadata`
    const restaurantPanel = d3.select("body");
     
  // Use `.html("") to clear any existing metadata
    restaurantData.html("");
  
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the fast food sales data.
  
      Object.entries(data).forEach(([key, value]) => {
        // console.log(key + value);
        const row = companyPanel.append("p");
        companyPanel.text(`${key}:${value}`);
    
      });
    }
   
    
  async function buildChart(company) {
  
  // // // @TODO: Use `d3.json` to fetch the final clean company data for plotting
    const finalcleanUrl = "/final_clean/" + company;
    let data = await d3.csv(finalcleanUrl)
  
  // //   // @TODO: Use `d3.json` to fetch the sample data for the plots
  
   // @TODO: Build a Bubble Chart using the sample data
    const
       company_name = data.company_name,
       categories_label = data.categories_label,
       state_label = data.state_label,
       region_label = data.region_label;
  
      const trace1 = {
        x: company_name,
        y: state_label,
        text: categories_label
        mode: "markers",
        marker: {
          size: state_label,
          color: company_name,
          opacity: [1, 0.8, 0.6, 0.4],
          colorscale: "Earth"
        }
      }
          
       data = [trace1];
  
      let layout = {
       xaxis: {
         title: "Name"},
       showlegend: false
      };
  
  
      plotly.newPlot('bubble', data, layout);
  
    }
  
  
  // function init() {
  // //   // Grab a reference to the dropdown select element
  //   const selector = d3.select("#selDataset");
  
  //   // Use the list of restaurant names to populate the select options
  
  //   d3.json("/names").then((restaurantNames) => {
  //     restaurantNames.forEach((restaurantName) => {
  //       selector
  //         .append("option")
  //         .text(restaurantName)
  //         .property("value", restaurantName);
  //     });
  //  // Use the first sample from the list to build the initial plot
  //     const firstName = restaurantNames[0];
  //     buildCharts(firstName);
  //     buildMetadata(firstName);
  //   });
  // }
  
  // function optionChanged(newRestaurant) {
  //  // Fetch new data each time a new restaurant name is selected
  //   buildCharts(newRestaurant);
  //   buildMetadata(newRestaurant);
  // }
  
  // Initialize the dashboard
  init();
    
  