import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UserMenu from './UserMenu';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SearchProductBar from './SearchProductBar';
import MenuList from '@material-ui/core/MenuList';
import Grid from '@material-ui/core/Grid';
import { getAllProductsByCategory } from "../redux/actions/productsActions";
import { useDispatch, useSelector } from 'react-redux';







const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    backgroundColor: '#3f51b5',
    color: '#f9f9f9',
    '&:hover': {
      backgroundColor: '#3f51b5',
      color: '#f9f9f9',
    },
  }
}));

export default function NavBar() {

  const dispatch = useDispatch();

  const appBar = useSelector((state) => state.secondaryAppBar.appbar);

  const favoriteProducts = useSelector((state) => state.auth.favoriteProductList);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  let history = useHistory();

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }



  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleBackToMainPage = () => {
    history.push('/');
  }


  const changeInputValue = (category) => (event) => {
    console.log("selected", category)

    dispatch(getAllProductsByCategory(category));
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    handleClose();
    handleBackToMainPage();
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      //  open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      //  open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={favoriteProducts?.length} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit" onClick={() => history.push('/cartPage')} >
          <Badge badgeContent={11} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>In Cart</p>
      </MenuItem>

    </Menu>


  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Button className={classes.button} variant="contained" color="primary" disableElevation disableRipple disableFocusRipple>
            <Typography className={classes.title} variant="h6" noWrap onClick={handleBackToMainPage}  >

              Spring Store App
            </Typography>
          </Button>
          <SearchProductBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={favoriteProducts?.length} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={() => history.push('/cartPage')} >
              <Badge badgeContent={17} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <UserMenu />

          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              ia-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            <UserMenu />
          </div>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '6vh' }}
      >

        <Grid item xs={12}>
          {appBar !== false && (
            <div className={classes.root} >
              <div>
                <Button
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  //onMouseOver={handleClick}
                >
                  Categories
                </Button>
                <Button>
                  Newest Products
                </Button>
                <Button>
                  Offerts
                </Button>
                <Button>
                  About Us
                </Button>
                <Menu
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                  getContentAnchorEl={null}
                  disableAutoFocusItem={true}
                >
                  <MenuList  id="simple-menu" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={changeInputValue('All Products')}>All Products</MenuItem>
                    <MenuItem onClick={changeInputValue('Table')}>Tables</MenuItem>
                    <MenuItem onClick={changeInputValue('Chair')}>Chairs</MenuItem>
                    <MenuItem onClick={changeInputValue('Sofa')}>Sofas</MenuItem>
                    <MenuItem onClick={changeInputValue('Bedroom')}>Bedroom</MenuItem>
                    <MenuItem onClick={changeInputValue('Bed')}>Beds</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          )}

        </Grid>
      </Grid>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
