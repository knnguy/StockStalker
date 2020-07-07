from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests
import time
import json
import smtplib

# Constants
API_BASE_URL = "http://192.168.29.111:5000/"
SENDER = "kimnguyy@gmail.com"
SENDER_PWD = "<Enter Password Here>"
RECEIVERS = ["kimnguyy@gmail.com"]


# Set up the ChromeDriver to navigate through the web page
options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=options)


# Scrape the Target website every 5 minutes to look for price changes
while True:
    # Get all products that are currently in the database
    response = requests.get(API_BASE_URL + "products")
    products = response.json()["all_products"]

    # For each product, scrape product's webpage to check if the product's availability has changed
    for product in products:
        url = product["url"]
        print(url)

        # Navigate to the web page and extract the HTML
        driver.get(url)
        html = driver.page_source

        # Use BeautifulSoup to extract data from the HTML
        soup = BeautifulSoup(html, 'html.parser')

        # Get the current availability of the product
        current_availability = False
        out_of_stock_element = soup.find("div", {"data-test": "oosDeliveryOption"})
        if out_of_stock_element is None:
            current_availability = True

        print("Current Availability: " + str(current_availability))

        # Compare the previous availability status with the current status
        # If there is a change, update the avilability of the product
        previous_availability = product["in_stock"]
        print("Previous: " +  str(previous_availability))
        if current_availability != previous_availability:
            print("Detected Difference")
            product_id = product["id"]
            api_url = API_BASE_URL + "products/" + product_id
            response = requests.patch(api_url, json={"in_stock": current_availability})

            # If the product is now in stock, send an email to notify the recipient
            if current_availability == True:
                try:
                    smtp_server = smtplib.SMTP("smtp.gmail.com",587)
                    smtp_server.ehlo()
                    smtp_server.starttls()
                    smtp_server.ehlo
                    smtp_server.login(SENDER, SENDER_PWD)

                    # Create the email message
                    msg = MIMEMultipart("alternative")
                    msg["Subject"] = "In Stock Alert"
                    msg["From"] = SENDER

                    html = f"""\
                        <html>
                            <head></head>
                            <body>
                                <h1> {product["name"]} is now in stock at {product["store"]}!</h1>
                                <img src={product["image_url"]}>
                                <h2> Click <a href={product["url"]}>here</a> to view the product.</h2>
                            </body>
                        </html>
                    """
                    part1 = MIMEText(html, "html")
                    msg.attach(part1)

                    # Send the email
                    smtp_server.sendmail(SENDER, RECEIVERS, msg.as_string())
                    print("Successfully sent email")
                    
                    smtp_server.quit()
                except SMTPException:
                    print("Error: Unable to send mail")

    time.sleep(3000)

 


