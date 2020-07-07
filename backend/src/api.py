from flask import Flask
from flask_cors import CORS

def create_app():
    """Create Flask application"""
    app = Flask(__name__, instance_relative_config=True)

    # Set CORS options on app configuration
    app.config['CORS_HEADERS'] = "Content-Type"
    CORS(app)

    with app.app_context():
        # Import parts of the application
        import products


        # Register Blueprints
        app.register_blueprint(products.products_bp)


        @app.after_request
        def after_request(response):
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            return response

    return app


# Create Flask app
app = create_app()

     
  
if __name__ == "__main__": 
    app.run(host ='0.0.0.0', port=os.environ["PORT"], debug = True) 


    