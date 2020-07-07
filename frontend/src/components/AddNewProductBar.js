import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { httpPostRequest, httpGetRequest } from '../httpRequests'
import { addProducts } from '../redux/actions'

const classes = makeStyles((theme) => ({

}));

const priceTrackerUrl = "https://stock-stalker-api-prod.herokuapp.com/"

class AddNewProductBar extends React.Component {
    state = {
        productUrl: ""
    };

    handleTextUpdate = productUrl => {
        this.setState({ productUrl });
    };

    async addNewProductButtonHandler() {
        // Make a POST request to the price tracker api
        let url = priceTrackerUrl + "products";
        let result = await httpPostRequest(priceTrackerUrl + "products", this.state.productUrl);

        // Get the updated list of products from the api
        url = priceTrackerUrl + "products"
        result = await httpGetRequest(url);
        this.props.addProducts(result["all_products"]);

        this.clearForm();
    }

    clearForm = () => {
        this.setState({
            productUrl: ""
        })
    }

    render() {
        return (
            <div className={classes.root}>
                <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="Product URL" variant="outlined" onChange={e => this.handleTextUpdate(e.target.value)} value={this.state.productUrl}></TextField>
                        </form>
                    </Grid>
                    <Grid item >
                        <Button id="addNewProduct" variant="contained" color="primary" onClick={() => this.addNewProductButtonHandler()}>
                            Add A New Product
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { products: state.products };
};

const mapDispatchToProps = {
    addProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProductBar)
