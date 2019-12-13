# import os

# import pandas as pd
# import numpy as np

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine

# from flask import Flask, jsonify, render_template
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)


# #################################################
# # Database Setup
# #################################################

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/Fast_Food_Restaurants.db"
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# Fast_Food_Sales = Base.classes.Fast_Food_Sales
# final_clean = Base.classes.final_clean

# # defining the page index
# @app.route("/")
# def index():
#     """Return the homepage."""
#     return render_template("index.html")


# @app.route("/density")
# def names():
#     """Return category density by region."""

#     sel = [
#         Regions.category,
#         Regions.region,
#         Regions.number
#     ]

#     results = db.session.query(*sel).all()

#     # Create a dictionary entry for each row of company information
#     company_data = {}
#     for result in results:
#         Regions["category"] = result[1]
#         Regions["region"] = result[0]
#         Regions["number"] = result[2]
        

#     print(company_data)
#     return jsonify(company_data)


# @app.route("/Fast_Food_Sales/<company>")
# def Sales(company):
#     """Return the Sales data for a given company."""
#     sel = [
#         Sales.Company,
#         Sales.Category,
#         Sales.Total_Units_in_2016, 
#     ]

#     results = db.session.query(*sel).filter(Sales.Company == company).all()

#     # Create a dictionary entry for each row of company information
#     company_data = {}
#     for result in results:
#         Sales["Company"] = result[0]
#         Sales["Category"] = result[1]
#         Sales["TotalUnitsin2016"] = result[6]

#     print(company_data)
#     return jsonify(company_data)

# if __name__ == "__main__":
#     app.run()