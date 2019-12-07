import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/Fast_Food_Restaurants.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Fast_Food_Sales = Base.classes.Fast_Food_Sales
Final_Clean = Base.classes.Final_Clean

# defining the page index
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/names")
def names():
    """Return a list of company names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(final_clean).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (company names)
    return jsonify(list(df.columns)[2:])


@app.route("/Sales/<company_name>")
def Fast_Food_Sales(company_name):
    """Return the Sales data for a given company."""
    sel = [
        Fast_Food_Sales.Company,
        Fast_Food_Sales.Category,
        Fast_Food_Sales.Total_Units_in_2016
     
        
    ]

    results = db.session.query(*sel).filter(Fast_Food_Sales.company_name == company_name).all()

    # Create a dictionary entry for each row of company information
    company_data = {}
    for result in results:
        Fast_Food_Sales["Company"] = result[0]
        Fast_Food_Sales["Category"] = result[1]
        Fast_Food_Sales["TotalUnitsin2016"] = result[2]

    print(Fast_Food_Sales)
    return jsonify(Fast_Food_Sales)


@app.route("/final_clean/<company_name>")
def final_clean(company_name):
    """Return `name`, `categories`, `state`, `region`."""
    stmt = db.session.query(final_clean).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the company names and
    # only keep rows with values above 1
    company_data = df.loc[df[company_name] > 1, ["name", "categories","state", "region", company_name]]

    # Sort by company name
    company_data.sort_values(by=company_name, ascending=False, inplace=True)

    # Format the data to send as json
    data = {
        "name": company_data.name.values.tolist(),
        "categories": company_data.categories.tolist(),
        "state": company_data.state.tolist(),
        "region": company_data.region.tolist(),
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run()