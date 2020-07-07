import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import NavBar from './components/NavBar';
import ProductsList from './components/ProductsList';
import AddNewProductBar from './components/AddNewProductBar';
import { httpGetRequest, httpDeleteRequest } from './httpRequests'
import { addProducts } from './redux/actions'

const priceTrackerUrl = "https://stock-stalker-api-prod.herokuapp.com/"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Stock Stalker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class App extends React.Component {

  async componentDidMount() {
    // Get the list of products from the price tracker api
    let url = priceTrackerUrl + "products";
    let result = await httpGetRequest(url)
    this.props.addProducts(result["all_products"]);
  }

  deleteProductButtonHandler = async (id) => {
    // Make a delete request to the price tracker api
    let url = priceTrackerUrl + "products/" + id;
    let result = await httpDeleteRequest(url);

    // Get the updated list of products from the api
    url = priceTrackerUrl + "products"
    result = await httpGetRequest(url);
    this.props.addProducts(result["all_products"]);
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar></NavBar>   
        <div>
          <Container maxWidth="lg" backgroundColor="#5AB9EA">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Stock Stalker
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Check the availability of your favorite products!
            </Typography>
            <AddNewProductBar></AddNewProductBar>
          </Container>
        </div>
        <ProductsList products={this.props.products} deleteHandler={this.deleteProductButtonHandler}></ProductsList>
        {/* Footer */}
        <footer>
          <Typography variant="h6" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            kimnguyy@gmail.com
          </Typography>
          <Copyright />
        </footer>
      {/* End footer */}
      </React.Fragment>   
    )
  }
}

const mapStateToProps = state => {
  return { products: state.products };
};

const mapDispatchToProps = {
  addProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
