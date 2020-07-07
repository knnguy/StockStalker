from flask import request, Blueprint
from flask import current_app as current_app
import boto3
import products
import os


# DynamoDB Setup
dynamodb = boto3.resource(    
    "dynamodb", 
    region_name="us-west-2", 
    aws_access_key_id = os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key = os.environ["AWS_SECRET_ACCESS_KEY_ID"]
)
products_table = dynamodb.Table('Products')

# Database Methods
def add_product(product):
    """Add product to the Products table"""
    response = products_table.put_item(
        Item={
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "in_stock": product.in_stock,
            "store": product.store,
            "url": product.url,
            "image_url": product.image_url
        }
    )
    return response

def get_all_products():
    """Retrieves all products in the Products table"""

    response = products_table.scan()
    products_list = []

    for i in response["Items"]:
        products_list.append(i)

    while "LastEvaluatedKey" in response:
        response = products_table.scan()

        for i in response["Items"]:
            products_list.add(i)

    return products_list

def get_product(product_id):
    """Retrieves a specified product from the Products table"""

    response = products_table.get_item(
        Key={"id": product_id
        }
    )
    return response

def update_availability(product_id, in_stock):
    """Updates the availability of a product in the Products table"""

    response = products_table.update_item(
        Key = {"id": product_id},
        UpdateExpression = "set in_stock = :b",
        ExpressionAttributeValues = {
            ":b": in_stock,
        },
        ReturnValues = "UPDATED_NEW"
    )
    return response

def delete_product(product_id):
    """Delete a product from the Products table"""
    response = products_table.delete_item(Key={"id": product_id})
    return response