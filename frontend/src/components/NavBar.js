import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(1),
    },
    appbar: {
        marginBottom: theme.spacing(6),
    }
  }));

export default function NavBar() {
    const classes = useStyles();
    const style = {
        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
      };

    return (
        <div>
            <AppBar style={style} position="relative" className={classes.appbar}>
                <Toolbar>
                    <ShoppingCartIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Stock Stalker
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );   
}