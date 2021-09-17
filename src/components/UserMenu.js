import React, {useEffect,useRef } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));


export default function UserMenu() {


    const isLogged = useSelector((state) => state).isLogged.logged;


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    let history = useHistory();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleSignIn = () => {
        history.push('/signIn');
    }

    const handleSignUp = () => {
        history.push('/signUp');
    }

    const handleLogout = () => {
        history.push('/');
    }

    const handleUserSettings = () => {
        history.push('/userSettings');
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <IconButton
                ref={anchorRef}
                edge="end"
                aria-label="account of current user"
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {isLogged !== true && (

                                        <MenuItem onClick={() => [handleSignIn(), handleClose()]}>Sign In</MenuItem>
                                    )}

                                    {isLogged !== true && (

                                        <MenuItem onClick={() => [handleSignUp(), handleClose()]}>Sign Up</MenuItem>
                                    )}

                                    
                                    {isLogged !== false && (

                                        <MenuItem onClick={() => [handleUserSettings(), handleClose()]}>Settings</MenuItem>
                                    )}
                                    {isLogged !== false && (

                                        <MenuItem onClick={() => [handleLogout(), handleClose()]}>Logout</MenuItem>
                                    )}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}
