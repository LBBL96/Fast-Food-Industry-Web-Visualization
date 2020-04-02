# U.S. Fast Food Industry Web Visualization Project
## Team Members
[Lynn Leifker](https://github.com/LBBL96/): Analysis, Data Cleaning, Python, JavaScript Visualization, D3, Writeup

[Jorge Cavazos](https://github.com/Jcavazosg/): SQLite Database, Web Design, HTML, Flask, Deployment

[Cynthia Juarez](https://github.com/juarezCynthia3/): Data Gathering and Cleaning, Excel, Tableau Visualization

[Kellye Rennell](https://github.com/KellyeRennell/): Research, JavaScript Visualization, D3, PowerPoint 

## Data Gathering
Using a free portion of Datafiniti's [Fast Food Restaurant Database](https://www.kaggle.com/datafiniti/fast-food-restaurants/), we pulled a dataset of 10,000 rows of fast-food restaurant data that included information on restaurant location and type. A report from [QSR](https://www.qsrmagazine.com/reports/qsr50-2016-top-50-chart) provided total restaurant sales by chain for 2016.

## Data Cleaning
Using a combination of Excel and Python, we removed one-off restaurants from the dataset so that we could focus on location of restaurant chains. From this granular data, we created categories by zip code, state, and region of the United States to be able to 1) map restaurants and 2) draw conclusions about fast food popularity within various regions. Comparison of the larger dataset with overall trends shown in the QSR report allowed us to draw some conclusions about the accuracy of the sampled 10,000 restaurants.

## Database
Once the data was clean and ready to use for visualizations, we put it into a SQLite database. After deployment, the website was able to populate JavaScript visualizations from the database.

## Tableau Visualization
[Full Dashboard](https://public.tableau.com/profile/cynthia8750#!/vizhome/FastFoodRestaurants_15752771722250/Dashboard2)

### Sample Images

![Density Map](Fast_Food_Franchise_Analysis/static/images/TableauMap.png)

![Bubble Chart](Fast_Food_Franchise_Analysis/static/images/TableauBubble.png)

## Data Analysis
[Exploratory data analysis](Project Resources/Jupyter Notebooks/Fast Food Analysis.ipynb) 
created web visualizations using Tableau, D3, Python plots, and deployed our Flask app to Heroku.

With the U.S. having roughly 241,000 total fast food restaurants, according to one 2016 dataset, the restaurants and categories of focus for this project were:

* Burgers, Sandwiches, Ethnic, Pizza, Snacks, Chicken, Seafood

* Starbucks, Chik-Fil-A, McDonald's, Taco Bell, Burger King, Arby's, Wendys, Jack in the Box, Pizza Hut, Dairy Queen
