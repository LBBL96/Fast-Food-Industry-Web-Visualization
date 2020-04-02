# U.S. Fast Food Industry Web Visualization Project
## Team Members
[Lynn Leifker](https://github.com/LBBL96/): Analysis, Data Cleaning, Python, JavaScript Visualization
[Jorge Cavazos](https://github.com/Jcavazosg/): SQLite Database, Web Design, HTML, Flask, Deployment
[Cynthia Juarez](https://github.com/juarezCynthia3/): Data Gathering and Cleaning, Excel, Tableau Visualization
[Kellye Rennell](https://github.com/KellyeRennell/): Research, JavaScript Visualization, Deployment

## Data Gathering
Using Datafiniti's Business Database, we pulled a dataset of 10,000 rows of fast-food restaurant data that included information on restaurant location and type. A report from [QSR](https://www.qsrmagazine.com/reports/qsr50-2016-top-50-chart) provided total restaurant sales by chain for 2016.

## Data Cleaning and Analysis
Using a combination of Excel and Python, we removed one-off restaurants from the dataset so that we could focus on location of restaurant chains. From this granular data, we created categories by zip code, state, and region of the United States to be able to 1) map restaurants and 2) draw conclusions about fast food popularity within various regions. Comparison of the larger dataset with overall trends shown in the QSR report allowed us to draw some conclusions about the accuracy of the sampled 10,000 restaurants.

## 

We incorporated JavaScript,  utilized a SQLite database, created web visualizations using Tableau, D3, Python plots, and deployed our Flask app to Heroku.

With the U.S. having roughly 241,000 total fast food restaurants, according to this 2016 dataset, the restaurants and categories of focus for this project were:

* Burgers, Sandwiches, Ethnic, Pizza, Snacks, Chicken, Seafood

* Starbucks, Chik-Fil-A, McDonald's, Taco Bell, Burger King, Arby's, Wendys, Jack in the Box, Pizza Hut, Dairy Queen
