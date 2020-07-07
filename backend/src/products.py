from flask import render_template, request, jsonify, Blueprint
from flask import current_app as current_app

import logging
import requests
import json
import db
from web_scrapers import target_scraper

# Blueprint configuration
products_bp = Blueprint("products_bp", __name__)

class Product:
    def __init__(self, id, name, price, in_stock, store, url, image_url):
        self.id = id
        self.name = name
        self.price = price
        self.in_stock = in_stock
        self.store = store
        self.url = url
        self.image_url = image_url

# Routes
@products_bp.route("/products", methods=["POST"])
def add_product():
    """Adds a product to the database"""

    url = request.get_json()["url"]

    # Figure out which website the URL is for
    # Then, scrape the website to get more information about the product
    product = None
    if "www.target.com" in url:
        product = target_scraper.get_product_info(url)

    # Add product to the database
    response = db.add_product(product)
    
    return jsonify(
        status_code = response["ResponseMetadata"]["HTTPStatusCode"]
    )

@products_bp.route("/products", methods=["GET"])
def get_all_products():
    """Retrieves all products in the database"""

    products = db.get_all_products()

    return jsonify(
        all_products = products
    )

@products_bp.route("/products/<string:product_id>", methods=["GET"])
def get_product(product_id):
    """Get a specific product's information from the database"""

    response = db.get_product(product_id)

    # Parse response to get the product's info
    product_name = response["Item"]["name"]
    product_price = response["Item"]["price"]
    product_in_stock = response["Item"]["in_stock"]
    product_store = response["Item"]["store"]
    product_url = response["Item"]["url"]
    product_image_url = response["Item"]["image_url"]

    return jsonify(
    id = product_id,
    name = product_name, 
    price = product_price, 
    in_stock = product_in_stock,
    store = product_store,
    url = product_url, 
    image_url = product_image_url
    )

@products_bp.route("/products/<string:product_id>", methods=["PATCH"])
def update_availability(product_id):
    """Updates the availability of a specific product in the database"""

    in_stock = request.get_json()["in_stock"]
    response = db.update_availability(product_id, in_stock)

    return jsonify(
        status_code = response["ResponseMetadata"]["HTTPStatusCode"],
        in_stock = response["Attributes"]["in_stock"]
    )

@products_bp.route("/products/<string:product_id>", methods=["DELETE"])
def delete_product(product_id):
    """Delete a specific product from the database"""

    response = db.delete_product(product_id)

    return jsonify(
        status_code = response["ResponseMetadata"]["HTTPStatusCode"]
    )


