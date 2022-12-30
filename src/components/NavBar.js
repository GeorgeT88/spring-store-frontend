import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MenuList from "@material-ui/core/MenuList";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import UserMenu from "./UserMenu";
import FavoriteProduct from "./FavoriteProduct";
import Cart from "./Cart";
import SearchProductBar from "./SearchProductBar";
import { getAllProductsByCategory } from "../redux/actions/productsActions";
import { alpha, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {
    backgroundColor: "#3f51b5",
    color: "#f9f9f9",
    "&:hover": {
      backgroundColor: "#3f51b5",
      color: "#f9f9f9",
    },
  },
}));

export default function NavBar() {
  const dispatch = useDispatch();

  const appBar = useSelector((state) => state.secondaryAppBar.appbar);
  const favoriteProducts = useSelector(
    (state) => state.favoriteProduct.products
  );
  const favoriteLocalProducts = useSelector(
    (state) => state.favoriteLocalProduct.products
  );
  const productsInCart = useSelector((state) => state.cart.entries);
  const productsInCartLocal = useSelector((state) => state.cartLocal.products);
  const token = localStorage.getItem("token");

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [
    anchorElDropDownProductFavorites,
    setAnchorElDropDownProductFavorites,
  ] = useState(null);
  const [anchorElDropDownProductInCart, setAnchorElDropDownProductInCart] =
    useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  let history = useHistory();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleClickDropDownProductFavorites(event) {
    if (anchorElDropDownProductFavorites !== event.currentTarget) {
      setAnchorElDropDownProductFavorites(event.currentTarget);
    }
  }

  function handleClickDropDownProductInCart(event) {
    if (anchorElDropDownProductInCart !== event.currentTarget) {
      setAnchorElDropDownProductInCart(event.currentTarget);
    }
  }

  function handleCloseDropDownProductFavorites() {
    setAnchorElDropDownProductFavorites(null);
  }
  function handleCloseDropDownProductInCart() {
    setAnchorElDropDownProductInCart(null);
  }

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
    history.push("/");
  };

  const handleGoToFavoriteProductPage = () => {
    history.push("/favoriteProductListPage");
  };

  const handleGoToCartPage = () => {
    history.push("/CartPage");
  };

  const changeInputValue = (category) => (event) => {
    dispatch(getAllProductsByCategory(category));
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    handleClose();
    handleBackToMainPage();
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleMenuClose}
    ></Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      MenuListProps={{ onMouseLeave: handleMobileMenuClose }}
    >
      <MenuItem onClick={() => history.push("/favoriteProductListPage")}>
        <IconButton
          aria-label="show 4 new mails"
          color="inherit"
          onClick={() => history.push("/favoriteProductListPage")}
        >
          {token ? (
            <Badge badgeContent={favoriteProducts?.length} color="secondary">
              <FavoriteIcon />
            </Badge>
          ) : (
            <Badge
              badgeContent={favoriteLocalProducts?.length}
              color="secondary"
            >
              <FavoriteIcon />
            </Badge>
          )}
        </IconButton>
        <p>Favorites</p>
      </MenuItem>
      <MenuItem onClick={() => history.push("/cartPage")}>
        <IconButton
          aria-label="show 11 new notifications"
          color="inherit"
          onClick={() => history.push("/cartPage")}
        >
          {token ? (
            <Badge
              badgeContent={productsInCart.reduce(function (tot, productDto) {
                return tot + productDto.quantity;
              }, 0)}
              color="secondary"
            >
              <ShoppingCartIcon />
            </Badge>
          ) : (
            <Badge
              badgeContent={productsInCartLocal.reduce(function (tot, product) {
                return tot + product.quantity;
              }, 0)}
              color="secondary"
            >
              <ShoppingCartIcon />
            </Badge>
          )}
        </IconButton>
        <p>In Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disableElevation
            disableRipple
            disableFocusRipple
          >
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              onClick={handleBackToMainPage}
            >
              <b>Springwebstore {process.env.REACT_APP_ENVIRONMENT}</b>
            </Typography>
          </Button>
          <SearchProductBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show favorite products"
              color="inherit"
              onClick={handleClickDropDownProductFavorites}
            >
              {token ? (
                <Badge
                  badgeContent={favoriteProducts?.length}
                  color="secondary"
                >
                  <FavoriteIcon
                    aria-owns={
                      anchorElDropDownProductFavorites
                        ? "simple-dropdown"
                        : undefined
                    }
                    aria-haspopup="true"
                  />
                </Badge>
              ) : (
                <Badge
                  badgeContent={favoriteLocalProducts?.length}
                  color="secondary"
                >
                  <FavoriteIcon
                    aria-owns={
                      anchorElDropDownProductFavorites
                        ? "simple-dropdown"
                        : undefined
                    }
                    aria-haspopup="true"
                  />
                </Badge>
              )}
              <Menu
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                id="simple-dropdown"
                anchorEl={anchorElDropDownProductFavorites}
                open={Boolean(anchorElDropDownProductFavorites)}
                onClose={handleCloseDropDownProductFavorites}
                MenuListProps={{
                  onMouseLeave: handleCloseDropDownProductFavorites,
                }}
                getContentAnchorEl={null}
                disableAutoFocusItem={true}
              >
                <Box
                  display="flex"
                  width={400}
                  height={40}
                  bgcolor="primary.main"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    variant="h6"
                    style={{ color: "white" }}
                    align="center"
                  >
                    {"Favorite Products"}
                  </Typography>
                </Box>
                {token ? (
                  <MenuList id="simple-dropdown" onKeyDown={handleListKeyDown}>
                    {favoriteProducts.length === 0 && (
                      <Typography
                        variant="h6"
                        style={{ color: "black" }}
                        align="center"
                      >
                        {"Favorite Product List is empty!"}
                      </Typography>
                    )}
                    {favoriteProducts &&
                      favoriteProducts
                        .slice(0, 3)
                        .map((favoriteProduct) => (
                          <FavoriteProduct
                            key={favoriteProduct.id}
                            {...favoriteProduct}
                          />
                        ))}
                  </MenuList>
                ) : (
                  <MenuList id="simple-dropdown" onKeyDown={handleListKeyDown}>
                    {favoriteLocalProducts.length === 0 && (
                      <Typography
                        variant="h6"
                        style={{ color: "black" }}
                        align="center"
                      >
                        {"Favorite Product List is empty!"}
                      </Typography>
                    )}
                    {favoriteLocalProducts &&
                      favoriteLocalProducts
                        .slice(0, 3)
                        .map((favoriteProduct) => (
                          <FavoriteProduct
                            key={favoriteProduct.id}
                            {...favoriteProduct}
                          />
                        ))}
                  </MenuList>
                )}

                <Box
                  onClick={handleGoToFavoriteProductPage}
                  display="flex"
                  width={400}
                  height={40}
                  bgcolor="primary.main"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Link href="#" style={{ color: "white" }} underline="hover">
                    {" "}
                    {"View All Favorite Products >>>>"}
                  </Link>
                </Box>
              </Menu>
            </IconButton>

            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleClickDropDownProductInCart}
            >
              {token ? (
                <Badge
                  badgeContent={productsInCart.reduce(function (
                    tot,
                    productDto
                  ) {
                    return tot + productDto.quantity;
                  },
                  0)}
                  color="secondary"
                >
                  <ShoppingCartIcon
                    aria-owns={
                      anchorElDropDownProductInCart
                        ? "simple-dropdown"
                        : undefined
                    }
                    aria-haspopup="true"
                  />
                </Badge>
              ) : (
                <Badge
                  badgeContent={productsInCartLocal.reduce(function (
                    tot,
                    product
                  ) {
                    return tot + product.quantity;
                  },
                  0)}
                  color="secondary"
                >
                  <ShoppingCartIcon
                    aria-owns={
                      anchorElDropDownProductInCart
                        ? "simple-dropdown"
                        : undefined
                    }
                    aria-haspopup="true"
                  />
                </Badge>
              )}

              <Menu
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                id="simple-dropdown"
                anchorEl={anchorElDropDownProductInCart}
                open={Boolean(anchorElDropDownProductInCart)}
                onClose={handleCloseDropDownProductInCart}
                MenuListProps={{
                  onMouseLeave: handleCloseDropDownProductInCart,
                }}
                getContentAnchorEl={null}
                disableAutoFocusItem={true}
              >
                <Box
                  display="flex"
                  width={400}
                  height={40}
                  bgcolor="primary.main"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    variant="h6"
                    style={{ color: "white" }}
                    align="center"
                  >
                    {"Cart"}
                  </Typography>
                </Box>

                {token ? (
                  <MenuList id="simple-dropdown" onKeyDown={handleListKeyDown}>
                    {productsInCart.length === 0 && (
                      <Typography
                        variant="h6"
                        style={{ color: "black" }}
                        align="center"
                      >
                        {"Cart is empty!"}
                      </Typography>
                    )}
                    {productsInCart.length !== 0 &&
                      productsInCart
                        .slice(0, 3)
                        .map((productInCart) => (
                          <Cart key={productInCart.id} {...productInCart} />
                        ))}
                  </MenuList>
                ) : (
                  <MenuList id="simple-dropdown" onKeyDown={handleListKeyDown}>
                    {productsInCartLocal.length === 0 && (
                      <Typography
                        variant="h6"
                        style={{ color: "black" }}
                        align="center"
                      >
                        {"Cart is empty!"}
                      </Typography>
                    )}
                    {productsInCartLocal.length !== 0 &&
                      productsInCartLocal
                        .slice(0, 3)
                        .map((productsInCartLocal) => (
                          <Cart
                            key={productsInCartLocal.id}
                            {...productsInCartLocal}
                          />
                        ))}
                  </MenuList>
                )}

                <Box
                  onClick={handleGoToCartPage}
                  display="flex"
                  width={400}
                  height={40}
                  bgcolor="primary.main"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Link href="#" style={{ color: "white" }} underline="hover">
                    {" "}
                    {"View All Products In Cart >>>>"}
                  </Link>
                </Box>
              </Menu>
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
        style={{ minHeight: "6vh" }}
      >
        <Grid item xs={12}>
          {appBar && (
            <div className={classes.root}>
              <div>
                <Button
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  //onMouseOver={handleClick}
                >
                  Categories
                </Button>
                <Button>Newest Products</Button>
                <Button>Offerts</Button>
                <Button>About Us</Button>
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
                  <MenuList id="simple-menu" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={changeInputValue("All Products")}>
                      All Products
                    </MenuItem>
                    <MenuItem onClick={changeInputValue("Table")}>
                      Tables
                    </MenuItem>
                    <MenuItem onClick={changeInputValue("Chair")}>
                      Chairs
                    </MenuItem>
                    <MenuItem onClick={changeInputValue("Sofa")}>
                      Sofas
                    </MenuItem>
                    <MenuItem onClick={changeInputValue("Bedroom")}>
                      Bedroom
                    </MenuItem>
                    <MenuItem onClick={changeInputValue("Bed")}>Beds</MenuItem>
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
