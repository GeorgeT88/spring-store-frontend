import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    marginLeft: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    width: 300,
    backgroundColor: 'rgb(216 219 239)'
  },
  input: {
    marginLeft: theme.spacing(3),
    flex: 2,
    backgroundColor: 'rgb(216 219 239)'
  },
  iconButton: {
    padding: 6,
    backgroundColor: 'rgb(216 219 239)'
  },
}));

export default function SearchProductBar() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root} >
      <InputBase 

        className={classes.input}
        placeholder="Search Product.."
    
      />
      <IconButton type="submit"  className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}