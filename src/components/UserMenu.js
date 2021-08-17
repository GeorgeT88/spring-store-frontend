import React, { useState, Fragment } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';


const UserMenu = ( props, context ) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuId = 'primary-search-account-menu';
    let history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignIn = () => {
        history.push('/signIn');
    }

    return (
        <Fragment>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
            <MenuItem onClick={handleSignIn}>
                Sign in
            </MenuItem>
                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
            </Menu>
        </Fragment>
    )
}

export default UserMenu;