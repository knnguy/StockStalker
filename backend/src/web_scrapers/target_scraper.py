from flask import Blueprint
from flask import current_app as current_app
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import products
import uuid

def get_product_info(url):
    """Gets the page specified by the URL and extracts the product info from it"""

    # Get the HTML of the website
    html = _get_website_html(url)

    # Use BeautifulSoup to pull data out from the HTML file
    soup = BeautifulSoup(html, 'html.parser')

    # Locate the name, price, availability and image of the product
    name = _get_prod_name(html, soup)
    price = _get_prod_price(html, soup)
    in_stock = _get_prod_availability(html, soup)
    store = "Target"
    image_url = _get_prod_image(html, soup)

    return products.Product(uuid.uuid4().hex, name, price, in_stock, store, url, image_url)


def _get_website_html(url):
    """Gets the html of the website specified by the URL"""

    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    html = driver.page_source
    return html

def _get_prod_name(html, soup):
    """Locates and returns the name of the product in the given HTML"""

    element = soup.find("h1", {"data-test": "product-title"})
    name = element.find_next().get_text()
    return name

def _get_prod_price(html, soup):
    """Locates and returns the price of the product in the given HTML"""

    element = soup.find("div", {"data-test": "product-price"})
    return element.get_text()


def _get_prod_availability(html, soup):
    """Locates and returns whether or not the product is in stock"""

    out_of_stock_message_element = soup.find("div", {"data-test": "outOfStockNearbyMessage"})
    if out_of_stock_message_element is not None:
        return False
    return True


def _get_prod_image(html, soup):
    """Locates and returns the image of the product in the given HTML"""

    div1 = soup.find("div", {"class": "slide--active"})
    div2 = div1.find("div", {"class": "slideDeckPicture"})
    div3 = div2.find("div", {"style": "user-select: none;"})
    image = div3.find("img").attrs["src"]
    return image


