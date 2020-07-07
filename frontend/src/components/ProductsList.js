import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '5%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  }));

export default function ProductsList(props) {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#2196f3',
        },
        secondary: {
          main: red[400],
        },
      },
    });
    const style = {
      background: '#2196f3',
      borderRadius: 3,
      border: 0,
      color: 'white',
      padding: '0 30px',
      height: "45px",
      variant: "contained",
      size: "small",
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
    };
    const classes = useStyles(theme);
    return (
        <React.Fragment>
          <ThemeProvider theme={theme}>
                <Container className={classes.cardGrid}>
                    <Grid container spacing={4}>
                        {props.products.map((product) => (
                        <Grid item key={product} xs={2} sm={2} md={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                  component="img"
                                  className={classes.cardMedia}
                                  image={product["image_url"]}
                                  onClick={() => window.open(product["url"])}
                                  title={product["name"]}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h6" component="h2">
                                      {product["name"]}
                                    </Typography>
                                    <Typography>
                                      Price: {product["price"]}
                                    </Typography>
                                    <Typography color={product["in_stock"] ? "primary" : "secondary"}>
                                      {product["in_stock"] ? "In Stock!" : "Out of Stock!"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button style={style} onClick={() => window.location = product["url"]}>
                                      View on {product["store"]}
                                    </Button>
                                    <Button style={style} startIcon={<DeleteIcon />} onClick={() => props.deleteHandler(product["id"])}>
                                      Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </Container>
                </ThemeProvider>
        </React.Fragment>
    );
  }